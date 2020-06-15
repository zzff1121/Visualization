<template>
  <div align="center">
    <el-tag v-for="tag in tags" :key="tag.text" :color="tag.color" style="margin-left:'10px'">
      <span class="tag-font">{{tag.text}}</span>
    </el-tag>
  </div>
</template>
<script>
export default {
  name: 'xx-tag',
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.tag-font {
  text-shadow: 5px 2px 6px #000;
  font-family: 'Courier New', Courier, monospace;
  color: #ffffff;
}
</style>
