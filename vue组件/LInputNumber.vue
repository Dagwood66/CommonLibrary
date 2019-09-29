<template>
    <div>
        <button class="btn" @click="minus">-</button>
        <input class="input" type="number" title="" v-model="currentNumber">
        <button class="btn" @click="add">+</button>
    </div>
</template>

<script>
    import {mapState} from "vuex"

    export default {
        name: "LInputNumber",
        props: {
            min: {
                type: Number,
                default: 1
            },
            max: {
                type: Number,
                default: 100
            }
        },
        data() {
            return {
                currentNumber: 1
            }
        },
        watch: {
            value() {
                this.currentNumber = this.value;
            },
            currentNumber() {
                if (this.min > this.currentNumber) {
                    this.currentNumber = this.min;
                }
                if (this.max < this.currentNumber) {
                    this.currentNumber = this.max;
                }
                this.$emit("input", this.currentNumber);
            }
        },
        methods: {
            minus() {
                this.currentNumber -= 1;

            },
            add() {
                this.currentNumber += 1;
            }
        }
    }
</script>

<style scoped lang="less">
    .btn {
        width: 8vw;
        border: 1px solid #dcdcdc;

        text-align: center;
        background-color: #ffffff;
    }

    .input {
        width: 8vw;
        border: 1px solid #dcdcdc;

        text-align: center;
    }
</style>
