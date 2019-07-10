<template>
    <div class="demo-main">
        <div class="demo-button">
            <div class="demo-button">
                <hy-button @click.native="actionShowHandle('top')">开关上{{showPopup}}</hy-button>
            </div>
            <div class="demo-button">
                <hy-button @click.native="actionShowHandle('bottom')">开关下{{showPopup}}</hy-button>
            </div>
            <div class="demo-button">
                <hy-button @click.native="actionShowHandle('left')">开关左{{showPopup}}</hy-button>
            </div>
            <div class="demo-button">
                <hy-button @click.native="actionShowHandle('right')">开关右{{showPopup}}</hy-button>
            </div>
            <hy-popup :position="position" v-model="showPopup" width="30%" height="50%">
                <div>This is popup content</div>
            </hy-popup>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                showPopup: false,
                position: ''
            };
        },
        methods: {
            actionShowHandle (position) {
                this.position = position;
                this.showPopup = !this.showPopup;
            }
        }
    };
</script>
