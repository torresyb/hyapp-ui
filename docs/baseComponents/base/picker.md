# picker
##### [demo原始链接](http://172.17.16.112:8888/examples/#/picker) | [demo源码](http://gitlab.jr.2345.net/finance_h5/h5_hyapp-ui/blob/dev/examples/routers/picker.vue) | [组件源码](http://gitlab.jr.2345.net/finance_h5/h5_hyapp-ui/tree/dev/src/packages/picker)
---
> 最低兼容版本：**2.3.5**
## 安装
局部注册
```js{1,5}
import { HyPicker } from 'hyapp-ui';

export default {
  components: {
    HyPicker
  }
}
```

## 使用

### VUE
```vue
<!-- 调用组件 -->
<button @click="onPickerHandler">picker</button>
<!-- 引入组件 -->
<hy-picker v-model="picker" :isPickershow="isPickershow" @onPickerHandler="isPickershow=!isPickershow" />
```
### JS
```js
export default {
    data () {
        return {
            isPickershow: false,
            picker: []
        };
    },
    methods: {
        onPickerHandler () {
            this.isPickershow = !this.isPickershow;
        }
    },
};
```

## 属性

| 属性 | 类型 | 默认值 | 说明 | 版本要求 |
| --- | --- | --- | --- | --- |
| currentIndex | Number | 0 | 当前选中 |
| isPickershow | Boolean | false | 是否展示组件 |
| title | String | 空 | 标题 | |
| picker | Array | [] | 默认值，使用 **v-model** 绑定。|
| list | Array | 必传 | 数据格式[{label:'1960年',value:1960}] |


## 发布日志
* [V2.3.5](/baseComponents/base/_changelog.html#v2-3-5) 新增组件
