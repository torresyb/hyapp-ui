# confirm

##### [demo原始链接](http://172.17.16.112:8888/examples/#/confirm) | [demo源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/blob/develop/examples/routers/confirm.vue) | [组件源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/tree/develop/src/packages/confirm)
---

## 安装
局部注册
```js{1,5}
import { hyConfirm } from 'hyapp-ui';

export default {
  components: {
    hyConfirm
  }
}
```

## 属性

| 属性 | 类型 | 默认值 | 说明 | 版本要求 |
| --- | --- | --- | --- | --- |
| value | `Boolean` | false | 是否显示，使用 `v-model` 绑定 | |
| title | `String` |  | 弹窗标题 | |
| showMask | `Boolean` | true | 是否显示遮罩层 | |
| maskerOpacity | `Number`<br><br>`String` | 0.5 | 遮罩层透明度 | |
| txt | `String` |  | 弹窗内容。同slot，可以是html片段 | |
| cancelTxt | `String` |  | 取消按钮的显示文字。为空则不展示取消按钮 | |
| sureTxt | `String` |  | 确定按钮的显示文字。为空则不展示确定按钮 | |
| closeFlag | `Boolean` | false | 是否展示关闭按钮 |  |
| closeOnConfirm | `Boolean` | true | 点击确认按钮是否关闭弹框 |  |
| txtStyle | `String` | left | 弹窗内容文案居中方式 |  |
| type | `String` |  | 组件类名。可用于自定义样式等 | |
| closeOnMasker | `Boolean` | true | 点击空白区域是否关闭弹窗 |  |

## 事件

| 名字 | 参数 | 说明 | 版本要求 |
| --- | --- | --- | --- |
| @on-confirm | -- | 点击确定按钮时触发。 | -- |
| @on-cancel | -- | 点击取消按钮时触发。 | -- |
| @on-close | -- | 点击关闭按钮时触发。 | -- |

## 插槽

| 名字 | 说明 | 版本要求 |
| --- | --- | --- |
| 默认插槽 | 弹窗主体内容 | -- |

## 使用方法
### 方式一
---
VUE
```vue
<!-- 按钮控制组件展示 -->
<hy-button @hyClick="showConfrim">显示弹框</hy-button>
<!-- 弹窗组件 -->
<hy-confirm v-model="confirmPopFlag" title="温馨提示" sureTxt="确定" type="confirm" @on-confirm="confirmHandle">
  <div>这里是弹窗内容</div>
</hy-confirm>
```
JS
```js
export default {
  data(){
    return {
      confirmPopFlag: false
    }
  },
  methods: {
    showConfrim () {
      this.confirmPopFlag = true
    },
    confirmHandle () {
      console.log('你点击了确定按钮')
    }
  }
}
```
### 方式二
---
VUE
```vue
<!-- 按钮控制组件展示 -->
<hy-button @hyClick="showConfrim">显示弹框</hy-button>
```
JS
```js
export default {
  methods: {
    showConfrim () {
      let cfg = { // 弹窗配置
        type: 'confirm',
        title: '温馨提示',
        txt: '<div>这里是弹窗内容</div>',
        sureTxt: '确定',
        onConfirm () {
          console.log('你点击了确定按钮')
        }
      }
      this.$hyapp.confirm.show(cfg)
    }
  }
}
```