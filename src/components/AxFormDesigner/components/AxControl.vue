
<template>
  <el-form-item
    class="ax-form-item"
    :label="config.label"
    :class="{'focus':focus}"
  >
    <el-input
      v-if="config.type=='text'"
      v-model="value_"
      type="text"
      v-bind="config"
      :class="[config.class]"
    />
    <el-input
      v-else-if="config.type=='textarea'"
      v-model="value_"
      type="textarea"
      v-bind="config"
      :class="[config.class]"
    />
    <el-radio-group
      v-else-if="config.type=='radio'"
      v-model="value_"
      v-bind="config"
      :class="[config.class]"
    >
      <el-radio :label="1">选项1</el-radio>
      <el-radio :label="2">选项2</el-radio>
      <el-radio :label="3">选项3</el-radio>
    </el-radio-group>
    <el-checkbox-group
      v-else-if="config.type=='checkbox'"
      v-model="value_"
      v-bind="config"
      :class="[config.class]"
    >
      <el-checkbox :label="1">选项1</el-checkbox>
      <el-checkbox :label="2">选项2</el-checkbox>
      <el-checkbox :label="3">选项3</el-checkbox>
    </el-checkbox-group>
    <el-time-picker
      v-else-if="config.type=='time'"
      v-model="value_"
      v-bind="config"
      :class="[config.class]"
    />
    <el-time-picker
      v-else-if="config.type=='time-range'"
      v-model="value_"
      v-bind="config"
      :class="[config.class]"
      is-range
    />
    <el-date-picker
      v-else-if="config.type=='date'"
      v-model="value_"
      v-bind="config"
      :class="[config.class]"
      type="date"
    />
    <el-date-picker
      v-else-if="config.type=='daterange'"
      v-model="value_"
      v-bind="config"
      :class="[config.class]"
      type="daterange"
    />
    <el-date-picker
      v-else-if="config.type=='datetime'"
      v-model="value_"
      v-bind="config"
      :class="[config.class]"
      type="datetime"
    />
    <el-date-picker
      v-else-if="config.type=='datetimerange'"
      v-model="value_"
      v-bind="config"
      :class="[config.class]"
      type="datetimerange"
    />
    <el-select
      v-else-if="config.type=='select'"
      v-model="value_"
      v-bind="config"
      :class="[config.class]"
    >
      <el-option
        :value="1"
        label="选项1"
      />
      <el-option
        :value="2"
        label="选项2"
      />
      <el-option
        :value="3"
        label="选项3"
      />
    </el-select>
    <el-divider
      v-else-if="config.type=='divider'"
      v-bind="config"
      :class="[config.class]"
    />
    <el-upload
      v-else-if="config.type=='file'"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :auto-upload="false"
      :on-success="onFileUploadSuccess"
      v-bind="config"
      :class="[config.class]"
    >
      <el-button
        slot="trigger"
        type="primary"
      >选取文件</el-button>
      <el-button
        style="margin-left: 10px;"
        type="success"
        @click="$refs.upload.submit()"
      >上传到服务器</el-button>
      <div
        slot="tip"
        class="el-upload__tip"
      >文件上传说明</div>
    </el-upload>
    <span
      v-else-if="config.type=='text-info'"
      v-bind="config"
      :class="[config.class]"
    >文本信息</span>
    <tinymce
      v-else-if="config.type=='rich-editor'"
      v-model="value_"
      :height="300"
      v-bind="config"
      :class="[config.class]"
    />
    <el-alert
      v-else
      :title="'暂不支持的组件：['+ config.name +']'"
      type="error"
      :closable="false"
    />
    <div
      v-if="focus"
      class="actions"
    >
      <el-button
        circle
        type="primary"
        icon="el-icon-copy-document"
        @click="$emit('copy-click',config)"
      />
      <el-button
        circle
        type="danger"
        icon="el-icon-delete"
        @click="$emit('delete-click',config)"
      />
    </div>
  </el-form-item>
</template>
<script>
export default {
  components: {
    Tinymce: () => import('@/components/Tinymce')
  },
  props: {
    /* eslint-disable vue/require-default-prop */
    value: [String, Number, Boolean, Array, Object, Date],
    config: {
      type: Object,
      default: () => {}
    },
    focus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value_: this.value
    }
  },
  watch: {
    value(v) {
      this.value_ = v
    },
    value_(v) {
      this.updateValue(v)
    }
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value)
    },
    onFileUploadSuccess(response, file, fileList) {
      this.value_ = [file.name]
    }
  }
}
</script>
<style lang="scss" scoped>
.ax-form-item.el-form-item {
  position: relative;
  &.edit-mode {
    cursor: move;
    box-sizing: border-box;
    border: 1px dashed rgba(0, 0, 0, 0);
    border-radius: 4px;
    padding: 2px;
    &:hover,
    &.focus {
      border-color: $--color-primary;
      background-color: $mainBg;
    }
  }
  .actions {
    position: absolute;
    right: -90px;
    top: 0;
  }
}
</style>
