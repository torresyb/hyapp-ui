<template>
    <div>
        <hy-textarea
        v-model="textareaValuea"
        :textareaId="'A'"
        @focus="focus"
        @blur="blur"
        @change="change">
        </hy-textarea>
        {{textareaValuea}}
        <hy-textarea v-model="textareaValueb" :textareaId="'B'"></hy-textarea>
        {{textareaValueb}}
    </div>
</template>
<script>
export default {
    data () {
        return {
            textareaValuea:'',
            textareaValueb:''
        };
    },
    methods:{
        blur(){
            console.log('blur');
        },
        focus(){
            console.log('focus');
        },
        change(){
            console.log('change');
        }
    }

};
</script>
