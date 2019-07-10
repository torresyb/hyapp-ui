<template>
  <div class="label" :class="'label-' + type">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'DemosLabel',
  props: {
    type: {
      type: String,
      default: 'default' // default、fix
    }
  }
}
</script>
<style scoped>
.label {
  margin-right: 10px;
  font-size: 12px;
  display: inline-block;
  line-height: 16px;
  padding: 0 10px;
  min-width: 72px;
  text-align: center;
  box-sizing: border-box;
  border-radius: 3px;
  color: #fff;
  /* background-color: #288af0; */
  background-color:#42b983;
}
.label.label-default {
  background-color: #42b983;
}
.label.label-fix {
  /* background-color: #e96900; */
  background-color: #c00;
}
</style>
