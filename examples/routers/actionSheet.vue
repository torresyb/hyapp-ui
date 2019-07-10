<template>
    <div class="demo-main">
        <div class="demo-button">
            <hy-button @click.native="actionShowHandle(objData)">Object Data</hy-button>
        </div>
        <div class="demo-button">
            <hy-button @click.native="actionShowHandle(arrData)">Array Data</hy-button>
        </div>
        <div class="demo-button">
            <hy-button @click.native="slotActionShow=true">Slot方式</hy-button>
        </div>
        <action-sheet v-model="actionShow" :menus="actionsData" :close-on-clicking-mask="true" show-cancel cancel-text="关闭" @on-click-menu="actionClickHandle" @on-click-menu-man="actionClickHandle1"></action-sheet>
        <action-sheet v-model="slotActionShow" show-cancel>
            <div slot="hyapp-header">
                <div>This is Header</div>
            </div>
            <div slot="hyapp-content">
                <div>This is Content</div>
                <div>This is Content</div>
                <div>This is Content</div>
                <div>This is Content</div>
            </div>
            <div slot="hyapp-action">
                <div>This is Action</div>
            </div>
        </action-sheet>
        <!--确定解绑银行卡-->
        <!--<action-sheet v-model="actionConfirmShow" :close-on-clicking-mask="false" show-cancel>-->
            <!--<div slot="hyapp-content" class="hyapp-action-content">-->
                <!--<img class="img-warn" src="../../assets/images/bankcard_ic_warn@3x.png" alt="">-->
                <!--<h2>确认解绑银行卡吗</h2>-->
                <!--<p>解除绑定后，该银行卡将不再作为收还款账户，每天仅有1次解绑机会，请谨慎操作</p>-->
                <!--<i class="hyapp-action-close" @click="actionConfirmShow=false"><img src="../../assets/images/global_pop_ic_close@3x.png" alt=""></i>-->
            <!--</div>-->
            <!--<div slot="hyapp-action" class="hyapp-sheet-action">-->
                <!--<span class="hy-1px-r" @click.stop="getTelHandle">确认解绑</span>-->
                <!--<span @click="cancelBankHandle" class="color-red-light">暂不解绑</span>-->
            <!--</div>-->
        <!--</action-sheet>-->
    </div>
</template>
<script>
export default {
    data () {
        return {
            actionShow: false,
            slotActionShow: false,
            objData: {
                '0.noop': '性别修改.noop',
                '1': '保密',
                '2': '男',
                '3': '女'
            },
            arrData: [{
                label: '男',
                value: 'man'
            }, {
                label: '女',
                value: 'woman'
            }, {
                label: '未知',
                value: 'default'
            }],
            actionsData: {}
        };
    },
    methods: {
        actionClickHandle (index, item) {
            console.log(index + ':' + JSON.stringify(item));
            console.log('click');
        },
        actionClickHandle1 () {
            console.log('man');
        },
        actionShowHandle (data) {
            this.actionsData = data;
            this.actionShow = !this.actionShow;
        }
    }
};
</script>
