<template>
    <div class="hy-scratch-card">
        <canvas class="cxt" :height="height" :style="{'width':width,'height':height}" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></canvas>
    </div>
</template>

<script>

export default {
    props:{
        width:{
            type:String,
            default:'300px'
        },
        height:{
            type:String,
            default:'200px'
        },
        prize:{
            required: true
        },
        prizebg:{
            type:String,
        },
        font:{
            type:String,
            default:'bold 25px 黑体'
        },
        fontColor:{
            type:String,
            default:'red'
        }
    },
    data() {
        return {
            cxt:null,
            flag:false
        };
    },
    mounted(){
        const context  = document.querySelector('.cxt');
        const contextWidth = context.width;
        const contextHeight = context.height;

        this.cxt = context.getContext('2d');
        if(this.prizebg){
            let pic=new Image();
            pic.src=this.prizebg;
            pic.onload = function(){
                this.cxt.drawImage(pic,0,0,contextWidth,contextHeight);
            }.bind(this);
        }

        this.cxt.font = this.font;
        this.cxt.textAlign = 'center';
        this.cxt.textBaseline = 'middle';
        this.cxt.fillStyle = this.fontColor;
        this.cxt.fillText(this.prize, contextWidth/2, contextHeight/2);
        var imgUrl = context.toDataURL('image/png',1);
        context.style.background = `url(${imgUrl})`;
        this.cxt.clearRect(0,0,contextWidth,contextHeight);
        this.cxt.fillStyle = '#ddd';
        this.cxt.fillRect(0,0,contextWidth,contextHeight);
    },
    methods: {
        touchstart(){
            this.flag = true;
            this.cxt.globalCompositeOperation='destination-out';
        },
        touchmove(e){
            if(this.flag){
                var x=e.targetTouches[0].pageX-45;
                var y=e.targetTouches[0].pageY-45;
                this.cxt.fillStyle='red';
                this.cxt.fillRect(x,y,30,30);
            }
        },
        touchend(){
            this.flag = false;
        },
    },
};
</script>

<style lang="less" scoped>
.hy-scratch-card{
    .cxt{
        border: 1px solid #000;
        display: block;
        margin: 20px auto;
    }
}

</style>
