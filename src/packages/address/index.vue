<template>
    <div class="hy-date-picker-mask" v-if="isPickershow">
        <div class="hy-date-picker-popup" :class="[showAnimate?'picker-animate-in':'picker-animate-out']">
            <div class="hy-picker-popup-header">
                <div class="hy-picker-popup-header-left" @click="onCancelHandler">取消</div>
                <div class="hy-picker-popup-header-title">{{title}}</div>
                <div class="hy-picker-popup-header-right" @click="onConfirmHandler">确定</div>
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
// 引入默认地址数据（项目手动引入）
// import ChinaAddressData from './city.json';
const SPACE = 34;
export default {
    name: 'Address',
    data () {
        return {
            isPickershow: false, // 是否展示组件
            showAnimate: true, // 组件显示隐藏动画
            data: [],
            index: 0,
            startY: [],
            y: [0, 0, 0],
            values: [], // 滑动过程中选中的值
            selectInfos: [], // 点击确认时选中的地址信息，格式  [{"label": "宁夏","value": 20},{"label": "固原","value": 271,"parent": 20},{"label": "海原县","value": 2270,"parent": 271}]
            selectValue: this.value, // 点击确认时选中的值，格式[1, 2, 3]
            // firstDefaultData: [],
            addressData: [], // 格式化后的所有地址数据
            startPosition: 0 // 滑动开始时滑动区块的位置。用于滑动结束时判断值是否改变
        };
    },
    props: {
        show: {
            type: Boolean
        },
        title: {
            type: String
        },
        list: {
            type: Array,
            // default: () => ChinaAddressData
            default: () => []
        },
        value: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        // 检测到值变化时，重新渲染地址组件
        value: 'init',
        show (val) {
            this.isPickershow = val;
        },
        // 更新父组件:show.sync值
        isPickershow (val) {
            this.$emit('update:show', val);
        }
    },
    created () {
        if (this.show) {
            this.isPickershow = true;
        }
        this.init(this.value);
    },
    methods: {
        // 初始化
        init(value){
            let that = this;
            value = value || that.value;
            that.data = [[], [], []];
            let list = [[], [], []]; // 存储省市县数据
            that.formateAddressData(addressData => {
                that.addressData = addressData;
                if (!value || value.length === 0) {
                    value = that.initDefaultData(value);
                }
                // 初始化省市县数据
                for(let i = 0; i < addressData.length; i++) {
                    let item = addressData[i];
                    if (typeof(item.parent) === 'undefined') {
                        that.data[0].push(item);
                        list[0].push(item);
                    } else if (item.parent === value[0]){
                        that.data[1].push(item);
                        list[1].push(item);
                    } else if (item.parent === value[1]){
                        that.data[2].push(item);
                        list[2].push(item);
                    }
                }
                // 默认选中位置
                this.initDefaulSelectAddr(value, list);
            });
        },
        // 默认选中地址
        initDefaulSelectAddr (value, data) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < data[i].length; j++) {
                    if (value[i] === data[i][j].value) {
                        // this.y.splice(i, 1, -(j * SPACE));
                        this.y[i] = -(j * SPACE);
                        this.values[i] = data[i][j];
                        break;
                    }
                }
            }
        },
		// 格式化地址数据
        formateAddressData (cb) {
            let list = this.list;
            let result = [];
            for (let i = 0; i < list.length; i++) {
                let provinceItem = list[i];
                result.push({
                    label: provinceItem.name,
                    value: provinceItem.provinceId
                });
                for (let j = 0; j < provinceItem.cityInfoList.length; j++) {
                    let cityItem = provinceItem.cityInfoList[j];
                    result.push({
                        label: cityItem.cityName,
                        value: cityItem.cityId,
                        parent: provinceItem.provinceId
                    });
                    for (let k = 0; k < cityItem.districtInfoList.length; k++) {
                        let areaItem = cityItem.districtInfoList[k];
                        result.push({
                            label: areaItem.districtName,
                            value: areaItem.districtId,
                            parent: cityItem.cityId
                        });
                    }
                }
            }
            cb && cb(result);
        },
		// 初始化默认省市县数据
        initDefaultData () {
            let list = this.list;
            let defaultProvince = list[0];
            let defaultCity = defaultProvince.cityInfoList[0];
            let defaultArea = defaultCity.districtInfoList[0];

            let defaultProvinceData = {
                label: defaultProvince.name,
                value: defaultProvince.provinceId
            };
            let defaultCityData = {
                label: defaultCity.cityName,
                value: defaultCity.cityId
            };
            let defaultAreaData = {
                label: defaultArea.districtName,
                value: defaultArea.districtId
            };
            this.values = [];
            this.values.push(defaultProvinceData);
            this.values.push(defaultCityData);
            this.values.push(defaultAreaData);
            return [defaultProvince.provinceId, defaultCity.cityId, defaultArea.districtId];
        },
        touchstart (e) {
            this.index = +e.target.innerHTML;
            this.startY[this.index] = e.targetTouches[0].pageY - (this.y[this.index] || 0);
            this.startPosition = this.y[this.index] || 0;
        },
        touchmove (e) {
            this.onArrChangeHandler(this.y, e.targetTouches[0].pageY - this.startY[this.index]);
        },
        touchend () {
            let y = this.y[this.index];
            let index = this.index;
            let dataItemArr = this.data[this.index];
            let max = (dataItemArr.length - 1) * SPACE;
            if (y > 0) {
                y = 0;
            } else if (Math.abs(y) > max) {
                y = -max;
            } else {
                y = Math.round(y / SPACE) * SPACE;
            }
            this.onArrChangeHandler(this.y, y);
            // 滑动结束值发生改变
            if (y !== this.startPosition) {
                // 更新结束后选择地址数据
                this.onArrChangeHandler(this.values, dataItemArr[Math.abs(Math.round(y / SPACE))]);
                if (index === 0 || index === 1) {
                    // 更新联动数据
                    this.computedChildAddrData(index, this.values[index].value);
                }
            }
        },
        // 省市县滑动切换时，重新计算省市县数据
        computedChildAddrData (index, value) {
            let that = this;
            let list = that.addressData;
            that.data[index + 1] = [];
            that.y[index + 1] = 0;
            let data = [];
            for (let i = 0; i < list.length; i++) {
                if (list[i].parent === value) {
                    data.push(list[i]);
                    that.data[index + 1].push(list[i]);
                }
            }
			// 更新子区域选中的值
            that.values.splice(index + 1, 1, data[0]);
            if (index === 0) {
                that.computedChildAddrData(index + 1, data[0].value);
            }
        },
        onArrChangeHandler (arr, value) {
            arr.splice(this.index, 1, value);
        },
        // 点击事件
        onPickerHandler () {
            this.showAnimate = false;
            setTimeout(() => {
                this.isPickershow = false;
                this.showAnimate = true;
                this.init();
            }, 0.3 * 1000);
        },
        // 取消按钮点击事件
        onCancelHandler () {
            this.onPickerHandler();
            this.$emit('on-cancel');
        },
        // 确定按钮点击事件
        onConfirmHandler () {
            this.onPickerHandler();
            let values = this.values;
            let selectName = [];
            this.selectValue.splice(0, this.selectValue.length);
            this.selectInfos.splice(0, this.selectInfos.length);
            for (let i in values) {
                this.selectValue.push(values[i].value);
                this.selectInfos.push(values[i]);
                selectName.push(values[i].label);
            }
            this.$emit('on-confirm', {
                name: selectName.join(' '),
                value: this.selectValue
            });
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
			// justify-content: space-between;
			height: 40px;
			line-height: 40px;
			padding: 0 20px;
			border-bottom: 1px #eeeeee solid;
			color: #108ee9;
			font-size: 18px;
		}
		.hy-picker-popup-header-title {
            color: #000000;
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin: 0 6px;
            text-align: center;
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
			background-image: -webkit-linear-gradient(
					top,
					hsla(0, 0%, 100%, 0.95),
					hsla(0, 0%, 100%, 0.6)
				),
				-webkit-linear-gradient(bottom, hsla(0, 0%, 100%, 0.95), hsla(0, 0%, 100%, 0.6));
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
