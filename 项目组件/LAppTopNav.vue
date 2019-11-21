<template>
    <div class="app-top-nav" v-show="isShow">
        <div class="nav-bar">
            <span class="icon icon_back" @click="goBack">返回</span>
            <span>{{title}}</span>
            <span class="icon icon_reload" @click="goReload">刷新</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: "LAppTopNav",
        props: {
            title: {
                type: String,
                default: "中银E卡惠"
            }
        },
        data() {
            return {
                isShow: true
            }
        },
        mounted() {
            // 大于指定版本隐藏
            this.isShow = !(this.comparisonVersion(this.getAppVersion(), "9.9.9") === 1);
        },
        methods: {
            comparisonVersion(version1, version2) {
                let v1 = version1.split('.');
                let v2 = version2.split('.');
                for (let i = 0; i < v1.length; i++) {
                    if (v1[i] * 1 > v2[i] * 1) {
                        return 1;
                    } else if (v1[i] * 1 < v2[i] * 1) {
                        return -1;
                    }
                }
                return 0;
            },
            getAppVersion() {
                // Mozilla/5.0 (Linux; Android 9; MI 8 SE Build/PKQ1.181121.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.136 Mobile Safari/537.36/bocapp(6.2.0);lsta:4;;sessionId:4cca717d-441e-4e6e-b323-6d2eedc5c0f1;cifNumber:363304468;
                // Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16D57 (5806579712) bocapp(6.2.0);lsta:4;;cifNumber:554408387;;sessionId:ffe70168-acff-4ba1-a450-0ba3874eed76_encry;
                let userAgent = window.navigator.userAgent;
                return userAgent.indexOf('bocapp(') > -1 ? userAgent.match(/bocapp\(\S+\)/)[0].slice(7, -1) : '0.0.0';
                // 特性过新
                // let array = userAgent.match(/(?<=bocapp\()(\S+)(?=\))/g);
                // if (array && array.length === 1) {
                //     return array[0];
                // }
                // return "";
            },
            goBack() {
                if (this.$route.path === '/') {
                    window.c_plugins.merchantBridge.goToNative(function () {
                    }, function (err) {
                        alert(err.message || err || '网络错误，请检查网络连接')
                    }, {page: '0'})
                } else {
                    this.$router.go(-1)
                }
            },
            goReload() {
                window.location.reload()
            },
        }
    }
</script>

<style scoped lang="less">
    @height: 40px;

    .app-top-nav {
        &:before {
            /*占位元素*/
            display: block;
            content: " ";
            height: @height;
            width: 100%;
        }
    }

    .nav-bar {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 99;
        width: 100%;
        height: @height;
        display: flex;
        justify-content: space-between;
        align-content: center;
        line-height: 1;
        background: #ffffff;
        border-bottom: 1px solid rgba(102, 102, 102, 0.6);

        span {
            padding: 12px 0;
            font-size: 16px;
        }

        .icon {
            color: transparent;
        }

        .icon img {
            height: 100%;
            width: auto;
        }

        .icon_back {
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAArlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABeyFOlAAAAOXRSTlMA/PUK8m3V6qbcUe3Pn0AlDplWTDeMXEcvKwMCkhHhZTszFOXEv4R1GgbJtH96YEQXt/cgq66HHhbfGfOeAAAEFklEQVR42u2dWXLaUBREL5LAYkbM82TAjDFgTHz3v7EYVzl2SPOTj1R1F2cHXRSS3nl3sDt37ty582/02sks/zBLysbNqhr5B/lc14gJd/6bkfESLvyLoGOsVBr+ndPKOLnK4T4wSgaJX1E3RqZFv+bJCNnHLhFkefK/aRkd5Y0DlsZGe+6AOd3jd7J2QL5tZEwKDkjljIxxRiNHKeuAgC5Ha+iAB7onby3vgMdn46KXixyQHRsXvWrKARm6HE1HFOg+ekeOmNG9B9OOmNMdcHGOzYuRsXPEie6Dd+uIeGpc9M6OSNhsQ7fhiH7FuAgTkRxFRyxC42JQTDlgy5Zjf4I5dmw5Xg4wR5rNM5RnDnOw3YW0sWYY9YyLCdQMwQ8jo56F+qppZIwfoWaoGhmlB6gZ+LQPzJGtGRm1CGoGOn1VxTlKRkYz0NAlP2CO9cTISAciugTm2NBVzTzBHK902mcLc8Q/jYwFzFHcGxerxhFqBjZ9FfZTErpkkKAcqQbb8fwNap/jgu1Yu4xhjq2RUT44INgZGViXRHSFS501zJE2MrD2iegKYOsZqEvotE8J56DTJc9YX9HpkhqukqHTJbmhRJWMVbG+4tMlOAefLslDfUWnS0YR1D58VTKBAw5suqSbTkHtw6YZwicHpF7ZqmTCHcwRs1WXVM4wR5HteF5pwBwJ2/F80Ic5+kbGtAhzNIyMt9gRCyPjBeeg0z6djbsL9Hl15o6g0yWT7/qKuF+4XnAEnS4ZwxxHuioZlaaiEtQMEZ0uaeFqH7rqElwlM2TTPr1cINFU1K2KNBXhHDO66pIy1FdzNl1iqxjqEjbNYDZ1wCtbVcY7LYWmogsLoBnYqjI+SPyaiO//ceEMBBblL9JU+Y90VJ5a4doBBzbt/k490HizmzVd42pK5+v3ch7RuIaWOSEKndl1LMpNr0VXznTLNKboTKOO+9Wx8Tr3I2adg8aNlc4dos6trs49u07lw+1aFLZJDjrVQTr1WjoVdDo1jTpVpkJ1vzqV2JfaeIlJmDe7FYaEmkilf0Sno0enx0qn602nD1GnM1SnV1ene1qnn11nwoDOzAedKRw6c1FuTqpJCOs9RGYHCU1z0pmvpTPxTGcGnc5UQJ05jTqTM3VmmepMl9WZ96szgVlnJrbOlHKdufE6k/x1divobLvQ2T+isxFGZ0ePztYknT1WOpvFhHa96Wzf09mHqLOhUmdnqMwWV529ujqbjoV2T99qcIoYNdGN/ex8B/lJwRGEEnKydkCW8HquPXfAmc+tWHmDHl18h1+z5QkkIfx+NNvHEr1zHw1OCq1zFwaJX0H4oYIbnAgLPWCSA58Q/iRc+BdHvqPiF+GOunP5G6vnzOcdPOF7/Q/2zfhxWGwSqro7d+78P34BIKVx1ersm0MAAAAASUVORK5CYII=") no-repeat center / auto 60%;
        }

        .icon_reload {
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAq1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0NbREAAAAOHRSTlMAjPwF+ALh7MprCPTw24BNE3a3mlhBFwvnezLWvaqVUy3PcDnTpEcjD7KfYD0nxa+GNVyQGyDCZLEpFaMAAAdwSURBVHja7NuJcqIwHMfxv5wCUhSpt1TrWe+j7v7e/8l2dnZ2WiGgQILQ8fMAjl+jJMFAT09PT09PT09PJbScOCej+/JXwzg5r72WSiVj9tYVt4MQqTN2z8Z8UYqgkTG0cYNSbRpHkwpLnjTcGu6lDN4vVEDtk6sgqf5hRMXyurKQzrTxSUVx6WrIYvAmUwHMXWSmdVv0WPKpDy6U2YIeRz1p4EaabelBnD74Gj5kVI5VcCed65SzxRBC1N5lypH8IkEUe0K5mdgQyW9TJNkb2ta0uSEOZB+CaXOKsLHxz+CTslqMcTfJ0jV7XP01tnUJSfgmsXgS/tOPlM3Jui+hP+w6F/rGbG2PTmM2VnCP6YLCjgq+1BaUgbnCbfre6Mlxi/2PGm6yThSk9vHdjNK7THGD5TZ6Kt2ijoyhjhvOwddxcEVaUlrz2o2KoSPT3Ta3lv6DwDv1cc2jlE4SYigfXpuSaa/HiGNf6DsX1xqUzgExOka6gd58IEatR9/scK1CqawQTTNMSmu7UhDJ2tCXajCEd4e9limLz4qFKMqcc8gMUfS1SlnVzwoiSG8xIRw7JH8peDUtvXEMaSLCbkS8bLSYEk4hlchvFXFkVqSYEh4hXbCNP4mvoxZR8solZA22pky8tfdgqi04hDgSWBSPRHhXwGK3M4dsFbBoIxJjUwOLq2YMMW2wVOskylYDSyVjSBMsA5PEqVfB4mUK8cAyU0mk9gAMSi9DyMICw4EEk2dg6NipQ+Q+GAwSrwmW1CE+GLqUhyHPkA0YfMqFuucXYmoIG1JO5F/cQs4IG8iUl7rGKaSHsHGb8jOy+IQwhta6UJ4cLiEOc3LN14FDiGojpEk5U3fZQ34jpG+SaPLk9YqnZA2RNQQpCxKs7lsIyhpiIKRBgk10gHeI2UHQVCWxegr4hxgI6ZFYpgb+IaqW/xWrCwEhHoL0JQnWFxFSRdCaBGtDQEgPQbZKgi1EhPj5Dwi1kFyX4pk1BHRkEk1VkJhH8U4P2aXvkZRUp3guAnSTxJsjqSbFq0usxYl4LpLRlknXvcqS8mAmK9FHiT+ZPeVDfVFw292ng0wJAW+Ul8/GLx23KdPmJsWPrlaI08XJnRHgUzn1EXCkUqojQKNych5+64STCgI8KqcdApZUSqFF6JjKaYuAM5WThwCHyunwQ34ioe2NTiU1xrUdlZTyQ6bDenhzWE69n3LRmiNgS0XTMlau77WTTiNFe8S5tZLwV60hJ/s7gYpl1MF/uzrFeCn2NNLq4Mt0SdEqxd5Vfdx92srHtSkVyfH+uyLNQk/sB1yb3/9IgktFsse19/vP8u+pSHa4dijriPxp716XU4WBOICvKQgKWu2xeG2h0Npirb14+7//k51PnTknIBIksM7wewFlQsgSsrtz+UKudY6083+x2rJ+arlyRHut6wgk4ZWu7F1IjvljLYMYGUDiK0S/nD4pvEKyppPuOb+PqPy5gPMbYgcSL2M+cX5n36pMYIvxLsod/jdX2dc6EB/ywh6rBJgTYqMLyVZp73dAXASZ66HM5/vY6kASXen3kQdIxpTFYfvFSo59e5Rpw3WSBIopOS1IfOIhVDwNd8v1BEcMyUwxVu4RCzfyFDFM1bMoEXHgQ7KgM1o8761YOZxdQ2JxeLl6E5AEdIbpcnxudaC+m/AChtuNNiSrAgedjPrXxD1kywIPOkypbo+QWCadt2I33QdGoeNw95B1qF5fkN1THhOlbAX9xk7Bg5Z9yN6pTlMUnLUeWAVcyXwW4VE+MashmUIWU073Cllv2u0MyNaU17z+zOmMvBKbcjsCXE6W+8DJnR2eubr5/4litCkLqQ6trAEpmM8eUPUikTEgRWdJr0tVG0yQsCQl5pxBzQdaIMEmRRGSfKrWEEmzMmpMunuq0rdAwoqUeY72SjXqNXecHak71ls7aPyEstaAQ63VnDZIeqJC9k6N9bViJIkPKiasr+LZqtyfXtRVg66FFAsqzHORok+amelVAQdUnK9ap1FfQrhYXzbGbCpn9uki5qHqWqa7HtJsTA3rq9bqshbSWB5d6sNBGuOHdBgKpDG+6XJLUV0F5jukEksqQ4h09o7K9dpDuhGV47GSKuU3oYN0HSLdxV7tgMoSzXHCkNSpV/LfvlEZPOkXtAUSf7T1VpDvKlmLytXX1+2iG06g8TpkR5HVf6T4pYyHFvReh2zpaOgI4w1dnCZC0mE2KblHz9v7QiCDcUt67J5L7Jo0HsUGMk1mpMt4UU4fq5toujBwxsYjfcwWznMzO4t1o+Gdg/O+TNJqZKn3evv16vcfesjFWpJug1i9+5791GtbDvI7eFSBkQu9RN+kSngL6GR/UGVCA7q4HcqLcxdX8ccjFUz76iL+IGUMOx3bERXEqfc0nm+pMD7dwLGp/TBrGf3ZxSeL2oP7aQ+XeA7rP8f6a91qoxjrkcVg/COY2lDlfvo3xJB3jF3kZX2GM5P4CjrnI3XxvDpySmc+qTt7/3o5tAWS2ndfPwHL2ymDuYv8Yf/XsDO6jcbUaDQajUaj0WjU5y8h+GJWWuXbbAAAAABJRU5ErkJggg==") no-repeat center / auto 60%;
        }
    }
</style>