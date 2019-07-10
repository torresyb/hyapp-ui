<template>
    <div>
        <hy-mask v-if="showMask" v-model="show" @click.native="close" :opacity="maskerOpacity"></hy-mask>
        <transition :name="`hy-popup-animate-${position}`">
            <div
                v-show="show"
                :style="styles"
                class="hy-popup-dialog"
                :class="[`hy-popup-${position}`, show ? 'hy-popup-show' : '']">
                <slot v-if="shouldRenderBody"></slot>
            </div>
        </transition>
    </div>
</template>
<script>
import Mask from '../mask/mask'
import {preventScroll} from '../../utils/dom';
export default {
    components: {
        'hy-mask': Mask
    },
    props: {
        value: Boolean,
        height: {
            type: String,
            default: 'auto'
        },
        width: {
            type: String,
            default: 'auto'
        },
        showMask: {
            type: Boolean,
            default: true
        },
        closeOnMasker: {
            type: Boolean,
            default: true
        },
        maskerOpacity: {
            validator(val) {
                return /^([0]|[1-9]\d*)?(\.\d*)?$/.test(val);
            },
            default: .5
        },
        isTransparent: Boolean,
        hideOnBlur: {
            type: Boolean,
            default: true
        },
        position: {
            type: String,
            default: 'bottom'
        },
        maxHeight: String,
        popupStyle: Object
    },
    data () {
        return {
            layout: '',
            initialShow: true,
            hasFirstShow: false,
            shouldRenderBody: true,
            show: this.value
        }
    },
    computed: {
        styles () {
            const styles = {}
            if (!this.position || this.position === 'bottom' || this.position === 'top') {
                styles.height = this.height
            } else {
                styles.width = this.width
            }
            if (this.maxHeight) {
                styles['max-height'] = this.maxHeight
            }
            this.isTransparent && (styles['background'] = 'transparent')
            if (this.popupStyle) {
                for (let i in this.popupStyle) {
                    styles[i] = this.popupStyle[i]
                }
            }
            return styles
        }
    },
    watch: {
        value (val) {
            val ? preventScroll.lock() : preventScroll.unlock();
            this.show = val
        }
    },
    mounted () {
        console.log(this.show)
    },
    beforeDestroy() {
        preventScroll.unlock();
    },
    methods: {
        close() {
            if (this.closeOnMasker) {
                this.show = false;
                this.$emit('input', false);
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .hy-popup-dialog {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #efefef;
        z-index: 501;
        transition-property: transform;
        transition-duration: 300ms;
        max-height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .hy-popup-dialog.hy-popup-left {
        width: auto;
        height: 100%;
        top: 0;
        right: auto;
        bottom: auto;
        left: 0;
    }
    .hy-popup-dialog.hy-popup-right {
        width: auto;
        height: 100%;
        top: 0;
        right: 0;
        bottom: auto;
        left: auto;
    }
    .hy-popup-dialog.hy-popup-top {
        width: 100%;
        top: 0;
        right: auto;
        bottom: auto;
        left: 0;
    }
    .hy-popup-mask {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        tap-highlight-color: rgba(0,0,0,0);
        z-index: -1;
        transition: opacity 400ms;
    }
    .hy-popup-mask.hy-popup-show {
        opacity: 1;
    }
    .hy-popup-animate-bottom-enter, .hy-popup-animate-bottom-leave-active {
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }
    .hy-popup-animate-left-enter, .hy-popup-animate-left-leave-active {
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
    }
    .hy-popup-animate-right-enter, .hy-popup-animate-right-leave-active {
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
    }
    .hy-popup-animate-top-enter, .hy-popup-animate-top-leave-active {
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }
</style>

