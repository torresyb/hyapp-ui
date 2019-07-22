# pull-down

##### [demo原始链接](http://172.17.16.112:8888/examples/#/pullDown) | [demo源码](http://gitlab.jr.2345.net/finance_h5/h5_hyapp-ui/blob/dev/examples/routers/pullDown.vue) | [组件源码](http://gitlab.jr.2345.net/finance_h5/h5_hyapp-ui/tree/dev/src/packages/pull-down)
---
> 最低兼容版本：**2.3.0**

## 安装
局部注册
```js{1,5}
import { PullDown } from 'hyapp-ui';

export default {
  components: {
    PullDown
  }
}
```

## 使用

### VUE
```vue
<!-- 引入组件 -->
    <div class="scroll">
        <nav class="title">下拉刷新</nav>
        <div class="scroll-box">
            <pull-down class="contain"
                ref="scroll"
                :data="items"
                :scrollbar="scrollbarObj"
                :pullDownRefresh="pullDownRefreshObj"
                :pullUpLoad="pullUpLoadObj"
                :isInitPullDown = "isInitPullDown"
                :isInitPullUp = 'isInitPullUp'
                :listenScroll = "true"
                :isDropDownDistance="true"
                :startY="parseInt(startY)"
                @pullingDown="onPullingDown"
                @pullingUp="onPullingUp"
            @setDropDownDistance="setDropDownDistance"
            >
                <div slot="pulldown-custom-made"></div>
                <ul>
                    <li v-for="item in items" @click="clickItem(item)">{{item}}</li>
                </ul>
            </pull-down>
        </div>
    </div>
```
### JS
```js
    export default {
        data () {
            return {
                scrollbar: true,
                scrollbarFade: true,
                pullDownRefresh: true, // 是否开启下拉刷新
                pullDownRefreshThreshold: 90,
                pullDownRefreshStop: 40,
                pullUpLoad: true, // 是否开启上拉加载
                pullUpLoadThreshold: 0,
                pullUpLoadMoreTxt: '下拉加载更多',
                pullUpLoadNoMoreTxt: '加载完毕',
                isInitPullDown: true, // 是否初始化执行下拉刷新
                isInitPullUp: false, // 是否初始化执行上拉加载
                startY: 0,
                scrollToX: 0,
                scrollToY: -200,
                scrollToTime: 700,
                items: [],
                itemIndex: 0,
                count:0
            };
        },
        computed: {
            // scrollbar样式
            scrollbarObj: function () {
                return this.scrollbar ? {fade: this.scrollbarFade} : false;
            },
            // 下拉刷新配置
            pullDownRefreshObj: function () {
                return this.pullDownRefresh ? {
                    threshold: parseInt(this.pullDownRefreshThreshold),
                    stop: parseInt(this.pullDownRefreshStop)
                } : false;
            },
            // 上拉加载配置
            pullUpLoadObj: function () {
                return this.pullUpLoad ? {
                    threshold: parseInt(this.pullUpLoadThreshold),
                    txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
                } : false;
            }
        },
        watch: {
            scrollbarObj: {
                handler() {
                    this.rebuildScroll();
                },
                deep: true
            },
            pullDownRefreshObj: {
                handler() {
                    this.rebuildScroll();
                },
                deep: true
            },
            pullUpLoadObj: {
                handler() {
                    this.rebuildScroll();
                },
                deep: true
            },
            startY() {
                this.rebuildScroll();
            }
        },
        methods: {
            setDropDownDistance(distance){
                console.log(distance);
            },
            // 模拟数据请求
            getData () {
                return new Promise(resolve => {
                    setTimeout(() => {
                        const arr = [];
                        for (let i = 0; i < 2; i++) {
                            arr.push(this.count++);
                        }
                        resolve(arr);
                    }, 1000);
                });
            },
            // 点击单个item
            clickItem(e, item) {
                console.log(e);
                this.$emit('click', item);
            },
            // scrollTo() {
            //     this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
            // },
            // 下拉刷新
            onPullingDown() {
                // 模拟更新数据
                console.log('pulldown');
                this.count = 0;
                this.getData().then(res => {
                    this.items = res;
                    this.$refs.scroll.initPullDownEnd();
                });
            },
            // 上拉加载
            onPullingUp() {
                console.log('pullup');
                // 更新数据
                this.getData().then(res => {
                    if(this.count<5){
                        this.items = this.items.concat(res);
                    }else{
                        // 如果没有新数据
                        this.$refs.scroll.forceUpdate();
                    }
                });
            },
            // 重置滚动
            rebuildScroll() {
                console.log('2323');
                Vue.nextTick(() => {
                    this.$refs.scroll.destroy();
                    this.$refs.scroll.initScroll();
                });
            }
        }
    };
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |版本要求 |
| --- | --- | --- |--- |--- |
| pullDownRefresh | Boolean | false | 是否开启下拉刷新 |
| pullUpLoad | Boolean | false | 是否开启上拉加载 | 
| pullDownRefreshThreshold | Number | 空 | 下拉触发距离(推荐50) | 
| pullDownRefreshStop | Number | 空 | 上拉触发距离(推荐40) |
| pullUpLoadMoreTxt | String | 空 | 下拉文言 |
| pullUpLoadNoMoreTxt | String | 空 | 加载完毕文言 |
| isInitPullDown | Boolean | false | 是否初始化执行下拉刷新 |
| isInitPullUp | Boolean | false | 是否初始化执行上拉加载 |


## 事件

| 名字 | 参数 | 说明 |版本要求 |
| --- | --- | --- |--- |  
| @onPullingDown | -- | 下拉刷新 | 
| @onPullingUp | -- | 上拉加载 | 
