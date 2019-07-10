<template>
    <div class="hy-date-picker-mask" v-if="isPickershow">
        <div class="hy-date-picker-popup" :class="[show?'picker-animate-in':'picker-animate-out']">
            <div class="hy-picker-popup-header">
                <div class="hy-picker-popup-header-left" @click="onPickerHandler({switch:false})">取消</div>
                <div class="hy-picker-popup-header-title">{{title}}</div>
                <div class="hy-picker-popup-header-right" @click="onPickerHandler({switch:true})">确定</div>
            </div>
            <div class="hy-picker">
                <div class="hy-picker-col" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend" v-for="(arr,index) in data" :key="index">
                    <div class="hy-picker-col-mask" style="width: 100%">{{index}}</div>
                    <div class="hy-picker-col-indicator" style="width: 100%">{{index}}</div>
                    <div class="hy-picker-col-content" :style="{width:'100%',transition:'all .3s linear',transform: 'translateY(' + y[index] + 'px)'}">
                        <div class="hy-picker-col-content-item" v-for="(item,index) in arr" :key="index">{{item.label}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const SPACE = 34;
export default {
    props: {
        value: {
            type: Array
        },
        isPickershow: {
            type: Boolean
        },
        title: {
            type: String
        },
        list: {
            type: Array,
            required:true
        },
        currentIndex:{
            type: Number,
            default:0
        }
    },
    data () {
        return {
            show: true,
            data: this.list,
            index: 0,
            startY: [],
            y: [],
            values: this.value,
        };
    },
    watch:{
        list:{
            handler:function(newValue){
                this.data = newValue;
                this.y =[-(Math.ceil(this.currentIndex-1 / SPACE) * SPACE)];
                this.startY =[0];
                this.values.splice(0,  this.values.length);
                this.init();
            },
            deep:true,
            immediate:true
        }
    },
    methods: {
        init () {
            this.data.forEach(item => {
                this.values.push(item[this.currentIndex]);
                this.y.push(0);
                this.startY.push(0);
            });
        },
        touchstart (e) {
            this.index = +e.target.innerHTML;
            this.startY[this.index] = e.targetTouches[0].pageY - (this.y[this.index] || 0);
        },
        touchmove (e) {
            this.onArrChangeHandler(this.y, e.targetTouches[0].pageY - this.startY[this.index]);
        },
        touchend () {
            let y = this.y[this.index];
            let dataItemArr = this.data[this.index];
            let max = (dataItemArr.length - 1) * SPACE;
            if (y > 0) {
                this.onArrChangeHandler(this.y, 0);
                this.onArrChangeHandler(this.values, dataItemArr[0]);
            } else if (Math.abs(y) > max) {
                this.onArrChangeHandler(this.y, -max);
                this.onArrChangeHandler(this.values, dataItemArr[dataItemArr.length - 1]);
            } else {
                this.onArrChangeHandler(this.y, (Math.ceil(y / SPACE) * SPACE));
                this.onArrChangeHandler(this.values, dataItemArr[Math.abs(Math.ceil(y / SPACE))]);
            }
        },
        onArrChangeHandler (arr, value) {
            arr.splice(this.index, 1, value);
        },
        onPickerHandler (v) {
            this.show = false;
            let self = this;
            setTimeout(function(){
                self.$emit('onPickerHandler',v);
                self.show = true;
            }, 0.3 * 1000);
        }
    }
};
</script>
<style lang="less">
.hy-date-picker-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  .hy-date-picker-popup {
    width: 100%;
    height: 280px;
    background: #ffffff;
    position: absolute;
    bottom: 0;
    .hy-picker-popup-header {
      display: flex;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      border-bottom: 1px #eeeeee solid;
      color: #108ee9;
      font-size: 18px;
    }
    .hy-picker-popup-header-title {
      color: #000000;
    }
    .hy-picker {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .hy-picker-col {
      flex: 1 1 0%;
      display: block;
      position: relative;
      height: 238px;
      overflow: hidden;
      width: 100%;
    }
    .hy-picker-col-mask {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-size: 100% 102px;
      background-position: top, bottom;
      background-repeat: no-repeat;
      color: transparent;
      z-index: 3;
      margin: 0 auto;
      background-image: -webkit-linear-gradient(top, hsla(0, 0%, 100%, 0.95), hsla(0, 0%, 100%, 0.6)), -webkit-linear-gradient(bottom, hsla(0, 0%, 100%, 0.95), hsla(0, 0%, 100%, 0.6));
    }
    .hy-picker-col-indicator {
      width: 100%;
      height: 34px;
      box-sizing: border-box;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      color: transparent;
      top: 102px;
      position: absolute;
      left: 0;
      z-index: 3;
    }
    .hy-picker-col-content {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      padding: 102px 0;
      transform: translateY(0px);
    }
    .hy-picker-col-content-item {
      height: 34px;
      line-height: 34px;
      text-align: center;
    }
  }
  .picker-animate-in {
    animation: in 0.3s ease;
    animation-fill-mode: forwards;
  }
  @keyframes in {
    0% {
      transform: translate3d(0, 100%, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  .picker-animate-out {
    animation: out 0.3s ease;
    animation-fill-mode: forwards;
  }
  @keyframes out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(0, 100%, 0);
    }
  }
}
</style>

