<template>

  <div class="ax-form-designer">
    <el-container>
      <el-aside
        width="320px"
        class="left"
      >
        <div
          v-for="(group,i) in controlGroup"
          :key="i"
          class="ax-control-group"
        >
          <div class="group-name"> {{ group.name }} </div>
          <draggable
            :list="group.items"
            :sort="false"
            :group="{name:'form',pull:'clone',put:false}"
            :clone="clone"
          >
            <AxControlType
              v-for="c of group.items"
              :key="c.type"
              v-bind="c"
            />
          </draggable>
        </div>
      </el-aside>
      <el-main class="main">
        <div class="actions">
          <div class="action form-width">
            <span>表单宽度：</span>
            <el-slider
              v-model="formWidth"
              :min="20"
              :max="200"
            />
          </div>
          <div class="action space" />
          <div class="action">
            <el-button
              icon="el-icon-remove-outline"
              type="text"
              @click="currentControlIndex=-1"
            >清空选择</el-button>
            <el-button
              icon="el-icon-s-flag"
              type="text"
            >快速生成</el-button>
            <el-button
              icon="el-icon-view"
              type="text"
            >预览</el-button>
            <el-button
              icon="el-icon-document"
              type="text"
            >保存</el-button>
          </div>
        </div>
        <div
          class="form"
          :class="{'empty-control':emptyForm}"
        >
          <el-form
            ref="form"
            v-bind="formConfig"
            style="height:100%;margin:0 auto;"
            :style="{width:formWidth+'%'}"
          >
            <draggable
              :list="controlList"
              group="form"
              style="height:100%;"
              @add="onControlAdd"
              @choose="onChoose"
            >
              <AxControl
                v-for="(control,i) of controlList"
                :key="control.config.fieldName"
                v-model="form[control.config.fieldName]"
                :config="control.config"
                :focus="i==currentControlIndex"
                class="edit-mode"
                @copy-click="onCopyClick(control,i)"
                @delete-click="onDeleteClick(control,i)"
              />
            </draggable>
          </el-form>
        </div>
      </el-main>
      <el-aside
        width="300px"
        class="right"
      >

        <el-tabs value="1">
          <el-tab-pane
            label="组件配置"
            name="1"
          >
            <AxControlConfig
              v-if="currentControl"
              :config="currentControl.config"
            />
            <div
              v-if="!currentControl"
              class="empty"
            >
              <svg-icon icon-class="empty" />
              <div><span>这里空空如也</span></div>
            </div>
          </el-tab-pane>
          <el-tab-pane
            label="表单配置"
            name="2"
          >
            <AxFormConfig :config="formConfig" />
          </el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import AxControlType from './components/AxControlType'
import AxControl from './components/AxControl'
import AxFormConfig from './components/AxFormConfig'
import AxControlConfig from './components/AxControlConfig'
import uuidv1 from 'uuid/v1'
import _ from 'lodash'
import { formConfig, controlGroup } from './utils/index'

export default {
  components: {
    AxFormConfig,
    AxControlConfig,
    AxControl,
    AxControlType,
    draggable
  },
  data() {
    return {
      currentControlIndex: -1,
      currentControl: null,
      controlGroup,
      controlList: [],
      form: {},
      formConfig: _.cloneDeep(formConfig),
      formWidth: 60
    }
  },
  computed: {
    emptyForm() {
      return _.isEmpty(this.controlList)
    }
  },
  watch: {
    controlList: {
      deep: true,
      handler(controls) {
        console.log('heheh')
        controls.forEach(c => {
          // 新增未定义属性，并设置默认值
          if (c.config.fieldName) {
            if (_.isUndefined(this.form[c.config.fieldName])) {
              this.$set(
                this.form,
                c.config.fieldName,
                _.cloneDeep(c.config.defaultValue)
              )
            } else {
              this.form[c.config.fieldName] = _.cloneDeep(c.config.defaultValue)
            }
          }
        })
        if (_.isEmpty(controls)) {
          this.currentControlIndex = -1
        }
      }
    },
    currentControlIndex(i) {
      if (i !== -1) {
        this.currentControl = this.controlList[i]
      } else {
        this.currentControl = null
      }
    }
  },
  methods: {
    genFieldName(type) {
      const id = uuidv1().replace(/-/g, '_')
      // 为控件赋予属性名称
      const fieldName = `${type}_${id}`
      return fieldName
    },
    clone(original) {
      if (_.isUndefined(original)) {
        return null
      }
      // 设置字段名称，配置
      const control = _.cloneDeep(original)
      // 初始化配置
      control.config = {
        type: original.type,
        defaultValue: _.cloneDeep(original.defaultValue)
      }
      if (control.noInput !== true) {
        // 为控件赋予属性名称
        control.config.fieldName = this.genFieldName(control.type)
        control.config.label = control.name
      } else {
        control.config.label = ''
      }
      return control
    },
    onControlAdd() {},
    onChoose({ oldIndex }) {
      this.currentControlIndex = oldIndex
    },
    onCopyClick(control, i) {
      const newControl = _.cloneDeep(control)
      newControl.config.fieldName = this.genFieldName(newControl.type)
      this.controlList.splice(i + 1, 0, newControl)
    },
    onDeleteClick(control, i) {
      this.controlList.splice(i, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.ax-form-designer {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      background-color: #fff;
      padding: 8px;
      line-height: inherit;
      margin: 0;
      border-radius: 0;
      &.left {
        border-right: 1px solid $--border-color-light;
      }
      &.right {
        border-left: 1px solid $--border-color-light;
      }
      .ax-control-group {
        .group-name {
          padding: 8px;
        }
      }
    }
    .el-main {
      padding: 0;
      display: flex;
      flex-direction: column;
      .form {
        flex: 1;
        padding: 8px;
        overflow: auto;
        background-repeat: no-repeat;
        background-position: center;

        &.empty-control {
          background-image: url('../../assets/images/form_back.png');
        }
      }
      .actions {
        padding: 0 8px;
        font-size: 14px;
        display: flex;
        align-items: center;
        height: 50px;
        border-bottom: 1px solid $--border-color-light;
        .action {
          display: flex;
          align-items: center;
          margin-right: 18px;
          &.form-width {
            width: 200px;
            .el-slider {
              flex: 1;
            }
          }
          &.space {
            flex: 1;
          }
        }
      }
    }
    .right {
      .empty {
        text-align: center;
        font-size: 60px;
        span {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
