<template>
  <el-form
    class="ax-control-config"
    :model="config"
    label-position="top"
    size="mini"
  >
    <el-form-item
      prop="fieldName"
      label="字段名称"
    >
      <el-input v-model="config.fieldName" />
    </el-form-item>
    <el-form-item
      prop="label"
      label="标题"
    >
      <el-input v-model="config.label" />
    </el-form-item>
    <el-form-item
      prop="placeholder"
      label="占位内容"
    >
      <el-input v-model="config.placeholder" />
    </el-form-item>
    <el-form-item
      prop="defaultValue"
      label="默认值"
    >
      <el-input v-model="config.defaultValue" />
    </el-form-item>
    <el-form-item
      prop="class"
      label="CSS类名"
    >
      <el-input v-model="config.class" />
    </el-form-item>
    <el-form-item
      prop="rules"
      label="校验规则"
    >
      <el-checkbox v-model="required">必填</el-checkbox>
      <el-input v-model="config.rules" />
    </el-form-item>
  </el-form>
</template>

<script>
// import _ from 'lodash'

export default {
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.ax-control-config {
  /deep/ .el-form-item {
    margin-bottom: 8px;
    .el-form-item__label {
      line-height: normal !important;
    }
    .el-select {
      width: 100%;
    }
  }
}
</style>
