<template>
    <div class="hy-mask" v-if="show" :style="styles"></div>
</template>

<script type="text/babel">
    import {addClass, removeClass, getScrollview, isIOS} from '../../utils/dom';
    export default {
        name: 'yd-mask',
        data() {
            return {
                show: this.value
            }
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            bgcolor: {
                type: String,
                default: '#000'
            },
            zindex: {
                default: 400
            },
            opacity: {
                default: .5
            },
            animated: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            value(val) {
                this.show = val;
                if (isIOS) {
                    if (val) {
                        addClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                    } else {
                        setTimeout(() => {
                            removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                        }, 200);
                    }
                }
            }
        },
        computed: {
            styles() {
                const style = {'z-index': this.zindex, 'background-color': this.bgcolor};
                if (this.show) {
                    style['opacity'] = this.opacity;
                    style['pointer-events'] = 'auto';
                }
                return style;
            }
        },
        mounted() {
            this.scrollView = getScrollview(this.$el);
        },
        beforeDestroy() {
            isIOS && removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
        }
    }
</script>

<style lang="less">
    .hy-mask{
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
        pointer-events: none;
        transition: opacity .2s ease-in;
        opacity: 0.5;
    }
    .g-fix-ios-overflow-scrolling-bug {
        /* 针对IOS 修复 css overflow scroll bug */
        -webkit-overflow-scrolling: auto !important;
    }

    .g-fix-ios-prevent-scroll {
        overflow: hidden !important;
        position: fixed;
        width: 100%;
    }
</style>
