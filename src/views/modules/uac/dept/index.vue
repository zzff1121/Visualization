<template>
  <div class="dept-container">
    <SplitPane
      class="split-pane"
      :min-percent="20"
      :default-percent="30"
      split="vertical"
    >
      <template slot="paneL">
        <div class="left">
          <el-button-group>
            <el-button
              type="primary"
              icon="plus"
              @click="handlerAdd(true)"
            >添加一级部门</el-button>
            <el-button
              type="primary"
              icon="plus"
              :disabled="!currentId"
              @click="handlerAdd(false)"
            >添加子部门</el-button>
            <el-button
              type="primary"
              icon="edit"
              @click="handlerEdit"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              :disabled="!currentId"
              @click="handleDelete"
            >删除</el-button>
          </el-button-group>
          <br>
          <br>
          <el-input
            v-model="filterText"
            placeholder="输入关键字进行过滤"
          />
          <br>
          <br>
          <el-tree
            ref="groupTree"
            class="filter-tree"
            default-expand-all
            :data="treeData"
            node-key="id"
            highlight-current
            :props="defaultProps"
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            @node-click="getNodeData"
          />
        </div>
      </template>
      <template slot="paneR">
        <div class="right">
          <el-form
            ref="form"
            label-width="80px"
            :label-position="labelPosition"
            :model="form"
            :disabled="formEdit"
          >
            <el-form-item label="名称">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="编码">
              <el-input v-model="form.code" />
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="form.remark" />
            </el-form-item>
            <!-- <el-form-item label="状态">
              <el-input v-model="form.status"></el-input>
            </el-form-item> -->
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
        </div>
      </template>
    </SplitPane>
  </div>
</template>

<script>
import {
  getTree,
  getDeptById,
  saveDept,
  updateDept,
  deleteDict
} from 'api/uac/dept'
export default {
  name: 'Depart',
  data() {
    return {
      filterText: '',
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      dialogUserVisible: false,
      dialogUserName: '关联用户',
      dialogAuthorityVisible: false,
      dialogAuthorityName: '关联资源',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      labelPosition: 'right',
      form: {
        code: null,
        name: null,
        remark: null,
        id: null,
        parentId: null,
        status: '0'
      },
      currentId: null
    }
  },
  watch: {
    filterText(val) {
      this.$refs.groupTree.filter(val)
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.treeData = await getTree()
    },
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    getNodeData({ id }) {
      if (!this.formEdit) {
        this.formStatus = 'update'
      }
      getDeptById({ id }).then(data => {
        this.form = data
      })
      this.currentId = id
    },
    handlerEdit() {
      if (this.form.id) {
        this.formEdit = false
        this.formStatus = 'update'
      }
    },
    handlerAdd(root) {
      this.resetForm(root)
      this.formEdit = false
      this.formStatus = 'create'
    },
    handleDelete() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteDict({ id: this.currentId })
        this.getList()
        this.resetForm()
        this.onCancel()
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    async update() {
      await updateDept(this.form)
      this.getList()
      this.$message({
        message: '创建成功',
        type: 'success',
        duration: 2000
      })
    },
    async create() {
      await saveDept(this.form)
      this.getList()
      this.$message({
        message: '创建成功',
        type: 'success',
        duration: 2000
      })
    },
    onCancel() {
      this.formEdit = true
      this.formStatus = ''
    },
    resetForm(root = false) {
      this.form = {
        parentId: root ? null : this.currentId,
        code: null,
        name: null,
        remark: null,
        id: null,
        status: '0'
      }
    },
    handlerUser() {
      this.dialogUserVisible = true
      if (this.$refs.groupUser !== undefined) {
        this.$refs.groupUser.groupId = this.currentId
        this.$refs.groupUser.initUsers()
      }
    },
    handlerAuthority() {
      this.dialogAuthorityVisible = true
      if (this.$refs.groupAuthority !== undefined) {
        this.$refs.groupAuthority.groupId = this.currentId
        this.$refs.groupAuthority.initAuthoritys()
      }
    },
    closeUserDialog() {
      this.dialogUserVisible = false
    },
    closeAuthorityDialog() {
      this.dialogAuthorityVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.dept-container {
  height: 500px;
}
</style>
