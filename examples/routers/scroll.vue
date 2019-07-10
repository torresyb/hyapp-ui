<template>
    <div class="scroll">
        <nav class="title">滚动区块</nav>
        <div class="scroll-box">
            <hy-scroll class="contain" :data="items">
                <ul>
                    <li v-for="item in items">{{item}}</li>
                </ul>
            </hy-scroll>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                items: []
            }
        },
        created () {
            this.getListHandle()
        },
        methods: {
            getListHandle () {
                for(let i = 0 ; i<20; i++) {
                    this.items.push(i)
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .scroll-box {
        position: fixed;
        width: 100%;
        top: 60px;
        bottom: 0;
    }
    .contain{
        height: 100%;
        overflow: hidden;
    }
    li {
        list-style: none;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eee;
        background-color: #ffffff;
        text-align: center;
    }
    nav.title{
        height: 44px;
        background-color: #ffffff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
    }
</style>
