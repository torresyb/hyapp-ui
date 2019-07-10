# popup

##### [demo原始链接](http://172.17.16.112:8888/examples/#/popup) | [demo源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/blob/develop/examples/routers/popup.vue) | [组件源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/tree/develop/src/packages/popup)
---

## 安装
局部注册
```js{4}
import { HyPopup } from 'hyapp-ui';

export default {
  components: {
    HyPopup
  }
}
```

## 属性

| 属性 | 类型 | 默认值 | 说明 | 版本要求 |
| --- | --- | --- | --- | --- |
| value | `Boolean` | false | 是否显示，使用 `v-model` 绑定 | |
| width | `String` | auto | 宽度。当position为 **left** 或者 **right** 时有效 | |
| height | `String` | auto | 高度。当position为 **空**、 **top** 或者 **bottom** 时有效 | |
| maxHeight | `String` | 100% | 最大高度 | |
| showMask | `Boolean` | true | 是否显示遮罩层 | |
| closeOnMasker | `Boolean` | true | 点击空白区域是否关闭弹窗 | |
| maskerOpacity | `Number`<br><br>`String` | .5 | 遮罩层透明度 | |
| isTransparent | `Boolean` |  | 内容背景是否透明 | |
| position | `String` | bottom | 弹窗位置 | |
| popupStyle | `Object` |  | 弹窗样式 | |
| ~~hideOnBlur~~ | `Boolean` | true |  |  |
::: warning ⚠️
hideOnBlur属性，组件定义但未使用到
:::

## 插槽

| 名字 | 说明 | 版本要求 |
| --- | --- | --- |
| 默认插槽 | 弹窗主体内容，可以是html片段 | -- |
