<template>
  <el-dialog
    title="表格导入"
    center
    :visible.sync="dialogVisible"
    append-to-body
    :close-on-click-modal="false"
    width="300px"
  >
    <el-upload
      :action="this.param.action"
      :headers="headers"
      :auto-upload="this.param.autoUpload"
      :multiple="this.param.multiple"
      :limit="this.param.limit"
      :on-exceed="handleExceed"
      :name="this.param.name"
      accept=".xlsx, .xls"
      :on-success="onSuccess"
      :on-error="onError"
      ref="upload"
    >
      <el-button type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">根据模板格式填写数据</div>
    </el-upload>
  </el-dialog>
</template>
<script>
// import { errorLog } from '@/plugin/axios/index'
import { getToken } from '@/utils/auth'

export default {
  name: 'excel-import',
  mounted() {},
  data() {
    return {
      dialogVisible: false,
      headers: {},
      param: {
        title: '表格导入',
        action: null,
        headers: null,
        multiple: null,
        data: null,
        name: 'file',
        withCredentials: false,
        limit: null,
        autoUpload: true,
        accept: '.xlsx',
        exceedMsg: '请单个上传'
      }
    }
  },
  methods: {
    // 显示弹出框
    show(param) {
      this.dialogVisible = true
      this.param = param
      const token = getToken()
      if (token && token !== 'undefined') {
        this.headers['Authorization'] = token
      }
      this.$nextTick(() => {
        this.$refs.upload.clearFiles()
      })
    },
    beforeClose() {},
    handleExceed() {
      alert(this.param.exceedMsg)
    },
    onSuccess() {
      this.$message({
        message: '文件上传成功',
        type: 'success'
      })
      this.$emit('success')
      this.dialogVisible = false
    },
    onError(e, f, fList) {
      this.dialogVisible = false
      const detail = JSON.parse(e.message).message
      if (detail) {
        this.$message({
          message: detail,
          type: 'error'
        })
      } else {
        this.$message({
          message: '请按照相关表格模板填写数据！',
          type: 'error'
        })
      }
    }
  }
}
</script>
