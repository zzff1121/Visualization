<template>
  <el-card
    header="表单设计"
    class="form-designer-card"
  >
    <AxFormDesigner />
  </el-card>

</template>

<script>
import AxFormDesigner from '@/components/AxFormDesigner'
export default {
  components: {
    AxFormDesigner
  }
}
</script>

<style lang="scss" scoped>
.form-designer-card {
  display: flex;
  flex-direction: column;
  /deep/ {
    .el-card__body {
      padding: 0 0 !important;
      flex: 1;
      overflow: auto;
    }
  }
  height: calc(100vh - 64px - 24px);
}
</style>
