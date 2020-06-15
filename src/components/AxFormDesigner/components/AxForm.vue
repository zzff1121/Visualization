<template>
  <div>
    <el-form
      ref="form"
      :model="form"
    >
      <div
        v-for="control in controls"
        :key="control.fieldName"
      >
        <AxControl
          v-model="form[control.fieldName]"
          :config="control.config"
        />
      </div>
    </el-form>

    <hr>
    <div
      v-for="(control,i) in controls"
      :key="i"
    >
      {{ control }}
    </div>
    <hr>
    <div>
      {{ form }}
    </div>

  </div>
</template>

<script>
import AxControl from './AxControl'
import _ from 'lodash'
export default {
  components: {
    AxControl
  },
  props: {
    controls: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {}
    }
  },
  watch: {
    controls: {
      deep: true,
      handler(controls) {
        controls.forEach(c => {
          // 新增未定义属性，并设置默认值
          if (_.isUndefined(this.form[c.fieldName])) {
            this.$set(
              this.form,
              c.fieldName,
              _.cloneDeep(c.defaultValue || null)
            )
          }
        })
      }
    }
  }
}
</script>

<style>
</style>
