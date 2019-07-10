<template>
    <hy-scratch-card :prize="prize" :prizebg="prizebg"></hy-scratch-card>
</template>
<script>
export default {
    data() {
        return {
            prize:null,
            prizebg:require('../assets/images/prizebg.jpg')
        };
    },
    created(){
        const prizeList= ['100元', '200元', '300元', '400元', '谢谢', '谢谢', '谢谢', '谢谢'];
        this.prize=prizeList[Math.floor(Math.random()*prizeList.length)];
    }
};
</script>

