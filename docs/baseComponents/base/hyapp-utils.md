# hyapp-utils

## 安装

使用 `npm` 直接安装或者更新

```
npm install hyapp-utils --save
```

## 代码示例

### main.js 中调用

---

```js
import hyapp from 'hyapp-utils'

Vue.use(hyapp.Tools)
```

## 暴露方法及使用

### 提供方法

---

```js
Vue.prototype.$appInvoked = appInvoked // 调用jsbridge方法
Vue.prototype.$appGetInvoked = appGetInvoked // 注册jsbrige方法
Vue.prototype.$needRefreshData = needRefreshData // 刷新机制
Vue.prototype.$lodash = lodash // 暴露lodash
```

### 项目中使用

---

```js
this.$appInvoked(funcName, jsonParams, () => {})
this.$appGetInvoked(funcName, rst => {})
this.$needRefreshData(lasttime)
this.$lodash.Function()
```

::: tip lodash 使用说明
lodash 使用参照[lodash 使用说明](https://www.lodashjs.com/docs/latest)
:::
