const dtUtils = require('@dtinsight/dt-utils');

const getCookieMap = () => {
    if (!document.cookie) return {};
    return document.cookie
        .split('; ')
        .filter(Boolean)
        .reduce((result, item) => {
            const [key, value] = item.split('=');
            result[key] = value;
            return result;
        }, {});
};

module.exports = {
    ...dtUtils,
    // 如果 copy 在新版本行为有变化，可在这里兜底
    copy: dtUtils.copy || (async () => true),
    Cookies: {
        ...dtUtils.Cookies,
        get: (key) => {
            const cookieMap = getCookieMap();
            return key ? cookieMap[key] || undefined : cookieMap;
        },
    },
};
