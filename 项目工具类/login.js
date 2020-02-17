import axios from "axios"

let baseProjectUrl = "/boc/hebei_lifecycle/";

function toQueryStr(obj) {
    return Object.getOwnPropertyNames(obj).map(function (key) {
        return [key, encodeURIComponent(obj[key])].join("=");
    }).join("&");
}

export function isLogin(pid) {
    let url = "/api/gdekhback/phone/is_login.html";
    return axios.post(url, {
        pid: pid
    }).then(res => {
        if (res.data.status === 0) {
            return res;
        } else {
            return Promise.reject(res);
        }
    }, res => {
        return Promise.reject(res);
    });
}

export function isLoginWx(pid) {
    let url = "/api/gdekhback/phone/is_oauth.html";
    return axios.post(url, {
        pid: pid
    }).then(res => {
        if (res.data.status === 0) {
            return res;
        } else {
            return Promise.reject(res);
        }
    }, res => {
        return Promise.reject(res);
    });
}

export function login(pid, backUrl, backParams = {}) {
    let url = "/api/gdekhback/phone/is_login.html";
    // noinspection UnnecessaryLocalVariableJS
    let href = url + '?' +
        toQueryStr({pid}) + '&' +
        'back_url=' + encodeURIComponent(baseProjectUrl + "#" + backUrl + '?' +
            toQueryStr({...backParams})
        );
    window.location.href = href;
}

export function loginWx(pid, backUrl, backParams = {}) {
    let url = "/api/gdekhback/phone/is_oauth.html";
    // noinspection UnnecessaryLocalVariableJS
    let href = url + '?' +
        'pid=' + pid + '&' +
        'wx_id=2' + '&' +
        'back_url=' + encodeURIComponent(baseProjectUrl + "#" + backUrl + "?" +
            toQueryStr({...backParams})
        );
    window.location.href = href
}

/**
 * 普通登陆
 * */
export function isLoginAndLogin(pid, backUrl, backParams = {}) {
    return isLogin(pid).then(res => {
        return res;
    }, res => {
        return login(pid, backUrl, backParams).then(res => {
            return res;
        }, res => {
            return Promise.reject(res);
        });
    })
}

/**
 * 微信登录
 * */
export function isLoginWxAndLoginWx(pid, backUrl, backParams = {}) {
    return isLoginWx(pid).then(res => {
        return res;
    }, res => {
        return loginWx(pid, backUrl, backParams).then(res => {
            return res;
        }, res => {
            return Promise.reject(res);
        });
    })
}