<template>
    <div>
        <hy-mask v-if="showMask" v-model="showValue" @click.native="hideMask" :opacity="maskerOpacity"></hy-mask>
        <div :class="['hy-confirm', type]" v-show="showValue">
            <div class="hy-confirm-main">
                <div class="hy-close-btn" v-if="closeFlag" @click="closeFun"></div>
                <div class="hy-title" v-if="title">{{title}}</div>
                <div class="hy-confirm-center">
                    <p class="hy-txt" v-if="txt" :style="{'text-align': txtStyle}" v-html="txt"></p>
                    <slot></slot>
                </div>
            </div>
            <div class="hy-confirm-btns"  v-if="cancelTxt || sureTxt">
                <span class="hy-btn hy-btn-cancel" v-if="cancelTxt" @click="cancelFun">{{cancelTxt}}</span>
                <span class="hy-btn hy-btn-sure" v-if="sureTxt" @click="sureFun">{{sureTxt}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import Mask from '../mask/mask'
import {preventScroll} from '../../utils/dom';
export default {
    name: 'confirm',
    components: {
        'hy-mask': Mask
    },
    props: {
        value: Boolean,
        title: { // 弹窗标题
            type: String,
            default: ''
        },
        showMask: {
            type: Boolean,
            default: true
        },
        maskerOpacity: {
            validator(val) {
                return /^([0]|[1-9]\d*)?(\.\d*)?$/.test(val);
            },
            default: .5
        },
        txt: { // 弹窗中间内容文案
            type: String,
            default: ''
        },
        cancelTxt: { // 灰色按钮
            type: String,
            default: ''
        },
        sureTxt: { // 橙色按钮
            type: String,
            default: ''
        },
        closeFlag: { // 关闭按钮
            type: Boolean,
            default: false
        },
        closeOnConfirm: { // 点击确认按钮是否关闭弹框
            type: Boolean,
            default: true
        },
        txtStyle: { // 弹窗中间内容文案居中方式
            type: String,
            default: 'left'
        },
        type: {
          type: String,
          default: ''
        },
        closeOnMasker: {
            type: Boolean,
            default: true // 点击空白区域是否关闭弹窗 默认关闭
        }
    },
    data () {
        return {
            showValue: this.value
        }
    },
    watch: {
        value (val) {
            val ? preventScroll.lock() : preventScroll.unlock();
            this.showValue = val
        }
    },
    created () {
        this.callback = null
    },
    methods: {
        closeFun () {
            this.hide()
            this.$emit('on-close')
        },
        cancelFun () {
            this.hide()
            this.$emit('on-cancel')
        },
        sureFun () {
            if (this.closeOnConfirm) {
                this.hide()
            }
            this.callback ? this.callback() : this.$emit('on-confirm')
        },
        hideMask () {
            if (this.closeOnMasker) {
                this.hide()
            }
        },
        show (cb) {
            this.showValue = true
            this.$emit('input', true)
            this.callback = cb
        },
        hide () {
            this.showValue = false
            this.$emit('input', false)
        }
    }
}
</script>
<style lang="less" scoped>
    .hy-confirm {
        position: relative;
        z-index: 501;
    }
    .hy-close-btn {
        position: absolute;
        right: 5px;
        top: 5px;
        width: 30px;
        height: 30px;
        &:before,
        &::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -1.5px;
            margin-top: -7px;
            width: 3px;
            height: 14px;
            background-color: #bbb;
        }
        &:before {
            transform: rotate(45deg);
        }
        &:after {
            transform: rotate(-45deg);
        }
    }
    .hy-confirm {
        position: fixed;
        left: 50%;
        top: 50%;
        z-index: 501;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 80%;
        box-sizing: border-box;
        border-radius: 10px;
        background-color: #fff;
        .hy-confirm-main{
            padding: 18px 18px 20px;
        }
        .hy-title {
            padding-bottom: 10px;
            text-align: left;
            font-size: 18px;
            line-height: 25px;
            color: #333;
            font-weight: bold;
        }
    }
    .hy-confirm-center {
        .hy-txt {
            font-size: 15px;
            line-height: 21px;
            color: #444;
        }
    }
    .hy-confirm-btns {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        height: 45px;
        line-height: 45px;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        font-size: 18px;
        &:before {
            content: '';
            width: 100%;
            height: 1px;
            left: 0;
            position: absolute;
            border-top: 1px solid #ddd;
            top: 0;
            transform: scaleY(0.5);
            transform-origin: 0 0;
        }
        .hy-btn {
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;
            text-align: center;
            height: 100%;
            &:nth-child(2) {
                position: relative;
                &:before {
                    content: '';
                    width: 1px;
                    height: 100%;
                    left: 0;
                    position: absolute;
                    border-left: 1px solid #ddd;
                    top: 0;
                    transform: scaleX(0.5);
                    transform-origin: 0 0;
                }
            }
        }
        .hy-btn-cancel {
            color: #777;
        }
        .hy-btn-sure {
            color: #ff6a45;
        }
    }
</style>
