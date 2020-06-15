<template>
  <div class="xx-form-container">
    <el-form
      ref="_form"
      :model="params"
      :inline="inline"
      :rules="curRules"
      :label-width="labelWidth?labelWidth:'110px'"
    >
      <el-form-item
        v-for="(form,index) in curForms"
        :key="index"
        :label="label?form.label:null"
        :label-width="form.labelWidth? (form.labelWidth + 'px') : ''"
        :prop="form.prop"
      >
        <!-- 普通文本框 -->
        <el-input
          v-if="form.itemType ==='input'|| form.itemType === undefined"
          v-model="params[form.prop]"
          :placeholder="form.placeholder"
          :readonly="form.readonly ? form.readonly:false"
          :disabled="form.disabled ? form.disabled:false"
        />
        <!-- 数字框 -->
        <el-input
          v-if="form.itemType ==='input.number'"
          v-model.number="params[form.prop]"
          :placeholder="form.placeholder"
          :readonly="form.readonly ? form.readonly:false"
          :disabled="form.disabled ? form.disabled:false"
        />
        <!-- 下拉框：可前端自定义和远程调用，两者也可混合使用 -->
        <el-select
          v-else-if="form.itemType === 'select'"
          v-model="params[form.prop]"
          :disabled="form.disabled ? form.disabled:false"
          :placeholder="form.placeholder"
          filterable
        >
          <el-option
            v-for="(option, opIndex) in selectOptions[index]"
            :key="opIndex + '_remote'"
            :value="(typeof option === 'object') ? option[form.valueKey || 'value'] : option"
            :label="(typeof option === 'object') ? option[form.labelKey || 'label'] : option"
          />
          <el-option
            v-for="(option, optionIndex) in form.options"
            :key="optionIndex + '_local'"
            :value="(typeof option === 'object') ? option[form.valueKey || 'value'] : option"
            :label="(typeof option === 'object') ? option[form.labelKey || 'label'] : option"
          />
        </el-select>
        <!-- date 日期框 -->
        <el-date-picker
          v-else-if="form.itemType === 'date'"
          v-model="params[form.prop]"
          type="date"
          :placeholder="form.placeholder"
          :disabled="form.disabled ? form.disabled:false"
          :readonly="form.readonly ? form.readonly:false"
          :editable="form.editable"
          :picker-options="form.pickerOptions || {}"
          @change="form.change?form.change():nullChange()"
        />
        <!-- 日期范围框 -->
        <el-date-picker
          v-else-if="form.itemType === 'daterange'"
          v-model="params[form.prop]"
          :size="form.size ? form.size : size"
          type="daterange"
          :disabled="form.disabled"
          :readonly="form.readonly"
          :editable="form.editable"
          :placeholder="form.placeholder"
          :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : '')"
          :picker-options="form.pickerOptions || {}"
          @change="date => changeDate(date, form.prop[0], form.prop[1])"
        />
        <!-- 计数器 -->
        <el-input-number
          v-if="form.itemType ==='number'"
          v-model="params[form.prop]"
          :placeholder="form.placeholder"
          :label="form.label"
          :min="form.min"
          :max="form.max"
          :disabled="form.disabled?form.disabled:false"
          :step="form.step ? form.step:1"
          :precision="form.precision"
          :controls-position="form.controlsPosition"
        />
      </el-form-item>
      <!-- 自定义form -->
      <slot
        name="formSlot"
        :params="params"
      />
    </el-form>
    <!-- 自定义底部操作 -->
    <slot name="optSlot" />
    <!-- 默认底部操作（适用于弹框） -->
    <div
      v-if="cancle&&save"
      align="right"
    >
      <el-button @click="cancle">取 消</el-button>
      <el-button
        type="primary"
        @click="save"
      >确 定</el-button>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  name: 'XxForm',
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    size: { type: String, default: 'mini' },
    label: { type: Boolean, default: true },
    labelWidth: {
      type: Number,
      default: 80
    },
    itemWidth: {
      type: Number,
      default: 200
    },
    forms: {
      type: Array,
      required: true
    },
    rules: {
      type: Object,
      required: false,
      default: () => {}
    },
    cancle: {
      type: Function,
      required: false,
      default: null
    },
    save: {
      type: Function,
      required: false,
      default: null
    }
  },
  data() {
    const selectOptionPrefix = 'select-option-prefix'
    // 取出属性
    return {
      curForms: this.forms,
      curRules: this.rules,
      params: {}, // 参数
      tempParams: {},
      selectOptionPrefix,
      selectOptions: []
    }
  },
  watch: {
    forms: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal) {
          this.curForms = newVal
          this.buildForm()
        }
      }
    }
  },
  mounted() {
    this.buildForm()
  },
  methods: {
    async getRemoteData(url, method = 'get', param, dataKey) {
      let data = null
      if (method === 'get') {
        data = await request({ url: url, method: method, params: param })
      } else {
        data = await request({ url: url, method: method, data: param })
      }
      this.$set(this.selectOptions, dataKey, data)
    },
    // 构建Form表单
    buildForm() {
      this.reset()
      this.forms.forEach((v, i) => {
        this.params[v.prop] = null
        // 可以有多个select
        if ((v.itemType === 'select' && v.selecteFetch) || v.selectUrl) {
          const dataKey = i
          if (!v.selectMethod) {
            v.selectMethod = 'get'
          }
          this.getRemoteData(
            v.selectUrl,
            v.selectMethod,
            v.selectParam,
            dataKey
          )
        }
      })
      this.tempParams = this.params
      /**
       * 设置了又置空？？？
       */
      this.params = {}
    },
    valid() {
      return new Promise(resolve =>
        this.$refs._form.validate(valid => resolve(valid))
      )
    },
    edit(params) {
      this.params = params
    },
    // 获取值
    getValue() {
      return this.params
    },
    getParams() {
      return new Promise(resolve => resolve(this.params))
    },
    // 下拉框获取标签值（对于带selectUrl的有效）
    getLabelValue() {
      this.forms.forEach((form, i) => {
        if (form.itemType && form.itemType === 'select') {
          if (this.params[form.prop] && this.selectOptions[i]) {
            const option = this.selectOptions[i].find(
              item => item.value === this.params[form.prop]
            )
            if (option) {
              this.params[form.prop] = option.label
            }
          }
        }
      })
      return this.params
    },
    reset() {
      this.params = {}
    }
  }
}
</script>
