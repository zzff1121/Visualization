<template>
  <el-button-group class="xx-toolbar-group">
    <slot />
  </el-button-group>
</template>

<script>
export default {
  name: 'XxToolBarGroup'
}
</script>

<style scoped>
.xx-toolbar-group {
  margin-right: 10px;
}
</style>
