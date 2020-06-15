<template>
  <el-button-group class="xx-operation-container">
    <el-button
      v-for="(btn,index) in buttons"
      :key="index"
      :type="btn.type ? btn.type:'primary'"
      :icon="btn.icon"
      :disabled="btn.disable?btn.disable:false"
      @click="btn.click"
    >{{ btn.label }}</el-button>
  </el-button-group>
</template>

<script>
export default {
  name: 'XxButton',
  props: {
    buttons: {
      type: Array,
      required: true
    }
  },
  watch: {
    buttons: {
      deep: true,
      handler(newVal) {
        if (newVal) {
          this.buttons = newVal
        }
      }
    }
  }
}
</script>

<style>
</style>
