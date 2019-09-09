// 获取keyframes
function getKeyFrames(keyName) {
    let styleSheets = document.styleSheets;
    for (let i = styleSheets.length - 1; i >= 0; i--) { // style遍历
        let styleSheet = styleSheets[i];
        let cssRules = styleSheet.cssRules;
        for (let j = cssRules.length - 1; j >= 0; j--) { // css规则遍历
            let cssRule = cssRules[j];
            if (cssRule.type === 7) { // 类型等于KeyFrames
                if (cssRule.name === keyName) { // keyFrames name相等
                    return cssRule;
                }
            }
        }
    }
}
// 添加style
function addStyle(str) {
    let styleEle = document.createElement("style");
    styleEle.type = "text/css";
    styleEle.innerHTML = str;
    document.querySelector("head").appendChild(styleEle);
    return styleEle;
}
// 移除style
function removeStyle(dom) {
    document.querySelector("head").removeChild(dom);
}