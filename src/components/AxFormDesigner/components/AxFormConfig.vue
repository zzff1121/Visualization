<template>
  <el-form
    class="ax-form-config"
    :model="config"
    label-position="top"
    size="mini"
  >
    <el-form-item
      prop="title"
      label="标题"
    >
      <el-input
        v-model="config.title"
        placeholder="表单名称"
      />
    </el-form-item>
    <el-form-item
      prop="url"
      label="URL"
    >
      <el-input
        v-model="config.url"
        placeholder="提交地址"
      />
    </el-form-item>
    <el-form-item
      prop="method"
      label="方法"
    >
      <el-select
        v-model="config.method"
        placeholder="提交方法"
      >
        <el-option value="POST" />
        <el-option value="GET" />
        <el-option value="PUT" />
        <el-option value="DELETE" />
      </el-select>
    </el-form-item>

    <el-form-item
      prop="inline"
      label="内联表单"
    >
      <el-switch v-model="config.inline" />
    </el-form-item>
    <el-form-item
      prop="labelPosition"
      label="标签位置"
    >
      <el-select
        v-model="config.labelPosition"
        placeholder="提交标签位置"
      >
        <el-option value="right" />
        <el-option value="left" />
        <el-option value="top" />
      </el-select>
    </el-form-item>

    <el-form-item
      prop="labelWidth"
      label="标签宽度"
    >
      <el-input
        v-model="labelWidth"
        type="number"
      />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      labelWidth: parseInt(this.config.labelWidth.replace('px', ''))
    }
  },
  watch: {
    labelWidth(v) {
      this.config.labelWidth = `${v}px`
    }
  }
}
</script>

<style lang="scss" scoped>
.ax-form-config {
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
