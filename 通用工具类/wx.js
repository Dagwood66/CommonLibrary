import axios from "axios";

// TODO 微信JDK测试
function loadWxJs() {
    let src = "//res.wx.qq.com/open/js/jweixin-1.4.0.js";

    return new Promise((resolve, reject) => {
        if (window.wx != null) {
            resolve();
            return;
        }
        let dom = document.createElement("script");
        dom.type = "text/javascript";
        dom.onload = function () {
            resolve();
        };
        dom.src = src;
        document.querySelector("body").appendChild(dom);
    })
}

function init(jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay']) {
    let url = document.location.href;
    return loadWxJs().then(res => {
        return new Promise((resolve, reject) => {
            window.wx.ready(() => {
                resolve({});
            });
            axios.post('/api/gdekhback/phone/get_wx_sign.html', {
                url: encodeURIComponent(url),
                wx_id: 2
            }).then(res => {
                window.wx.config({
                    debug: false,
                    appId: res.data.info.appId,
                    timestamp: res.data.info.timestamp,
                    nonceStr: res.data.info.nonceStr,
                    signature: res.data.info.signature,
                    jsApiList: jsApiList
                })
            });
        });
    });
}

function share() {
    window.wx.onMenuShareAppMessage({
        title: '惠聚中行日深度优惠', // 分享标题
        desc: '中国银行信用卡客户专享',
        link: 'http://gdecard.jiahuaming.com/boc/depth2019/',
        imgUrl: 'http://gdecard.jiahuaming.com/boc/depth/assets/title.png'
    });

    window.wx.onMenuShareTimeline({
        title: '惠聚中行日深度优惠', // 分享标题
        desc: '中国银行信用卡客户专享',
        link: 'http://gdecard.jiahuaming.com/boc/depth2019/',
        imgUrl: 'http://gdecard.jiahuaming.com/boc/depth/assets/title.png'
    });
}

export default {
    init: init,
    share: share,
}