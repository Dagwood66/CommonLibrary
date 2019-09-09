<template>
    <div class="bevel-angle-wrap">
        <div class="bevel-angle">
            <slot></slot>
        </div>
    </div>
</template>
<!-- 斜角 -->
<script>

    export default {
        name: "LBevelAngle",
        props: {
            type: {
                default: ''
            }
        },
        components: {},
        data() {
            return {}
        },
        computed: {},
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped lang="less">
    .bevel-angle-wrap {
        position: absolute;
        top: 0;
        right: 0;
        transform: rotate(45deg);

        .bevel-angle {
            position: absolute;
            top: 15px;
            left: 50%;
            padding: 4px 0;
            min-width: 100px;
            transform: translateX(-50%);

            font-size: 12px;
            line-height: 1;
            color: #ffffff;
            text-align: center;

            background-color: #f2581c;
        }
    }
</style>
