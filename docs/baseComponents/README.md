# App 开发部组件实例如下：

## 路由配置

- .vuepress/config.js 文件 sidebar对象下配置
- 组件创建规则如下
  - baseComponents/base/basic-config.md，
  - base/basic-config.md对应=>.vuepress/config.js children路由地址
  
```
sidebar: {
    '/baseComponents/': [
        {
            title: '配置参考',
            collapsable: true,
            children: ['base/basic-config']
        }
}
```

### 代码演示

```

# basic-config 配置参考 // 导航路由

<Common-Democode title="基本用法" description="配置参考">
 /*
  * 创建组件 .vuepress/components/BasicConfig/index.vue
  * 引入规则目录名+文件名BasicConfig-index
 */
  <BasicConfig-index></BasicConfig-index> 
  <highlight-code slot="codeText" lang="vue">
    <template>
      // 源码展示的源代码 复制BasicConfig/index.vue 即可
      <div>
         basic-config 配置参考 
      </div>
    </template>
  </highlight-code>
</Common-Democode>

```
## 启动
- 端口 19000
```
npm run docs:dev 
```
## 打包

```
npm run docs:build
```

## 组件

```
textarea
action-sheet
address
button
cell
confirm
date-picker
picker
index-list
mask
popup
pull-down
scroll
swiper
scratch-card
```
