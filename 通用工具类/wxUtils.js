import axios from "axios";
import uuidV1 from "uuid/v1";
import sha1 from "js-sha1";

// 项目依赖 npm install js-sha1 uuid --save
// 微信地址 //res.wx.qq.com/open/js/jweixin-1.4.0.js
// 签名测试工具 http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign

let PROJECT_NAME = "gdyiqu";
let JS_API_TICKET = `${PROJECT_NAME}_js-api-ticket`;
let JS_API_TICKET_EXPIRE_TIME = `${PROJECT_NAME}_js-api-ticket-expire-time`;
let JS_APP_ID = `${PROJECT_NAME}_js-app-id`;
let JS_APP_ID_EXPIRE_TIME = `${PROJECT_NAME}_js-app-id-expire-time`;

function getLocalJsApiTicket() {
    let ticket = localStorage.getItem(JS_API_TICKET);
    let expireTime = localStorage.getItem(JS_API_TICKET_EXPIRE_TIME);
    if (ticket && expireTime) {
        expireTime = parseInt(expireTime);
        if (expireTime > new Date().getTime()) {
            return ticket;
        } else {
            return "";
        }
    }
    return "";
}

function getLocalAppId() {
    let ticket = localStorage.getItem(JS_APP_ID);
    let expireTime = localStorage.getItem(JS_APP_ID_EXPIRE_TIME);
    if (ticket && expireTime) {
        expireTime = parseInt(expireTime);
        if (expireTime > new Date().getTime()) {
            return ticket;
        } else {
            return "";
        }
    }
    return "";
}

function setLocalJsAppId(ticket, time = 1000 * 60 * 5) {
    localStorage.setItem(JS_APP_ID, ticket);
    localStorage.setItem(JS_APP_ID_EXPIRE_TIME, (new Date().getTime() + time).toString());
}

function setLocalJsApiTicket(ticket, time = 1000 * 60 * 5) {
    localStorage.setItem(JS_API_TICKET, ticket);
    localStorage.setItem(JS_API_TICKET_EXPIRE_TIME, (new Date().getTime() + time).toString());
}

function getRemoteJsApiTicket() {
    return axios.get("/api/gdekhback/phone/get_ticket_info?id=2").then(res => {
        if (res.data.status === 0) {
            setLocalJsApiTicket(res.data.info.jsapiTicket);
            setLocalJsAppId(res.data.info.appId);
            return res.data.info;
        } else {
            return Promise.reject(res);
        }
    }, res => {
        return Promise.reject(res);
    })
}

function getJsApiTicket() {
    return new Promise(((resolve, reject) => {
        let localJsApiTicket = getLocalJsApiTicket();
        let appId = getLocalAppId();
        if (localJsApiTicket && appId) {
            resolve({
                jsapiTicket: localJsApiTicket,
                appId: appId,
            });
        } else {
            getRemoteJsApiTicket().then(res => {
                resolve(res);
            }, res => {
                reject(res);
            });
        }
    }));
}

function getSignature(jsapiTicket, nonceStr, timestamp, url) {
    return sha1(`jsapi_ticket=${jsapiTicket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`);
}

function getConfig(data, apiList) {
    let isDebug = (function () {
        // return window.location.href.indexOf("debug") !== -1;
        return false;
    })();
    let appId = data.appId;
    let jsapiTicket = data.jsapiTicket;
    let timestamp = parseInt(new Date().getTime() / 1000);
    let nonceStr = uuidV1();
    let url = window.location.href.slice(0, window.location.href.indexOf("#"));
    let signature = getSignature(jsapiTicket, nonceStr, timestamp, url);

    return {
        debug: isDebug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature,// 必填，签名
        jsApiList: apiList // 必填，需要使用的JS接口列表
    }
}

export function config(apiList = ['onMenuShareTimeline', 'onMenuShareAppMessage']) {
    return new Promise(((resolve, reject) => {
        window.wx.ready(function () {
            resolve();
        });
        window.wx.error(function (res) {
            reject(res);
        });
        getJsApiTicket().then(res => {
            window.wx.config(getConfig(res, apiList));
        }, res => {
            reject(res);
        });
    }));
}

export function share() {
    window.wx.onMenuShareAppMessage({
        title: '宅家优惠来啦，在线购物八折！', // 分享标题
        desc: '众志成城 防控疫情 坚决打赢疫情防控阻击战',
        link: "https://gdecard.jiahuaming.com/boc/gdyiqu/#/",
        imgUrl: 'https://gdecard.jiahuaming.com/boc/gdyiqu/img/share.png'
    });

    window.wx.onMenuShareTimeline({
        title: '宅家优惠来啦，在线购物八折！', // 分享标题
        desc: '众志成城 防控疫情 坚决打赢疫情防控阻击战',
        link: "https://gdecard.jiahuaming.com/boc/gdyiqu/#/",
        imgUrl: 'https://gdecard.jiahuaming.com/boc/gdyiqu/img/share.png'
    });
}
