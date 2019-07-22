# swiper
##### [demo原始链接](http://172.17.16.112:8888/examples/#/swiper) | [demo源码](http://gitlab.jr.2345.net/finance_h5/h5_hyapp-ui/blob/dev/examples/routers/swiper.vue) | [组件源码](http://gitlab.jr.2345.net/finance_h5/h5_hyapp-ui/tree/dev/src/packages/swiper)
---
> 最低兼容版本：**2.3.0**

## 安装
局部注册
```js{1,5}
import { Swiper } from 'hyapp-ui';

export default {
  components: {
    Swiper
  }
}
```

## 使用

### VUE
```vue
<!-- 引入组件 -->
<swiper :data="list" :distance="20" @swiperOnClickHandler="swiperOnClickHandler"></swiper>
```
### JS
```js
export default {
    data(){
        return {
            currentIndex:0,
            list: [{imageUrl:require('../assets/images/001.jpg')}, {imageUrl:require('../assets/images/002.jpg')}, {imageUrl:require('../assets/images/003.jpg')}],
        };
    },
    methods:{
        swiperOnClickHandler(item,i){
            console.log(item,i);
        },
        swiperOnChangeHandler(i){
            this.currentIndex = i;
        },
        tabOnClickHandler(i){
            this.$refs.swiper.tabOnClickHandler(true,i);
        }
    }
};
```

## 属性

| 属性 | 类型 | 默认值 | 说明 | 版本要求 |
| --- | --- | --- | --- | --- |
| data | Array | 空  | 数据 |      |
| autoplay | Boolean | true | 是否开启自动轮播 | 
| dots | Boolean | true | 是否展示指示点 | 
| autoplayInterval | Number |3000 | 轮播的时间(秒) | 
| distance | Number | 0 | 不是全屏模式下，需要传入margin或者padding 左或者右的间距 | 
| loop | Boolean |true | 是否循环轮播 | 

::: tip 数据格式
[{imageUrl:require('../assets/images/001.jpg')}, {imageUrl:require('../assets/images/002.jpg')}, {imageUrl:require('../assets/images/003.jpg')}]
:::

## 事件

| 名字 | 参数 | 说明 | 版本要求 |
| --- | --- | --- | --- |
| @swiperOnClickHandler | -- | 点击图片时触发。返回当前数据和索 |
| @swiperOnChangeHandler | -- | 点击tab时自动触发(返回当前的索引) |
| @tabOnClickHandler | -- | 点击tab时触发(返回当前的索引) | 


## 发布日志
* [V2.3.0](/baseComponents/base/_changelog.html#v2-3-0) 新增地址组件
