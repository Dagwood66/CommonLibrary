<template>
    <div class="wrapper" v-show="isShow">
        <div class="wrapper-content">
            <p>系统维护中</p>
            <input v-model="inputValue" title="">
        </div>
    </div>
</template>

<script>

    export default {
        name: "LTest",
        data() {
            return {
                isShow: true,
                inputValue: ""
            }
        },
        mounted() {
            if (process.env.NODE_ENV === "development") {
                this.isShow = false;
            }
        },
        methods: {},
        watch: {
            "inputValue": function () {
                this.isShow = this.inputValue !== "jhm123456";
                if (!this.isShow) {
                    // 需 npm install --save-dev vconsole
                    let VConsole = require("vconsole");
                    if (VConsole) {
                        new VConsole();
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;

        background-color: #ffffff;

        .wrapper-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            text-align: center;

            input {
                border: 0;
            }
        }
    }
</style>