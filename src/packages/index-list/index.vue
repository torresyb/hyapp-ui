<template>
    <hyapp-scroll @scroll="scroll"
         :listen-scroll="listenScroll"
         :probe-type="probeType"
         :data="data"
         class="listview"
         ref="listview">
        <!--列表-->
        <slot></slot>
        <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove"
             @touchend.stop>
            <ul>
                <li v-for="(item, index) in shortcutList" :data-index="index" class="item"
                    :class="{'current':currentIndex===index}">{{item}}
                </li>
            </ul>
        </div>
        <div class="list-fixed" ref="fixed" v-show="fixedTitle">
            <div class="fixed-title">{{fixedTitle}} </div>
        </div>
    </hyapp-scroll>
</template>

<script type="text/ecmascript-6">
    import HyappScroll from 'hyapp-ui/src/packages/scroll'
    import {getData} from 'hyapp-ui/src/utils/dom'

    const TITLE_HEIGHT = 30
    const ANCHOR_HEIGHT = 18

    export default {
        props: {
            data: {
                type: Array,
                default: []
            },
            probeType: {
                type: Number,
                default: 3
            },
            listenScroll: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                scrollY: -1,
                currentIndex: 0
            }
        },
        computed: {
            shortcutList() {
                return this.data.map((group) => {
                    return group.title.substr(0, 1)
                })
            },
            fixedTitle() {
                if (this.scrollY > 0) {
                    return ''
                }
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
            }
        },
        components: {
            HyappScroll
        },
        watch: {
            data() {
                this.$nextTick(() => {
                    this._calculateHeight()
                })
            },
            scrollY(newY) {
                const listHeight = this.listHeight
                // 当滚动到顶部，newY>0
                if (newY > 0) {
                    this.currentIndex = 0
                    return
                }
                // 在中间部分滚动
                for (let i = 0; i < listHeight.length - 1; i++) {
                    let height1 = listHeight[i]
                    let height2 = listHeight[i + 1]
                    if (-newY >= height1 && -newY < height2) {
                        this.currentIndex = i
                        return
                    }
                }
                // 当滚动到底部，且-newY大于最后一个元素的上限
                this.currentIndex = listHeight.length - 2
            }
        },
        created() {
            this.touch = {}
            this.listHeight = []
        },
        methods: {
            onShortcutTouchStart(e) {
                let anchorIndex = getData(e.target, 'index')
                let firstTouch = e.touches[0]
                this.touch.y1 = firstTouch.pageY
                this.touch.anchorIndex = anchorIndex
                this._scrollTo(anchorIndex)
            },
            onShortcutTouchMove(e) {
                let firstTouch = e.touches[0]
                this.touch.y2 = firstTouch.pageY
                let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
                let anchorIndex = parseInt(this.touch.anchorIndex) + delta

                this._scrollTo(anchorIndex)
            },
            refresh() {
                this.$refs.listview.refresh()
            },
            scroll(pos) {
                this.scrollY = pos.y
            },
            _calculateHeight() {
                this.listHeight = []
                const list = this.$parent.$refs.listGroup
                let height = 0
                this.listHeight.push(height)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    height += item.clientHeight
                    this.listHeight.push(height)
                }
            },
            _scrollTo(index) {
                if (!index && index !== 0) {
                    return
                }
                if (index < 0) {
                    index = 0
                } else if (index > this.listHeight.length - 2) {
                    index = this.listHeight.length - 2
                }
                this.$refs.listview.scrollToElement(this.$parent.$refs.listGroup[index], 0)
                this.scrollY = this.$refs.listview.scroll.y
            }
        }
    }

</script>
<style lang="less" scoped>
.listview{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .list-shortcut{
        position: absolute;
        z-index: 30;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        padding: 20px 0;
        border-radius: 10px;
        text-align: center;
        .item{
            font-size: 12px;
            padding: 3px;
            color: #C7C7C7;
            &.current{
                color: #000;
            }
        }
    }
    .list-fixed{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;
        .fixed-title{
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            color: #fff;
            background-color: #333333;
        }
    }
}
</style>
