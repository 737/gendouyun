import axios from 'axios';

const FetchModelConfig = {
    'Origin': {
        path: 'Hotel',
        code: 10932,
    },
    'Product': {
        path: 'Hotel/Product',
        code: 10933,
    },
    'Product2': {
        path: 'Hotel/Product',
        code: 10932,
    },
    'Booking': {
        path: 'Hotel/Booking',
        code: 10935,
    },
    'Customer': {
        path: 'Hotel/Customer',
        code: 10934,
    },
    'Static': {
        path: 'Hotel/Static',
        code: 10936,
    },
    'Static2': {
        path: 'Hotel/Static',
        code: 10932,
    },
    'Inn': {
        path: 'Hotel/Inn',
        code: 11390,
    },
    'OtherBU': {
        path: 'Hotel/OtherBU',
        code: 10915,
        key: 'OtherBU',
    },
    'Event': {
        path: 'Hotel/Event',
        code: 11126,
    },
    'External_GS': {
        path: '',
        code: 10130,
        noSubenv: true,
    },
    'Direct': {
        path: '',
        code: '',
    },
    'Java12860': {
        path: '',
        code: 12860,
    },
    'Java12860_369': {
        path: '',
        code: 12860,
        subenv: 'fat369',
    },
    'Java12860_9': {
        path: '',
        code: 12860,
        subenv: 'fat9',
    },
};

export default class FetchModel {

    constructor(config) {
        let namespace;
        ['url', 'ns'].map(function (v) {
            if (!(v in config)) throw new Error('you must define ' + v);
        });
        if (!isObject(namespace = FetchModelConfig[config.ns])) {
            throw new Error('namespace not undefined in FetchModel.config.js file.');
        }
        this.$$config = Object.assign({ namespace }, FetchModel.defaultConfig, config);
    }

    /**
     * 默认配置
     * @type {{url: string, env: string}}
     */
    static defaultConfig = {
        url: '',
        env: 'prd',
        param: {},
    };

    /**
     * 默认相关的服务器环境配置
     * @type {{fat: string, uat: string, battle: string, prd: string}}
     */
    static DomainConfig = {
        fat: 'http://gateway.m.fws.qa.nt.ctripcorp.com',
        uat: 'http://gateway.m.uat.qa.nt.ctripcorp.com',
        battle: 'http://m.ctrip.com',
        prd: 'http://m.ctrip.com',
    };

    /**
     * 构建AJAX请求的URL地址
     * @param config
     * @returns {string}
     */
    static buildUrl(config) {
        const {
            env,
            url,
        } = config;

        const {
            code,
            path,
            noSubenv,
            subenv
        } = config.namespace;

        let subEnv = '';

        const domain = FetchModel.DomainConfig[env] || FetchModel.DomainConfig['prd'];


        // 注意区分大小写
        if (env === 'fat') {
            if (subenv) {
                subEnv = subenv;
            } else if (config.subenv) {
                subEnv = config.subenv;
            } else if (Application.subEnv && Application.subEnv.includes("fat")) {
                subEnv = Application.subEnv
            } else {
                subEnv = 'fat369';
            }
        }

        let _buildUrl = `${domain}/restapi/soa2/${code}/${path ? path + '/' : ''}${url}${subEnv && !noSubenv ? '?subEnv=' + subEnv : ''}`;

        // 堡垒测试
        if (env === 'battle') {
            _buildUrl = Toolkit.buildUrl(_buildUrl, code === 12860 ? { isCtripCanaryReq: 1 } : { isBastionRequest: true });
        }

        //伪堡垒
        if (Application.subEnv && Application.subEnv.includes("bat")) {
            _buildUrl = `http://10.15.147.177:8080/h5-api-service-1.0.1/api/${url}`
        }

        return _buildUrl;
    }

    /**
     * 构建发送请求数据
     * @param data  发送的报文
     * @param config 请求配置
     * @param SuccCall 调用成功时回调函数
     * @param ErrorCall 出错时的回调函数
     * @param AbortFn 取消时的回调函数
     * @returns {Promise} 返回一个Promise对象
     */
    async execute(data, config, SuccCall, ErrorCall, AbortFn) {
        let Tmpconfig = Object.assign({}, this.$$config, config);
        const startFetch = new Date();
        if (isFunction(Tmpconfig.url)) Tmpconfig.url = Tmpconfig.url(data);

        let url = FetchModel.buildUrl(Tmpconfig);

        let fetchObj = {
            body: data,
            extension: [
                { "name": "ishybrid", value: "1" },
                { "name": "scrum", value: "7.22" }
            ]
        };

        if (config && isArray(config.extension)) {
            fetchObj.extension = fetchObj.extension.concat(config.extension);
        }

        if (config && config.sequenceId) {
            fetchObj.sequenceId = config.sequenceId;
        }


        return axios.post(url,config.param);
    }


}
