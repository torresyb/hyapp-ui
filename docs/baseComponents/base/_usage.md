# 安装使用

## 安装
使用 `npm` 直接安装或者更新
```
npm install hyapp-ui --save
```

## 代码示例
### 方式一：.vue文件中调用组件
---
```vue
<template>
  <div>
    <hy-cell>
      <template slot="cell-left">去好评</template>
    </hy-cell>
    <hy-button>立即借钱</hy-button>
  </div>
</template>

<script>
import {HyButton, HyCell} from 'hyapp-ui'

export default {
  components: {
    HyButton,
    HyCell
  }
}
</script>
```
### 方式二：main.js中调用plugin
---
```js
import {HyButton, HyCell} from 'hyapp-ui'

Vue.component('HyButton', HyButton)
Vue.component('HyCell', HyCell)
// 或者
Vue.use(HyButton)
Vue.use(HyCell)

// 详细使用请参考对应组件文档
```