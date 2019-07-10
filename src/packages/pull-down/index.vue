<template>
    <div ref="wrapper" class="list-wrapper">
        <div class="scroll-content">
            <div ref="listWrapper">
                <slot ref="scrollContain"></slot>
            </div>
            <slot name="pullup"
                  :pullUpLoad="pullUpLoad"
                  :isPullUpLoad="isPullUpLoad"
            >
                <div class="pullup-wrapper" v-if="pullUpLoad && !_isInitPullDown">
                    <div class="before-trigger" v-if="!isPullUpLoad && !isPullUpLoading">
                        <span>{{pullUpTxt}}</span>
                    </div>
                    <div class="after-trigger" v-else>
                        <p>加载中...</p>
                    </div>
                </div>
            </slot>
        </div>
        <slot name="pulldown"
              :pullDownRefresh="pullDownRefresh"
              :pullDownStyle="pullDownStyle"
              :beforePullDown="beforePullDown"
              :isPullingDown="isPullingDown"
              :bubbleY="bubbleY"
        >
            <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
                <slot name="pulldown-custom-made">
                    <div class="before-trigger" v-if="beforePullDown">
                        <p>下拉刷新</p>
                    </div>
                    <div class="after-trigger" v-else>
                        <div v-if="isPullingDown" class="loading">
                            <p>加载中...</p>
                        </div>
                        <div v-else><span>{{refreshTxt}}</span></div>
                    </div>
                </slot>

            </div>
        </slot>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import {getRect} from 'hyapp-ui/src/utils/dom';
    const COMPONENT_NAME = 'scroll';
    const DIRECTION_H = 'horizontal';
    const DIRECTION_V = 'vertical';
    export default {
        name: COMPONENT_NAME,
        props: {
            data: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            listenBeforeScroll: {
                type: Boolean,
                default: false
            },
            listenScrollEnd: {
                type: Boolean,
                default: false
            },
            isInitPullDown: {
                type: Boolean,
                default: false
            },
            isInitPullUp: {
                type: Boolean,
                default: false
            },
            direction: {
                type: String,
                default: DIRECTION_V
            },
            scrollbar: {
                type: null,
                default: false
            },
            pullDownRefresh: {
                type: null,
                default: false
            },
            pullUpLoad: {
                type: null,
                default: false
            },
            startY: {
                type: Number,
                default: 0
            },
            refreshDelay: {
                type: Number,
                default: 20
            },
            freeScroll: {
                type: Boolean,
                default: false
            },
            mouseWheel: {
                type: Boolean,
                default: false
            },
            bounce: {
                default: true
            },
            zoom: {
                default: false
            },
            isDropDownDistance: { // 是否暴露拉动的距离
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                beforePullDown: true,
                isRebounding: false,
                isPullingDown: false,
                isPullUpLoad: true,
                pullUpDirty: true,
                isPullUpLoading: false, // 初始化隐藏
                pullDownStyle: '',
                bubbleY: 0,
                _isInitPullDown: false
            };
        },
        computed: {
            pullUpTxt() {
                const moreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more) || '加载更多';
                const noMoreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore) || '已经加载到最后';
                return this.pullUpDirty ? moreTxt : noMoreTxt;
            },
            refreshTxt() {
                return (this.pullDownRefresh && this.pullDownRefresh.txt) || '下拉刷新';
            }
        },
        created() {
            this.pullDownInitTop = -50;
            this._isInitPullDown = this.isInitPullDown;
        },
        mounted() {
            this.$nextTick(() => {
                this.initScroll();
            });
        },
        destroyed() {
            this.scroll && this.scroll.destroy();
        },
        methods: {
            // 初始化scroll
            initScroll() {
                if (!this.$refs.wrapper) {
                    return;
                }
                if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
                    this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`;
                }
                let options = {
                    probeType: this.probeType,
                    click: this.click,
                    scrollY: this.freeScroll || this.direction === DIRECTION_V,
                    scrollX: this.freeScroll || this.direction === DIRECTION_H,
                    scrollbar: this.scrollbar,
                    pullDownRefresh: this.pullDownRefresh,
                    pullUpLoad: this.pullUpLoad,
                    startY: this.startY,
                    freeScroll: this.freeScroll,
                    mouseWheel: this.mouseWheel,
                    bounce: this.bounce,
                    zoom: this.zoom
                };
                this.scroll = new BScroll(this.$refs.wrapper, options);
                if (this.listenScroll) {
                    this.scroll.on('scroll', (pos) => {
                        if(this.isDropDownDistance){
                            this.$emit('setDropDownDistance',pos.y);
                        }
                        this.$emit('scroll', pos);
                    });
                }
                if (this.listenScrollEnd) {
                    this.scroll.on('scrollEnd', (pos) => {
                        this.$emit('scroll-end', pos);
                    });
                }
                if (this.listenBeforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforeScrollStart');
                    });
                    this.scroll.on('scrollStart', () => {
                        this.$emit('scroll-start');
                    });
                }
                // 初始化下拉刷新
                if (this.pullDownRefresh) {
                    this._initPullDownRefresh();
                }
                // 初始化下拉加载
                if (this.pullUpLoad) {
                    this._initPullUpLoad();
                }
            },
            disable() {
                this.scroll && this.scroll.disable();
            },
            enable() {
                this.scroll && this.scroll.enable();
            },
            refresh() {
                this.scroll && this.scroll.refresh();
            },
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
            },
            destroy() {
                this.scroll.destroy();
            },
            checkHeight() {
                this.$nextTick(() => {
                    if (this.$refs.listWrapper.firstChild && (this.$refs.listWrapper.firstChild.offsetHeight< (getRect(this.$refs.wrapper).height + 1))) {
                        this.scroll.closePullUp();
                        this.initPullUpLoad();
                    } else {
                        this.scroll.openPullUp();
                        this.initPullUpLoadEnd();
                    }
                });
            },
            forceUpdate(dirty) {
                if (this.pullDownRefresh && this.isPullingDown) {
                    this.isPullingDown = false;
                    this._reboundPullDown().then(() => {
                        this._afterPullDown();
                    });
                } else if (this.pullUpLoad && this.isPullUpLoad) {
                    this.isPullUpLoad = false;
                    this.isPullUpLoading = false;
                    this.scroll.finishPullUp();
                    this.pullUpDirty = dirty;
                    this.refresh();
                } else {
                    this.refresh();
                }
            },
            // 如果isInitPullDown： true 展示下拉loading
            initPullDownEnd() {
                this.pullDownStyle = `top:${this.pullDownInitTop}px`;
            },
            _initPullDownRefresh() {
                // 初始化前 loading
                if(this._isInitPullDown) {
                    let h = this.pullDownInitTop;
                    let Timer = setInterval(() => {
                        this.pullDownStyle = `top:${h++}px`;
                        if (h == 0) {
                            this.$emit('pullingDown');
                            clearInterval(Timer);
                        }
                    },10);
                }
                this.scroll.on('pullingDown', () => {
                    this.beforePullDown = false;
                    this.isPullingDown = true;
                    this.$emit('pullingDown');
                });
                this.scroll.on('scroll', (pos) => {
                    if (!this.pullDownRefresh) {
                        return;
                    }
                    if (this.beforePullDown) {
                        this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop);
                        this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`;
                    } else {
                        this.bubbleY = 0;
                    }
                    if (this.isRebounding) {
                        this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`;
                    }
                });
            },
            _initPullUpLoad() {
                // 初始上拉加载
                if (this.isInitPullUp) {
                    this.isPullUpLoad = true;
                    this.$emit('pullingUp');
                }
                this.scroll.on('pullingUp', () => {
                    this.isPullUpLoad = true;
                    this.$emit('pullingUp');
                });
            },
            // 如果isInitPullUp:true 展示上拉加载loading
            initPullUpLoad() {
                this.isPullUpLoad = true;
                this.isPullUpLoading = true;
                this.$emit('pullingUp');
            },
            // 上拉展示的状态
            initPullUpLoadEnd () {
                this.isPullUpLoading = false;
            },
            _reboundPullDown() {
                const {stopTime = 600} = this.pullDownRefresh;
                return new Promise((resolve) => {
                    setTimeout(() => {
                        this.isRebounding = true;
                        this.scroll.finishPullDown();
                        resolve();
                    }, stopTime);
                });
            },
            _afterPullDown() {
                setTimeout(() => {
                    this.pullDownStyle = `top:${this.pullDownInitTop}px`;
                    this.beforePullDown = true;
                    this.isRebounding = false;
                    this.refresh();
                }, this.scroll.options.bounceTime);
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this.forceUpdate(true);
                    if (this._isInitPullDown) {
                        this._isInitPullDown = false;
                    }
                    this.checkHeight();
                }, this.refreshDelay);
            }
        }
    };
</script>
<style lang="less" scoped>
.pulldown-wrapper{
    position: absolute;
    width: 100%;
    left: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    transition: all;
}
.pullup-wrapper{
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 16px 0;
}
</style>
