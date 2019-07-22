# date-picker
##### [demo原始链接](http://172.17.16.112:8888/examples/#/date-picker) | [demo源码](http://gitlab.jr.2345.net/finance_h5/h5_hyapp-ui/blob/dev/examples/routers/date-picker.vue) | [组件源码](http://gitlab.jr.2345.net/finance_h5/h5_hyapp-ui/tree/dev/src/packages/date-picker)
---
> 最低兼容版本：**2.3.0**
## 安装
局部注册
```js{1,5}
import { DatePicker } from 'hyapp-ui';

export default {
  components: {
    DatePicker
  }
}
```

## 使用

### VUE
```vue
<!-- 调用组件 -->
<button @click="onPickerHandler">picker</button>
<!-- 引入组件 -->
<date-picker v-model="picker" :isPickershow="isPickershow" @onPickerHandler="isPickershow=!isPickershow" />
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
| isPickershow | Boolean | false | 是否展示日期组件 |
| title | String | 空 | 标题 | |
| value | Array | [] | 默认值，使用 **v-model** 绑定。格式[{label:'1960年',value:1960}]|
| startYears | Number | 1960 | 开始年份 |
| endYears | Number | 2200 | 结束年份 |
| list | Array | [] | 数据格式[{label:'1960年',value:1960}]不用传预留字段 |
| type | Number | 1 | 默认为日期类型(不用传预留字段) |


## 事件

| 名字 | 参数 | 说明 | 版本要求 |
| --- | --- | --- | --- | 
| @onPickerHandler | -- | 点击确定按钮时触发。返回选择的地址，格式[{label:'1960年',value:1960}] | 

## 发布日志
* [V2.3.0](/baseComponents/base/_changelog.html#v2-3-0) 新增地址组件
