# textarea
##### [demo原始链接](http://172.17.16.112:8888/examples/#/textarea) | [demo源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/blob/develop/examples/routers/textarea.vue) | [组件源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/tree/develop/src/packages/textarea)
---
> 最低兼容版本：**2.3.8**
## 安装
局部注册
```js{1,5}
import { HyTextarea } from 'hyapp-ui';

export default {
  components: {
import { HyTextarea } from 'hyapp-ui';
    HyTextarea
  }
}
```

## 使用

### VUE
```vue
<!-- 调用组件 -->
<hy-textarea v-model="textareaValue" :textareaId="'A'"></hy-textarea>
```
### JS
```js
export default {
    data () {
        return {
            textareaValue: '',
        };
    },
};
```

## 属性

| 属性 | 类型 | 默认值 | 说明 | 版本要求 |
| --- | --- | --- | --- | --- |
| textareaValue | String | 空 | 数据 |
| textareaId | String | 必传(字符随意) | id |


## 事件
| 名字 | 参数 | 说明 | 版本要求 |
| --- | --- | --- | --- |
| @focus | -- | 获得焦点触发 |
| @blur | -- | 离开焦点 |
| @change | -- | 值改变时出发 | 

## 发布日志
* [V2.3.8](/baseComponents/base/_changelog.html#v2-3-8) 新增组件
