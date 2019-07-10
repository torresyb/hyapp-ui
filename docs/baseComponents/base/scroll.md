# scroll
##### [demo原始链接](http://172.17.16.112:8888/examples/#/scroll) | [demo源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/blob/develop/examples/routers/scroll.vue) | [组件源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/tree/develop/src/packages/scroll)
---

## 安装
局部注册
```js{1,5}
import { HyScroll } from 'hyapp-ui';

export default {
  components: {
    HyScroll
  }
}
```

## 属性

| 属性 | 类型 | 默认值 | 说明 | 版本要求 |
| --- | --- | --- | --- | --- |
| probeType | `Number` | 1 | 是否派发scroll事件https://www.cnblogs.com/yi0921/p/7206549.html | |
| click | `Boolean` | false | 是否禁用点击事件 | |
| listenScroll | `Boolean` | false | 是否监听滚动事件 | |
| data | `Array` | null | 列表数据 | |
| pullup | `Boolean` | false | 是否支持上拉加载 | |
| beforeScroll | `Boolean` | false | 是否监听滚动事件之前 | |
| refreshDelay | `Number` | 20 | 是否刷新延迟 | |
| direction | `String` | vertical | 滚动方向 | |
## 插槽

| 名字 | 说明 | 版本要求 |
| --- | --- | --- |
| 默认插槽 | 列表内容 | -- |
## 使用

### VUE
```vue
<!-- 引入组件 -->
<hy-scroll class="contain" :data="items">
  <ul>
    <li v-for="item in items">{{item}}</li>
  </ul>
</hy-scroll>
```
JS
```js
export default {
  data(){
    return {
      items: []
    }
  },
  created () {
      this.getListHandle()
  },
  methods: {
    getListHandle () {
        for(let i = 0 ; i<20; i++) {
            this.items.push(i)
        }
    }
  }
}
```
