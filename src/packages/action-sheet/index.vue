<template>
    <div class="hyapp-actionsheet-main">
        <transition name="hyapp-actionsheet-mask">
            <div
                class="hyapp-mask hyapp-mask_transparent"
                @click="onClickingMask"
                v-show="show"></div>
        </transition>
        <div
            :class="['hyapp-actionsheet', {'hyapp-actionsheet_toggle': show}]"
            ref="iOSMenu">
            <div class="hyapp-actionsheet__menu">
                <div class="hyapp-actionsheet__cell" v-if="hasHeaderSlot">
                    <slot name="hyapp-header"></slot>
                </div>
                <slot name="hyapp-content">
                    <div class="hyapp-actionsheet__cell"
                         v-for="(text, key) in menus"
                         @click="onMenuClick(text, key)"
                         :key="key"
                         v-html="(text.label || text)"
                         :class="`hyapp-actionsheet-menu-${text.type || 'default'}`">
                    </div>
                </slot>
            </div>
            <div
                class="hyapp-actionsheet__action"
                @click="emitEvent('on-click-menu', 'cancel')"
                v-if="showCancel">
                <slot name="hyapp-action"><div class="hyapp-actionsheet__cell">{{cancelText || '取消'}}</div></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'actionsheet',
        mounted () {
            this.hasHeaderSlot = !!this.$slots['hyapp-header'];
            this.$nextTick(() => {
                this.$tabbar = document.querySelector('.hyapp-tabbar');
                this.$refs.iOSMenu && this.$refs.iOSMenu.addEventListener('transitionend', this.onTransitionEnd);
            });
        },
        props: {
            value: Boolean,
            showCancel: Boolean,
            cancelText: String,
            theme: {
                type: String,
                default: 'ios'
            },
            menus: {
                type: [Object, Array],
                default: () => ({})
            },
            closeOnClickingMask: {
                type: Boolean,
                default: true
            },
            closeOnClickingMenu: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                hasHeaderSlot: false,
                show: false
            };
        },
        methods: {
            onTransitionEnd () {
                this.$emit(this.show ? 'on-after-show' : 'on-after-hide');
            },
            onMenuClick (text, key) {
                if (typeof text === 'string') {
                    this.emitEvent('on-click-menu', key, text);
                } else {
                    if (text.type !== 'disabled' && text.type !== 'info') {
                        if (text.value || text.value === 0) {
                            this.emitEvent('on-click-menu', text.value, text);
                        } else {
                            this.emitEvent('on-click-menu', '', text);
                            this.show = false;
                        }
                    }
                }
            },
            onClickingMask () {
                this.$emit('on-click-mask');
                this.closeOnClickingMask && (this.show = false);
            },
            emitEvent (event, menu, item) {
                if (event === 'on-click-menu' && !/.noop/.test(menu)) {
                    let _item = item;
                    if (typeof _item === 'object') {
                        _item = JSON.parse(JSON.stringify(_item));
                    }
                    this.$emit(event, menu, _item);
                    this.$emit(`${event}-${menu}`);
                    this.closeOnClickingMenu && (this.show = false);
                }
            },
            fixIos (zIndex) {
                if (this.$el.parentNode && this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1) {
                    return;
                }
                if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {
                    this.$tabbar.style.zIndex = zIndex;
                }
            }
        },
        watch: {
            show (val) {
                this.$emit('input', val);
                if (val) {
                    this.fixIos(-1);
                } else {
                    setTimeout(() => {
                        this.fixIos(100);
                    }, 200);
                }
            },
            value: {
                handler: function (val) {
                    this.show = val;
                },
                immediate: true
            }
        },
        beforeDestroy () {
            this.fixIos(100);
            this.$refs.iOSMenu && this.$refs.iOSMenu.removeEventListener('transitionend', this.onTransitionEnd);
        }
    };
</script>
<style lang="less">
    .hyapp-mask {
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .6);
    }

    .hyapp-mask_transparent{
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }
    .hyapp-actionsheet {
        position: fixed;
        left: 0;
        bottom: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
        backface-visibility: hidden;
        z-index: 5000;
        width: 100%;
        background-color: #ECECEC;
        //slide up animation
        transition: transform .3s;
    }
    .hyapp-actionsheet__menu{
        background-color: #FFFFFF;
    }
    .hyapp-actionsheet__action {
        margin-top: 6px;
        background-color: #FFFFFF;
    }
    .hyapp-actionsheet__cell {
        position: relative;
        padding: 14px 0;
        line-height: 21px;
        text-align: center;
        font-size: 15px;
        &:before {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            height: 1px;
            border-top: 1px solid #d9d9d9;
            color: #d9d9d9;
            transform-origin: 0 0;
            transform: scaleY(0.5);
        }
        &:active{
            background-color: #ECECEC;
        }
        &:first-child{
            &:before{
                display: none;
            }
        }
    }
    //actionSheet aniamtion
    .hyapp-actionsheet_toggle{
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    .hyapp-actionsheet-menu-primary {
        color: #1AAD19;
    }
    .hyapp-actionsheet-menu-warn {
        color: #E64340;
    }
    .hyapp-actionsheet-menu-default {
        color: #000;
    }
    .hyapp-actionsheet-menu-disabled {
        color: #ccc;
    }
    .hyapp-actionsheet-mask-enter,
    .hyapp-actionsheet-mask-leave-active {
        opacity: 0;
    }
    .hyapp-actionsheet-mask-leave-active,
    .hyapp-actionsheet-mask-enter-active {
        transition: opacity 300ms!important;
    }
</style>
