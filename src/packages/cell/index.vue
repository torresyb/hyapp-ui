<template>
    <div class="hy-cell hy-1px-b">
        <div class="hy-cell-left">
            <slot name="cell-left"></slot>
        </div>
        <div :class="['hy-cell-right', `hy-${align}`]">
            <slot name="cell-right"></slot>
        </div>
        <i v-if="isLink" class="hy-link"></i>
    </div>
</template>
<script>
    export default {
        name: 'hy-cell',
        props: {
            isLink: {
                type: Boolean,
                default: true
            },
            align: { // 对齐方式 默认是justify-content: flex-end;
                type: String,
                default: 'right'
            },
            href: {
                type: String,
                default: ''
            }
        },
        data () {
            return {}
        }
    }
</script>
<style lang="less" scoped>
    @import "../../styles/common.css";
    .hy-cell{
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        height: 49px;
        .hy-cell-left{
            font-size: 15px;
            img{
                width: 20px;
                height: 20px;
                margin-right: 13.5px;
                vertical-align: middle;
            }
        }
        .hy-cell-right{
            font-size: 15px;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;
            &.hy-right{
                text-align: right;
            }
            &.hy-left{
                text-align: left;
            }
        }
        .hy-link{
            border: 6px dashed;
            display: inline-block;
            border-color: transparent transparent transparent #C7C7C7;
            margin-left: 5px;
            vertical-align: middle;
            position: relative;
            &:after{
                content: '';
                position: absolute;
                top: -6px;
                left: -8px;
                border: 6px solid;
                border-color: transparent transparent transparent white;
            }
        }
    }
</style>
