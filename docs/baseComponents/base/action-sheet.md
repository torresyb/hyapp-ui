# action-sheet

##### [demo原始链接](http://172.17.16.112:8888/examples/#/action-sheet) | [demo源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/blob/develop/examples/routers/actionSheet.vue) | [组件源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/tree/develop/src/packages/action-sheet)
---

## 安装
局部注册
```js{4}
import { ActionSheet } from 'hyapp-ui';

export default {
  components: {
    ActionSheet
  }
}
```

## 属性

| 属性 | 类型 | 默认值 | 说明 | 版本要求 |
| --- | --- | --- | --- | --- |
| value | `Boolean` | false | 是否显示，使用 `v-model` 绑定 | |
| showCancel | `Boolean` |  | 是否显示取消菜单 | |
| cancelText | `String` | 取消 | 取消菜单的显示文字 | |
| menus | `Object`<br><br>`Array` | {} | 菜单项列表，举例：<span style="color: #900">{menu1: '删除'}</span>，如果名字上带有`.noop`表明这是纯文本(HTML)展示，不会触发事件，用于展示描述或者提醒。<br><br>数组类型的菜单，可自定义键值 | |
| closeOnClickingMask | `Boolean` | true | 点击遮罩时是否关闭菜单 |  |
| closeOnClickingMenu | `Boolean` | true | 点击菜单时是否自动隐藏 |  |
| ~~theme~~ | `String` | ios |  | |

## 事件

| 名字 | 参数 | 说明 | 版本要求 |
| --- | --- | --- | --- |
| @on-after-show | -- | 显示动画结束时触发 | -- |
| @on-after-hide | -- | 隐藏动画结束时触发 | -- |
| @on-click-mask | -- | 点击遮罩时触发 | -- |
| @on-click-menu | (menuKey, menuItem) | 点击菜单时触发。`menuKey` 为点击menu的 `value`（menus为Array类型） 或者 `key` 值（menus为Object类型）；若`menuKey` 为  `cancel` ，表示点击的是取消按钮 | -- |
| @on-click-menu-{menuKey} | (menuKey) | 点击事件的快捷方式。举例：如果你点击第一个菜单, 那么你可以监听 `on-click-menu-{menuKey}` | -- |
| @on-click-menu-cancel | -- | 点击取消菜单时触发 | -- |

## 插槽

| 名字 | 说明 | 版本要求 |
| --- | --- | --- |
| hyapp-header | 头部位置 | `2.3.1` |
| hyapp-content | 主体内容 | -- |
| hyapp-action | 底部位置 | -- |

## 发布日志
* [V2.3.1](/baseComponents/base/_changelog.html#v2-3-1) 修复不支持 `hyapp-header` 插槽问题
