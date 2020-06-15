<template>
  <el-dialog
    ref="dialog"
    v-drag-dialog
    class="xx-dialog"
    append-to-body
    modal-append-to-body
    :visible.sync="dialogTableVisible"
    :title="title"
    :before-close="beforeClose"
    :width="width"
    :top="top"
    :close-on-click-modal="false"
    :close-on-press-escape="closeOnPressEscape"
    lock-scroll
    :fullscreen="isfullscreen"
    :show-close="false"
    @close="handelClose"
    @opened="handelOpen"
  >
    <div
      slot="title"
      class="my-dialog-title"
    >
      <div class="window-opts">
        <i
          v-if="!isfullscreen"
          class="el-icon-full-screen"
          @click="setFull(true)"
        />
        <i
          v-if="isfullscreen"
          class="el-icon-copy-document"
          @click="setFull(false)"
        />
        <i
          class="el-icon-close"
          @click="close(null)"
        />
      </div>
      <div v-if="$slots.title">
        <slot name="title" />
      </div>
      <div
        v-else
        class="dialog-title"
      >
        <span class="el-dialog__title">{{ title }}</span>
      </div>
    </div>

    <slot />
    <div
      v-if="showFooter"
      slot="footer"
    >
      <div v-if="$slots.footer">
        <!-- 自定义插槽内容 -->
        <slot name="footer" />
      </div>
      <div v-else>
        <!-- 默认插槽内容 -->
        <el-button
          type="default"
          @click="onCancel"
        >{{ cancelText }}</el-button>
        <el-button
          type="primary"
          @click="onConfirm"
        >{{ confirmText }}</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import dragDialog from '@/directive/xx-drag-dialog'
import _ from 'lodash'
export default {
  name: 'XxDialog',
  directives: { dragDialog },
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '80%'
    },
    height: {
      type: String,
      default: 'auto'
    },
    top: {
      type: String,
      default: '20px'
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: Function,
      default: function(done) {
        if (done) {
          done()
        }
      }
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      parent: this
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      data: null,
      isfullscreen: this.fullscreen,
      style: {
        top: 0,
        left: 0,
        marginTop: null,
        width: null,
        height: null
      }
    }
  },
  mounted() {},
  methods: {
    handelOpen() {},
    handelClose() {},
    show(data) {
      this.dialogTableVisible = true
      this.$nextTick(() => {
        this.data = data ? _.cloneDeep(data) : new Date().getTime()
      })
    },
    close(callBackData = null) {
      this.dialogTableVisible = false
      this.$emit('dialog-close', callBackData)
    },
    closeDlg() {
      this.close()
    },
    onCancel() {
      this.$emit('close')
      this.close()
    },
    onConfirm() {
      this.$emit('ok')
    },
    setFull(full) {
      this.isfullscreen = full
      // this.$nextTick(function() {
      //   const dialog = this.$refs.dialog.$el.querySelector('.el-dialog')
      //   console.log(dialog)
      //   if (this.isfullscreen) {
      //     this.style.top = dialog.style.top
      //     this.style.left = dialog.style.left
      //     this.style.marginTop = dialog.style.marginTop
      //     this.style.height = dialog.style.height
      //     this.style.width = dialog.style.width
      //     dialog.style.top = '0px'
      //     dialog.style.left = '0px'
      //     dialog.style.width = 'auto'
      //     dialog.style.left = 'auto'
      //   } else {
      //     dialog.style.top = this.style.top
      //     dialog.style.left = this.style.left
      //     dialog.style.marginTop = this.style.marginTop
      //     dialog.style.height = this.style.height
      //     dialog.style.width = this.style.width
      //   }
      // })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.xx-dialog {
  .el-dialog {
    display: flex;
    flex-direction: column;
  }
  .my-dialog-title {
    position: relative;
    .window-opts {
      float: right;
      cursor: auto;
      i {
        color: #909399;
        font-size: 16px;
        font-weight: bolder;
        cursor: pointer;
        margin: 0 2px;
        &:hover {
          color: #409eff;
        }
      }
    }
  }
}
</style>
