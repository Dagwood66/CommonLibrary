function toQueryStr(obj) {
    return Object.getOwnPropertyNames(obj).map(function (key) {
        return [key, encodeURIComponent(obj[key])].join("=");
    }).join("&");
}

export function loginWxGd(pid, backUrl, params = {}, backParams = {}) {
    let url = "/api/gdekhback/phone/is_login.html";
    return this.$http.post(url, {pid: pid}).then(res => {
        if (res.data.status !== 0) {
            window.location.href = url + '?' +
                toQueryStr({pid, ...params}) + '&' +
                'back_url=' + encodeURIComponent("/boc/gdetc/#" + backUrl + '?' +
                    toQueryStr({pid, ...backParams})
                );
        } else {
            return res;
        }
    }, res => {
        console.log(res);
        return res;
    })
}

//TODO 登陆测试
export function loginWxGdTwo(pid, backUrl, params = {}, backParams = {}) {
    let url = "/api/gdekhback/phone/is_login.html";
    let wxUrl = "/api/gdekhback/phone/is_oauth.html";
    return this.$http.post(url, {pid: pid}).then(res => {
        if (res.data.status !== 0) {
            window.location.href = url + '?' +
                toQueryStr({pid, ...params}) + '&' +
                'back_url=' + encodeURIComponent("/boc/gdetc/#" + backUrl + '?' +
                    toQueryStr({pid, ...backParams})
                );
        } else {
            this.$http.post(wxUrl, {
                pid: pid
            }).then((res) => {
                if (res.data.status !== 0) {
                    window.location.href = wxUrl + '?' +
                        'pid=' + pid + '&' +
                        'wx_id=2' + '&' +
                        'back_url=' + encodeURIComponent("/boc/gdetc/#" + backUrl)
                } else {
                    return res;
                }
            })
        }
    }, res => {
        console.log(res);
        return res;
    })
}