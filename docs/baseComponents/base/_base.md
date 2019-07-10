# 组件文档md配置参考

##### [demo原始链接](http://172.17.16.112:8888/examples/#/confirm) | [demo源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/blob/develop/examples/routers/confirm.vue) | [组件源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/tree/develop/src/packages/confirm)
---

> 最低兼容版本（若无则移除此tip）：**1.0.0**

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
| show | `Boolean` | false | 是否显示，使用 `v-model` 绑定 | **1.0.0** |

## 事件

| 名字 | 参数 | 说明 | 版本要求 |
| --- | --- | --- | --- |
| @on-confirm | -- | 点击确定按钮时触发。 | -- |

## 插槽

| 名字 | 说明 | 版本要求 |
| --- | --- | --- |
| content | 内容插槽。组件主体内容 | -- |

## 使用

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

## 发布日志
* [V2.3.1](/baseComponents/base/_changelog.html#v2-3-1) 修复不支持 `hyapp-header` 插槽问题

## 其他
::: tip 提示
This is a tip
:::

::: warning 警告
This is a warning
:::

::: danger 风险
Danger zone, do not proceed
:::
