<template>
    <div class="swiper">
        <swiper :data="list"
                :distance="20"
                @swiperOnClickHandler="swiperOnClickHandler"></swiper>
        <swiper ref="swiper"
                @swiperOnChangeHandler="swiperOnChangeHandler"
                :loop="false"
                :autoplay="false"
                :dots="true"
                :autoplayInterval="3000"
                :data="list"
                :distance="20">
            <li v-for="(item,i) in list"
                :key="i"
                @click.stop.prevent="swiperOnClickHandler(item)">
                <img :src="item.imageUrl">
            </li>
        </swiper>
        <button :class="[currentIndex==index?'active':'']"
                v-for="(item,index) in list"
                :key="index"
                @click="tabOnClickHandler(index)">{{index}}</button>
    </div>
</template>
<script>
export default {
    data () {
        return {
            currentIndex: 0,
            list: [{ imageUrl: require('../assets/images/001.jpg') }, { imageUrl: require('../assets/images/002.jpg') }, { imageUrl: require('../assets/images/003.jpg') }],
        };
    },
    created () {
        setTimeout(() => {
            this.list = [{ 'action': '', 'endTime': 1564502400000, 'id': 101, 'imageUrl': 'https://downloaddaikuan.2345.com/oms/appmanage/2345jk/1559806100568.png', 'needLogin': false, 'openType': 5, 'redirectUrl': '', 'showTime': 2, 'startTime': 1559318400000 }, { 'action': '', 'endTime': 1564502400000, 'id': 102, 'imageUrl': 'https://downloaddaikuan.2345.com/oms/appmanage/2345jk/1559806142714.png', 'needLogin': false, 'openType': 5, 'redirectUrl': '', 'showTime': 2, 'startTime': 1559318400000 }, { 'action': '', 'endTime': 1564502400000, 'id': 106, 'imageUrl': 'https://downloaddaikuan.2345.com/oms/appmanage/2345jk/1559806381766.png', 'needLogin': false, 'openType': 5, 'redirectUrl': '', 'showTime': 2, 'startTime': 1559318400000 }];
        }, 5000);
    },
    methods: {
        swiperOnClickHandler (item, i) {
            console.log(item, i);
        },
        swiperOnChangeHandler (i) {
            this.currentIndex = i;
        },
        tabOnClickHandler (i) {
            this.$refs.swiper.tabOnClickHandler(true, i);
        }
    }
};
</script>
<style lang="less">
.swiper {
  .hy-swiper img {
    border-radius: 10px;
  }
}
</style>

<style lang="less" scoped>
.swiper {
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  .active {
    color: aquamarine;
  }
}
</style>
