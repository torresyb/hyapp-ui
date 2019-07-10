# address

##### [demo原始链接](http://172.17.16.112:8888/examples/#/address) | [demo源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/blob/develop/examples/routers/address.vue) | [组件源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/tree/develop/src/packages/address)
---

> 最低兼容版本：**2.3.0**

## 安装
局部注册
```js{1,5}
import { HyAddress } from 'hyapp-ui';

export default {
  components: {
    HyAddress
  }
}
```

## 属性

| 属性 | 类型 | 默认值 | 说明 | 版本要求 |
| --- | --- | --- | --- | --- |
| show | `Boolean` | false | 是否展示地址选择组件（使用 <span style="color: #900">**.sync**</span> 修饰，地址组件隐藏时会更新其值） | |
| title | `String` |  | 地址选择组件标题 | |
| list | `Array` | [] | 地址列表。取接口返回值，或使用默认地址[ChinaAddressData](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/blob/develop/src/packages/address/city.json)（默认值需手动引入） | |
| value | `Array` | [] | 默认值，使用 `v-model` 绑定。格式[1, 2, 3] | |

::: tip 
show属性需使用.sync修饰。vue中使用 <span style="color: #900">**:show.sync**</span>

如果你需要单独引入地址数据，可以在源码[/src/packages/address/city.json](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/blob/develop/src/packages/address/city.json)找到
:::

## 事件

| 名字 | 参数 | 说明 | 版本要求 |
| --- | --- | --- | --- |
| @on-confirm | (value) | 点击确定按钮时触发。返回选择的地址，格式{name: '北京 北京 东城区', value: [1, 2, 3]} | -- |
| @on-cancel | -- | 点击取消按钮时触发 | -- |

::: tip @on-confirm返回地址格式如下
<br>

```json
{
  name: '北京 北京 东城区',
  value: [1, 2, 3]
}
```
<br>
:::

## 使用

VUE
```vue
<!-- 调用地址组件 -->
<input @click="chooseHomeAddr" v-model="address.name" type="text" placeholder="请选择地址" readonly>
<!-- 引入地址组件 -->
<hy-address v-model="address.value" :show.sync="isPickershow" title="请选择地址" @on-confirm="onAddressConfirmHandler" :list="list"></hy-address>
```
JS
```js
import ChinaAddressData from '../assets/json/city.json';
export default {
  data(){
    return {
      address: {
        name: '',
        value: []
      },
      isPickershow: false,
      list: ChinaAddressData
    }
  },
  methods: {
    chooseHomeAddr () {
      this.isPickershow = true
    },
    onAddressConfirmHandler (address) {
      this.address = address
    }
  }
}
```

## 发布日志
* [V2.3.4](/baseComponents/base/_changelog.html#v2-3-4) 移除默认地址，如需使用，手动引入 `city.json` 
* [V2.3.0](/baseComponents/base/_changelog.html#v2-3-0) 新增地址组件
