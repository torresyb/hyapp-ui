<template>
    <div>
        <button @click="onPickerHandler">picker</button>
        <date-picker v-model="picker" :isPickershow="isPickershow" @onPickerHandler="isPickershow=!isPickershow" />
        {{picker}}
    </div>

</template>

<script>
export default {
    data () {
        return {
            isPickershow: false,
            picker: []
        };
    },
    methods: {
        onPickerHandler () {
            this.isPickershow = !this.isPickershow;
        }
    },
};
</script>
