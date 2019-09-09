<template>
    <scroller lock-y :scrollbar-x="false">
        <flexbox class="scroll_box" :style="{width:scrollWidth}">
            <slot></slot>
        </flexbox>
    </scroller>
</template>

<script>
    import {Scroller, Flexbox} from 'vux'

    export default {
        props: [
            "list",
            "itemWidth",
        ],
        components: {
            Scroller,
            Flexbox
        },
        computed: {
            scrollWidth() {
                let itemWidth = parseInt(this.itemWidth);
                let unit = this.itemWidth.replace(/[0-9]/g, "");
                if (this.list) {
                    return this.list.length * itemWidth + unit;
                } else {
                    return "1000vw";
                }
            }
        },
    }
</script>

<style scoped lang="less">
    .scroll_box {
        flex-wrap: nowrap;
        /*position: relative;*/
        width: 1000vw;
    }
</style>
