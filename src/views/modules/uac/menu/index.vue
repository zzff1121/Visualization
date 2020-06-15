<template>
  <div class="menu-manager manager-pane">
    <SplitPane
      class="split-pane"
      :min-percent="20"
      :default-percent="30"
      split="vertical"
    >
      <template slot="paneL">
        <div class="left">
          <div class="menu-tree">
            <div class="filter-container">
              <el-button-group>
                <el-button
                  type="primary"
                  icon="plus"
                  @click="handlerAdd"
                >添加</el-button>
                <el-button
                  type="primary"
                  icon="edit"
                  @click="handlerEdit"
                >编辑</el-button>
                <el-button
                  type="primary"
                  icon="delete"
                  @click="handleDelete"
                >删除</el-button>
              </el-button-group>
              <br>
              <br>
              <div>
                <!-- <el-switch @change="$refs.menuTree" v-model="closeTree"></el-switch> -->
                <el-input
                  v-model="filterText"
                  placeholder="输入关键字进行过滤"
                />
              </div>
            </div>
            <el-tree
              ref="menuTree"
              class="filter-tree"
              :data="treeData"
              node-key="id"
              highlight-current
              :props="defaultProps"
              :filter-node-method="filterNode"
              :expand-on-click-node="false"
              default-expand-all
              @node-click="getNodeData"
            >
              <template slot-scope="{node,data}">
                <span style="font-size:14px">
                  <svg-icon
                    v-if="data.icon"
                    :icon-class="data.icon"
                  />
                  {{ node.label }}
                </span>
              </template>
            </el-tree>
          </div>
        </div>
      </template>
      <template slot="paneR">
        <div class="right">
          <el-tabs key="1">
            <el-tab-pane
              key="1"
              label="基本信息"
            >
              <el-form
                ref="form"
                :disabled="formEdit"
                :rules="rule"
                :label-position="labelPosition"
                label-width="80px"
                :model="form"
              >
                <el-form-item
                  label="路径编码"
                  prop="code"
                >
                  <el-input
                    v-model="form.code"
                    placeholder="请输入路径编码"
                  />
                </el-form-item>
                <el-form-item
                  label="标题"
                  prop="title"
                >
                  <el-input
                    v-model="form.title"
                    placeholder="请输入标题"
                  />
                </el-form-item>
                <el-form-item
                  label="父级节点"
                  prop="parentId"
                >
                  <!-- <el-input v-model="form.parentId" placeholder="请输入父级节点"></el-input> -->
                  <el-cascader
                    v-model="parentIds"
                    clearable
                    style="width:100%"
                    :options="treeDataForCascader"
                    change-on-select
                  />
                </el-form-item>
                <el-form-item
                  label="图标"
                  prop="icon"
                >
                  <el-select
                    v-model="form.icon"
                    allow-create
                    placeholder="选择图标"
                    filterable
                    clearable
                  >
                    <svg-icon
                      v-if="form.icon"
                      slot="prefix"
                      style="margin-left:4px;color:#606266"
                      :icon-class="form.icon"
                    />
                    <el-option
                      v-for="icon in iconMap"
                      :key="icon"
                      :value="icon"
                    >
                      <svg-icon :icon-class="icon" />
                      <span>{{ icon }}</span>
                    </el-option>
                  </el-select>
                  <!-- <d2-icon-select v-model="form.icon" placeholder="选择其他图标"></d2-icon-select> -->
                </el-form-item>
                <el-form-item
                  label="资源路径"
                  prop="href"
                >
                  <el-input
                    v-model="form.href"
                    placeholder="请输入资源路径"
                  />
                </el-form-item>
                <el-form-item
                  label="类型"
                  prop="type"
                >
                  <el-select
                    v-model="form.type"
                    class="filter-item"
                    placeholder="请输入资源请求类型"
                  >
                    <el-option
                      v-for="item in typeOptions"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="排序"
                  prop="orderNum"
                >
                  <el-input
                    v-model="form.orderNum"
                    type="number"
                    placeholder="请输入排序"
                  />
                </el-form-item>
                <el-form-item
                  label="描述"
                  prop="description"
                >
                  <el-input
                    v-model="form.description"
                    placeholder="请输入描述"
                  />
                </el-form-item>
                <el-form-item
                  label="访问方式"
                  prop="attr2"
                >
                  <el-select
                    v-model="form.attr2"
                    default-first-option
                    placeholder="访问方式"
                  >
                    <el-option
                      value
                      label="菜单"
                    />
                    <el-option
                      value="frame"
                      label="内嵌页面"
                    />
                    <el-option
                      value="url"
                      label="外部链接"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item v-if="formStatus == 'update'">
                  <el-button
                    type="primary"
                    @click="update"
                  >更新</el-button>
                  <el-button @click="onCancel">取消</el-button>
                </el-form-item>
                <el-form-item v-if="formStatus == 'create'">
                  <el-button
                    type="primary"
                    @click="create"
                  >保存</el-button>
                  <el-button @click="onCancel">取消</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane
              key="2"
              label="按钮或资源"
            >
              <menu-element
                ref="menuElement"
                :menu-id="currentId"
              />
            </el-tab-pane>
          </el-tabs>
        </div>
      </template>
    </SplitPane>
  </div>
</template>

<script>
import { fetchTree, getObj, addObj, delObj, putObj } from 'api/uac/menu'
import _ from 'lodash'
import Icons from '@/icons'

export default {
  name: 'Menu',
  components: {
    'menu-element': () => import('./components/element')
  },
  data() {
    return {
      closeTree: false,
      filterText: '',
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      showElement: false,
      typeOptions: ['menu', 'dirt'],
      listQuery: {
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      labelPosition: 'right',
      form: {
        code: undefined,
        title: undefined,
        parentId: undefined,
        href: undefined,
        icon: undefined,
        orderNum: undefined,
        description: undefined,
        path: undefined,
        enabled: undefined,
        type: undefined,
        attr1: undefined,
        attr2: undefined
      },
      rule: {
        code: [
          {
            required: true,
            toggle: 'blur',
            message: '编码不能为空'
          }
        ],
        title: [
          {
            required: true,
            toggle: 'blur',
            message: '标题不能为空'
          }
        ],
        icon: [
          {
            required: true,
            toggle: 'blur',
            message: '图标不能为空'
          }
        ],
        type: [
          {
            required: true,
            toggle: 'blur',
            message: '类型不能为空'
          }
        ]
      },
      parentIds: [],
      currentId: -1,
      iconMap: []
    }
  },
  computed: {
    treeDataForCascader() {
      const check = treeData => {
        return treeData.map(d => {
          const node = {
            value: d.id,
            label: d.title
          }
          if (!_.isEmpty(d.children)) {
            node.children = check(d.children)
          }
          return node
        })
      }
      return check(this.treeData)
    }
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val)
    },
    parentIds: {
      deep: true,
      handler(v) {
        if (_.isEmpty(v)) {
          this.form.parentId = '-1'
          this.form.attr1 = ''
        } else {
          this.form.parentId = v[v.length - 1] + ''
          this.form.attr1 = JSON.stringify(v)
        }
      }
    }
  },
  mounted() {
    this.getList()
    const iconMap = Icons.map(i => {
      return i.default.id.replace(/^icon-/g, '')
    })
    this.iconMap = iconMap
  },
  methods: {
    getList() {
      fetchTree(this.listQuery).then(data => {
        this.treeData = data
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getNodeData(data) {
      if (!this.formEdit) {
        this.formStatus = 'update'
      }
      getObj(data.id).then(data => {
        this.form = data
        if (data.attr1) {
          this.parentIds = JSON.parse(data.attr1)
        } else {
          this.parentIds = []
        }
      })
      this.currentId = data.id
      this.showElement = true
      this.$refs.menuElement.menuId = data.id
      this.$refs.menuElement.getList()
    },
    handlerEdit() {
      if (this.form.id) {
        this.formEdit = false
        this.formStatus = 'update'
      }
    },
    handlerAdd() {
      this.resetForm()
      this.formEdit = false
      this.formStatus = 'create'
    },
    handleDelete() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(this.currentId).then(() => {
          this.getList()
          this.resetForm()
          this.onCancel()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    update() {
      putObj(this.form.id, this.form).then(() => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    create() {
      addObj(this.form).then(() => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    onCancel() {
      this.formEdit = true
      this.formStatus = ''
    },
    resetForm() {
      this.form = {
        code: undefined,
        title: undefined,
        parentId: this.currentId,
        href: undefined,
        icon: undefined,
        orderNum: undefined,
        description: undefined,
        path: undefined,
        enabled: undefined,
        type: undefined,
        attr1: undefined,
        attr2: undefined
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-manager {
  height: 70vh;
  display: flex;
  flex-direction: column;
  .menu-tree {
    display: flex;
    flex-direction: column;
    height: 100%;
    .filter-tree {
      flex: 1;
      overflow: auto;
    }
  }
}
</style>
