<template>
  <div class="demo-main demo-address">
    <hy-cell :isLink="true" align="left">
        <div slot="cell-left">请选择地址：</div>
        <div slot="cell-right">
            <input @click="chooseHomeAddr" v-model="address.name" type="text" placeholder="请选择地址" readonly>
        </div>
    </hy-cell>
    <hy-cell :isLink="false" align="left">
        <div slot="cell-left">选择地址为：</div>
        <div slot="cell-right">
            {{address}}
        </div>
    </hy-cell>
    <hy-button @click.native="setAddr">设置默认地址：上海 上海 浦东新区</hy-button>
    <!-- 引入地址组件 -->
    <hy-address v-model="address.value" :show.sync="isPickershow" title="请选择地址" @on-confirm="onAddressConfirmHandler" :list="list"></hy-address>
  </div>
</template>
<script>
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
        };
    },
    methods: {
        chooseHomeAddr(){
            this.isPickershow = true;
        },
        onAddressConfirmHandler (address) {
            this.address = address;
        },
        setAddr () {
            this.address = {
                name: '上海 上海 浦东新区',
                value: [25, 321, 2707]
            };
        }
    }
};
</script>
<style>
.demo-address {
    background-color: #fff;
}
</style>


