<template>
    <div class="demo-main">
        <div class="demo-button">
            <hy-button @hyClick="showConfirm">显示弹框{{msgPopFlag}}</hy-button>
        </div>
        <div class="demo-button">
            <hy-button @hyClick="confrimHandle">显示弹框</hy-button>
        </div>
        <hy-confirm v-model="msgPopFlag" title="请输入短信验证码" :close-on-confirm='false' @on-confirm='dynamicCodeFun()' :closeOnMasker="true">
            <h2>弹框内容</h2>
        </hy-confirm>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                msgPopFlag: false
            };
        },
        methods: {
            confrimHandle () {
                this.$hyapp.confirm.show({
                    type: 'hy-yuandan',
                    title: '温馨提示',
                    txtStyle: 'center',
                    closeFlag: true,
                    closeOnMasker: false,
                    txt:    `<div class="hy-title-box" slot="dialogImg">
                                <div class="hy-quan-box">¥19992</div>
                            </div>
                            <div class="dialogDesc">恭喜您，成功提额<span style="color: #ea4308">299</span>元</div>
                            <p style="font-size: 14px; margin-top: 5px">请前往首页下拉刷新额度</p>`,
                    sureTxt: '前往首页',
                    cancelTxt: '留在本页',
                    onConfirm () {
                        console.log(2323222);
                    }
                });
            },
            dynamicCodeFun () {
                console.log('确认');
            },
            showConfirm () {
                this.msgPopFlag = !this.msgPopFlag;
            }
        }
    };
</script>
