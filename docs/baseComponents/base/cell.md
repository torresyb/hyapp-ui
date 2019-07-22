# cell
##### [demo原始链接](http://172.17.16.112:8888/examples/#/cell) | [demo源码](http://gitlab.jr.2345.net/finance_h5/h5_hyapp-ui/blob/dev/examples/routers/cell.vue) | [组件源码](http://gitlab.jr.2345.net/finance_h5/h5_hyapp-ui/tree/dev/src/packages/cell)
---

## 安装
局部注册
```js{1,5}
import { HyCell } from 'hyapp-ui';

export default {
  components: {
    HyCell
  }
}
```

## 属性

| 属性 | 类型 | 默认值 | 说明 | 版本要求 |
| --- | --- | --- | --- | --- |
| isLink | `Boolean` | true | 是否展示箭头 | |
| align | `String` | right | 右侧元素文字对齐方式 | |

## 插槽

| 名字 | 说明 | 版本要求 |
| --- | --- | --- |
| cell-left | 左侧文案 | -- |
| cell-right | 右侧文案 | -- |
## 使用

### VUE
```vue
<!-- 引入组件 -->
<hy-cell :isLink="true">
  <div slot="cell-left">左侧文本</div>
  <div slot="cell-right">右侧文本</div>
</hy-cell>
```