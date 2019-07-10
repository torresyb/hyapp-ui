<template>
    <div>
        <button @click="onPickerHandler({type:0})">picker</button>
        <button @click="onPickerHandler({type:1})">sexs</button>
        <hy-picker v-model="picker" :list="selectPicker" :currentIndex="currentIndex" :isPickershow="isPickershow" @onPickerHandler="onPickerHandler" />
       <div>{{picker}}</div>
    </div>

</template>

<script>
export default {
    data () {
        return {
            currentIndex:0,
            isPickershow: false,
            picker: [],
            selectPickerType:0,
            selectPicker:[],
            list:[[{label:'上海',value:1},{label:'北京',value:2},{label:'深圳',value:3}]],
            listSex:[[{label:'男',value:1},{label:'女',value:2},{label:'人妖',value:3}]]
        };
    },
    methods: {
        onPickerHandler (options) {
            if(options.type===0){
                this.currentIndex=2;
                this.selectPickerType =0;
                this.selectPicker = this.list;
            }else if(options.type===1){
                this.currentIndex=2;
                this.selectPickerType =1;
                this.selectPicker =  this.listSex;
            }
            if(options.switch){
                if(this.selectPickerType===0){
                    console.log(this.selectPickerType,this.picker);
                }else  if(this.selectPickerType===1){
                    console.log(this.selectPickerType,this.picker);

                }
            }
            this.isPickershow = !this.isPickershow;
        }
    },
};
</script>
