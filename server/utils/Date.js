
// #region @Date#format

/**
 * 将日期对象格式化为字符串。
 * @param {String} [format="yyyy/MM/dd HH:mm:ss"] 格式字符串。具体见下文。
 * @returns {String} 格式化后的字符串。
 * @example new Date().format("yyyy/MM/dd HH:mm:ss")
 * @remark
 * #### 格式化语法
 * 格式字符串中，以下元字符会被替换：
 *
 * 元字符 | 意义 | 实例
 * ------|-----|--------------------
 * y     | 年  | yyyy:2014, yy:14
 * M     | 月  | MM:09, M:9
 * d     | 日  | dd:09, d:9
 * H     | 小时 | HH:13, h:13
 * m     | 分钟 | mm:06, m:6
 * s     | 秒  | ss:06, s:6
 * e     | 星期 | e:天, ee:周日, eee: 星期天
 * f     | 月份 | f: 一月 中文月份名
 * > #### !注意
 * > 元字符区分大小写。
 */
const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

Date.prototype.format = function (format) {
    let me = this,
        formators = Date._formators;
    if (!formators) {
        Date._formators = formators = {

            y(date, length) {
                date = date.getFullYear();
                return date < 0 ? `BC${-date}` : length < 3 && date < 2000 ? date % 100 : date;
            },

            M(date) {
                return date.getMonth() + 1;
            },

            d(date) {
                return date.getDate();
            },

            H(date) {
                return date.getHours();
            },

            m(date) {
                return date.getMinutes();
            },

            s(date) {
                return date.getSeconds();
            },

            e(date, length) {
                return (length === 1 ? '' : length === 2 ? '周' : '星期') + [length === 2 ? '日' : '天', '一', '二', '三', '四', '五', '六'][date.getDay()];
            },

            f(date) {
                return MONTHS[date.getMonth()];
            },

        };
    }
    return (format || 'yyyy/MM/dd HH:mm:ss').replace(/(\w)\1*/g, (all, key) => {
        if (key in formators) {
            key = `${formators[key](me, all.length)}`;
            while (key.length < all.length) {
                key = `0${key}`;
            }
            all = key;
        }
        return all;
    });
};

// #endregion

// #region @Date.from

/**
 * 将指定对象解析为日期对象。
 * @param {String/Date} value 要解析的对象。
 * @param {String} [format] 解析的格式。
 * 如果未指定，则支持标准的几种时间格式。
 * 如果指定了格式，则按照格式指定的方式解析。具体见下文。
 * @returns {Date} 返回分析出的日期对象。
 * @example
 * Date.from("2014-1-1")
 *
 * Date.from("20140101")
 *
 * Date.from("2013年12月1日", "yyyy年MM月dd日")
 * @remark
 * #### 格式化语法
 * 格式化字符串中，以下元字符会被反向替换为对应的值。
 *
 * 元字符 | 意义 | 实例
 * ------|-----|------
 * y     | 年  | 2014
 * M     | 月  | 9
 * d     | 日  | 9
 * H     | 小时 | 9
 * y     | 分钟 | 6
 * y     | 秒  | 6
 *
 * > #### !注意
 * > 元字符区分大小写。
 */
Date.from = function (value, format = '') {
    if (value && !(value instanceof Date)) {
        if (format) {
            if (typeof value === 'number') {
                value = new Date(value);
            } else {
                let groups = [0],
                    obj = {},
                    match = new RegExp(format.replace(/([-.*+?^${}()|[\]/\\])/g, '\\$1').replace(/([yMdHms])\1*/g, (all, w) => {
                        groups.push(w);
                        return '\\s*(\\d+)?\\s*';
                    })).exec(value);
                if (match) {
                    for (let i = 1; i < match.length; i++) {
                        obj[groups[i]] = +match[i];
                    }
                }
                value = new Date(obj.y || new Date().getFullYear(), obj.M ? obj.M - 1 : new Date().getMonth(), obj.d || 1, obj.H || 0, obj.m || 0, obj.s || 0);
            }
        } else if ((typeof value === 'string') && /^(\d{4})[-/]?(\d{1,2})[-/]?(\d{1,2})( +(\d+):(\d+)(?::(\d+))?)?$/.test(value)) {
            value = new Date(
                RegExp.$1 >> 0,
                (RegExp.$2 >> 0) - 1,
                RegExp.$3 >> 0,
                (RegExp.$5 || 0) >> 0,
                (RegExp.$6 || 0) >> 0,
                (RegExp.$7 || 0) >> 0,
            );
        } else { // 其他的, 则直接 传递给 Date 让 Date 去处理
            value = new Date(value);
        }
    }

    return value;
};

// #endregion

// #region @Date#addDay

/**
 * 在当前日期添加指定的天数并返回新日期。
 * @param {Number} value 要添加的天数。如果小于 0 则倒数指定天数。
 * @returns {Date} 返回新日期对象。
 * @example new Date().addDay(1)
 */
Date.prototype.addDay = function (value) {
    return new Date(+this + value * 86400000);
};

// #endregion

// #region @Date#addMinute

/**
 * 在当前分钟添加指定的分钟数并返回新日期。
 * @param {Number} value 要添加的分钟数。如果小于 0 则倒数指定分钟数。
 * @returns {Date} 返回新日期对象。
 * @example new Date().addMinutes(1)
 */
Date.prototype.addMinute = function (value) {
    return new Date(+this + value * 60000);
};

// #endregion

// #region @Date#addMonth

/**
 * 在当前日期添加指定的月数。
 * @param {Number} value 要添加的月数。如果小于 0 则倒数指定月数。
 * @returns {Date} 返回新日期对象。
 * @example new Date().addMonth(1)
 */
Date.prototype.addMonth = function (value) {
    const date = new Date(+this);
    date.setMonth(date.getMonth() + value);
    if (this.getDate() !== date.getDate()) {
        date.setDate(0);
    }
    return date;
};

// #endregion

// #region @Date#toDay

/**
 * 获取当前日期的日期部分。
 * @returns {Date} 返回新日期对象，其 时/分/秒 部分已被清零。
 * @example new Date().toDay()
 */
Date.prototype.toDay = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate());
};

/**
 * 返回 yyy-MM-dd 格式的日期字符串
 * @return {String}
*/
Date.prototype.toDayString = function () {
    return this.format('yyyy-MM-dd');
};

// #endregion

// #region @Date#now

Date.now = Date.now || /* istanbul ignore next */ function () {
    return +new Date();
};

// #endregion
// #region @Date#getDays

/**
 * 获取两个时间相差几天。
 * @returns Days 返回多少天。
 * @example Date().getDays()
 */
Date.getDays = function (date1, date2) {
    return (Date.parse(new Date(date1)) - Date.parse(new Date(date2))) / 24 / 60 / 60 / 1000;
};

// #endregion


// #region @Date#getWeek

/**
 * 转换成周几。
 * @returns week 返回周几。
 * @example Date().getWeek()
 */
const WeekMap = {
    0: '周日',
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六',
};
Date.getWeek = function (date) {
    return WeekMap[new Date(date).getDay()];
};
// #endregion

// #region @Date#getMonth

/**
 * 获取月份。
 * @returns month 返回月份。
 * @example Date.getMonth()
 */
Date.getMonth = function (date) {
    const month = new Date(date).getMonth();
    return isNaN(month) ? null : month + 1;
};
// #endregion


// #region @Date#getMonth

/**
 * 是否存在指定月份。
 * @returns month 返回指定月对象。
 * @example Date.hasMonth()
 */
Date.hasMonth = function (list, date) {
    let idx = null;
    const month = Date.getMonth(date);

    if (month !== null) {
        for (let i = 0, j = list.length; i < j; i++) {
            if (list[i].month == month) {
                idx = i;
                break;
            }
        }
    }

    return idx;
};
// #endregion


// #region @Date#compareDate
/**
 * 比较date1 date2的大小关系：type【0:大小date1>date2, 1:大小date1>=date2, 2:是否相等date1==date2】。
 * @returns month 返回true false。
 * @example Date.compareDate()
 */
Date.compareDate = function (date1, date2, type) {
    date1 = new Date(date1).getTime();
    date2 = new Date(date2).getTime();

    switch (type) {
        case 2:
            return date1 == date2;
        case 1:
            return date1 >= date2;
        case 0:
            return date1 > date2;
    }
};
// #endregion
