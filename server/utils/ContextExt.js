const path = require('path');

const AppConfig = require(path.resolve('./app.config.js'));
const CtripUtil = require('ctriputil');
const SOAResponse = require('./SOAResponse.js');
const SoaClient = require('./soaClient');
const clog = require('./log');

const { getActiveSpan } = CtripUtil.cat;

const NOP = () => { };

const IsTestMode = /mocha/i.test(process.argv.join('\n'));

// 测试模式下 isProd 即使为 false
const isProd = AppConfig.Env === 'prod' && /* istanbul ignore next */ !IsTestMode;

const valideDateTime = function (value) {
    const arr = (`${value}`).match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})( +(\d+):(\d+)(?::(\d+))?)?$/);

    if (arr) {
        const y = parseInt(arr[1], 10);
        const m = parseInt(arr[2], 10) - 1;
        const d = parseInt(arr[3], 10);
        const t = new Date(y, m, d);

        // 检测日期是否相等(像 1999-2-31这种日期,使用new Date可以正确出来日期,但日期值与字符串不匹配,即该日期不是正确的日期)
        if (t.getFullYear() === y && t.getMonth() === m && t.getDate() === d) {
            // 有时分秒
            if (typeof arr[4] === 'string') {
                const h = parseInt(arr[5], 10);
                const m = parseInt(arr[6], 10);
                const s = (typeof arr[7] === 'undefined') ? 0 : parseInt(arr[7], 10);

                // 时分秒不能正确转换为数字
                /* istanbul ignore if: 按理说上面的正则里有要求为\d然后转换之后不应该为 NAN, 但为了安全期间, 还是再判断一下, 所以这里忽略代码的覆盖率 */
                if (isNaN(h) || isNaN(m) || isNaN(s)) {
                    return false;
                }

                // 时分秒的取值范围不正确
                if (
                    (h < 0 || h > 23)
                    || (m < 0 || m > 59)
                    || (s < 0 || s > 59)
                ) {
                    return false;
                }
            }
            return true;
        }
    }

    return false;
};

const REDIS_INSTANCE = typeof AppConfig.Redis === 'string' ? new CtripUtil.Redis({
    name: AppConfig.Redis,
}) : /* istanbul ignore next */ null;

/* istanbul ignore else */
if (REDIS_INSTANCE !== null) {
    REDIS_INSTANCE.connect((e) => {
        /* istanbul ignore if */
        if (e) {
            clog.warn({ type: 'redis', status: 'connect' }, e);
        }
    });
}

const redis = {
    get(key, timeout) { // 传递指定的key和超时时间(默认5秒,可不传)获取数据, 返回 Promise 对象
        return new Promise((resolve, reject) => {
            /* istanbul ignore if */
            if (REDIS_INSTANCE === null) {
                return reject('missing redis key');
            }

            const timer = setTimeout(() => {
                reject('timeout');
            }, timeout || 5000);

            REDIS_INSTANCE.get(key, (e, val) => {
                // 由于 Promise 的特性, 在结果一旦确定之后, 不会再改变, 所以这里只清除计时器, 不用管是否有超时, 因为超时的话, 状态会变成 reject, 后续的 reject/resolve 已经没有意义了
                clearTimeout(timer);

                if (e) {
                    reject(e);
                    return;
                }

                resolve(val);
            });
        });
    },
    set({
        key, val, expire, timeout,
    }) {
        return new Promise((resolve, reject) => {
            /* istanbul ignore if */
            if (REDIS_INSTANCE === null) {
                return reject('missing redis key');
            }

            const timer = setTimeout(() => {
                reject('timeout');
            }, timeout || 5000);

            REDIS_INSTANCE.set(key, val, (e) => {
                // 由于 Promise 的特性, 在结果一旦确定之后, 不会再改变, 所以这里只清除计时器, 不用管是否有超时, 因为超时的话, 状态会变成 reject, 后续的 reject/resolve 已经没有意义了
                clearTimeout(timer);

                if (e) {
                    reject(e);
                    return;
                }

                resolve();
            });

            if (expire) {
                REDIS_INSTANCE.expire(key, expire);
            }
        });
    },
};

module.exports = {
    ContextExt: {
        nop: NOP,
        clog,
        redis,
        isDate: valideDateTime,
        soa(data) {
            this.logTime('soaBegin');

            const output = new SOAResponse(data);

            output.addExt({ Id: 'CLOGGING_TRACE_ID', Value: this.response.get('GUID') });

            const span = getActiveSpan();

            if (span && span.__messageId) {
                output.addExt({ Id: 'RootMessageId', Value: span.__messageId });
            }

            this.logTime('soaEnd');

            /* istanbul ignore else */
            if (!isProd) { // 非生产环境下, 输出记录的处理时间
                output.addExt({ Times: this.times });
            }

            // 记录返回给前端的内容
            clog.info({
                type: 'response', guid: this.response.get('GUID'), ClientIP: this.ClientIP, ClientId: this.ClientId, source: 'javascript',
            }, 'response', JSON.stringify(output));

            this.body = output;
        },
        logTime(tag) {
            if (isProd) {
                return;
            }
            this.state.times.push([tag, (new Date().getTime() - this.state.times[0][1]) / 1000]);
        },
        copy(obj) {
            return JSON.parse(JSON.stringify(obj));
        },
        isCityCode(code) {
            return (typeof code === 'string') && /^[a-z0-9]{3,5}$/i.test(code);
        },
        getClientID() {
            return this.state.ClientID || this.get('cid') || (this.query && this.query._fxpcqlniredt) || '0';
        },
        getClientIP() {
            return this.state.ClientIP || this.get('cdn-src-ip') || this.get('x-forwarded-for') || this.ip;
        },
        getAuth() {
            return (this.header.auth || this.cookies.get('cticket') || '').toString();
        },
        getExtension(key) {
            const ret = {};
            const extension = this.header.extension;

            if (extension && extension instanceof Array) {
                extension.forEach((ext) => {
                    if (ext && ext.name) {
                        // ts --> RequestLogToken 有一个 ts 的字段（前端传过来的），后端(Java)在使用的时候用的是 RequestLogToken 这个名字保存的
                        ret[ext.name] = ext.value;
                    }
                });
            }

            return ret[key];
        },
        getMessageHead() { // 调用国内的接口时
            const { _SERVICE_NODEJS_CONFIG_ = {} } = this.state;

            return {
                ClientID: this.state.ClientID,
                ClientIP: this.state.ClientIP,
                RequestGUID: this.response.get('GUID'),
                ClientAppID: _SERVICE_NODEJS_CONFIG_.AppID,
                VID: this.getExtension('vid') || '',
            };
        },
        /**
         * 发送SOA请求
         *
         * @param {*} serviceCode serviceCode/url
         * @param {*} method soa method
         * @param {*} params
         * @param {*} query
         * @returns
         */
        soaAgent(serviceCode, method, params, query) {
            const preifx = `${serviceCode}_${method}_`;
            this.logTime(`${preifx}Start`);

            // 记录发送的请求参数
            clog.info({
                type: 'request', guid: this.response.get('GUID'), ClientIP: this.state.ClientIP, ClientId: this.state.ClientID, serviceCode, method,
            }, serviceCode, method, JSON.stringify(params));

            params.rejectIncludeResponse = true;

            return CtripUtil.SoaAgent(serviceCode).invoke(method, params, true, query).then((res) => {
                this.logTime(`${preifx}End`);

                return res;
            }).catch(([e, params, result]) => {
                this.logTime(`${preifx}Error`);

                clog.warn({
                    type: 'response', guid: this.response.get('GUID'), ClientIP: this.state.ClientIP, ClientId: this.state.ClientID, serviceCode, method,
                }, serviceCode, method, e, JSON.stringify(params), JSON.stringify(result));

                throw e;
            });
        },

        /**
         * Soa 服务接口调用封装
         */
        soaClient() {
            return SoaClient(this);
        },

    },
};
