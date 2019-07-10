<template>
    <div :class="['hy-button', {'disabled': disabled}]" :style="buttonStyles" @click="handleClick">
        <span class="hy-text" :style="textStyles">
            <slot></slot>
        </span>
    </div>
</template>
<script>
export default {
    props: {
        styleSwitch: {
            type: Boolean,
            default: false // 是否使用样式传值
        },
        textColor: {
            type: String,
            default: '#ffffff' // 按钮文字颜色
        },
        buttonColor: {
            type: String,
            default: '#409EFF' // 按钮背景颜色
        },
        buttonSize: {
            type: Object,
            default(){
                return {width:'100%', height:'45px'};
            } // 按钮尺寸
        },
        buttonRadius: {
            type: String,
            default: '20px' // 按钮圆角大小
        },
        textSize: {
            type: String,
            default: '18px', // 按钮字体大小
        },
        disabled: {
            type: Boolean,
            default: false // 按钮禁用状态
        }
    },
    data () {
        return {
            textStyles: null,
            buttonStyles: null
        };
    },
    mounted () {
        if (this.styleSwitch) {
            this.setStyle();
        }
    },
    methods: {
        setStyle () {
            this.textStyles = {
                color: this.textColor,
                fontSize: this.textSize
            };
            this.buttonStyles = {
                background: this.buttonColor,
                width: this.buttonSize.width,
                height: this.buttonSize.height,
                'border-radius': this.buttonRadius
            };
        },
        handleClick (e) {
            if (!this.disabled) {
                this.$emit('hyClick', e);
            }
        }
    }
};
</script>
<style src="../../styles/button.css"></style>
