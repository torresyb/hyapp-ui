# button
##### [demo原始链接](http://172.17.16.112:8888/examples/#/button) | [demo源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/blob/develop/examples/routers/button.vue) | [组件源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/tree/develop/src/packages/button)
---

## 安装
局部注册
```js{1,5}
import { HyButton } from 'hyapp-ui';

export default {
  components: {
    HyButton
  }
}
```

## 属性

| 属性 | 类型 | 默认值 | 说明 | 版本要求 |
| --- | --- | --- | --- | --- |
| styleSwitch | `Boolean` | false | 是否使用样式传值，默认不传，传true则需要传样式 | |
| textColor | `String` | #ffffff | 按钮文字颜色 | |
| textSize | `String` | 18px | 按钮文字大小 | |
| buttonColor | `String` | #409EFF | 按钮背景颜色</span> | |
| buttonSize | `Object` | {width:'100%', height:'45px'} | 按钮尺寸 | |
| buttonRadius | `String` | 20px | 按钮圆角大小 | |
| disabled | `Boolean` | false | 按钮是否禁用，为true是会有类名disabled | |
## 使用

### VUE
```vue
<!-- 引入组件 -->
<hy-button></hy-button>
```