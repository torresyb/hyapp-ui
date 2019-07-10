<template>
    <div style="background-color:#ffffff">
        <hy-cell :isLink="true" @click.native="tapClick">
            <div slot="cell-left">左侧文本</div>
            <div slot="cell-right">右侧文本</div>
        </hy-cell>
        <hy-cell :isLink="false" align="left">
            <div slot="cell-left">左侧文本</div>
            <div slot="cell-right"><input type="text"></div>
        </hy-cell>
    </div>
</template>
<script>
export default {
    data () {
        return {}
    },
    methods: {
        tapClick () {
            console.log('click')
            this.$hyapp.confirm.show({
                type: 'hy-yuandan',
                title: '温馨提示',
                txtStyle: 'center',
                closeFlag: true,
                txt: `<div class="hy-title-box" slot="dialogImg">
        <div class="hy-quan-box">¥19999</div>
      </div>
      <div class="dialogDesc">恭喜您，成功提额<span style="color: #ea4308">299</span>元</div>
        <p style="font-size: 14px; margin-top: 5px">请前往首页下拉刷新额度</p>`,
                sureTxt: '立即借款',
                onConfirm () {
                    console.log(2323)
                }
            })
        }
    }
}
</script>
