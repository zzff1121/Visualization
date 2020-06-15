<template>
  <div>
    <el-button-group
      v-for="(group,i) in groups"
      :key="i"
    >
      <el-button
        v-for="(btn,index) in group"
        :key="index"
        :type="btn.type ? btn.type:'primary'"
        :icon="btn.icon"
        :disabled="btn.disable?btn.disable:false"
        @click="btn.click"
      >{{ btn.label }}</el-button>&nbsp;
    </el-button-group>
  </div>
</template>

<script>
export default {
  name: 'XxButtonGroup',
  props: {
    groups: {
      type: Array,
      required: true
    }
  },
  watch: {
    groups: {
      deep: true,
      handler(newVal) {
        if (newVal) {
          this.groups = newVal
        }
      }
    }
  }
}
</script>

<style>
</style>
