<template>
  <div>
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        style="width: 200px;"
        class="filter-item"
        placeholder="姓名或账户"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-has-auth="'gateLogManager:view'"
        class="filter-item"
        type="primary"
        icon="search"
        @click="handleFilter"
      >搜索</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="edit"
        @click="handleCreate"
      >添加</el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading.body="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        width="65"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        label="姓名"
        prop="name"
      />
      <el-table-column
        width="110"
        label="账户"
        prop="username"
      />
      <el-table-column
        width="110"
        label="性别"
        prop="sex"
      />
      <el-table-column
        width="110"
        label="手机号"
        prop="mobilePhone"
      />
      <el-table-column
        width="110"
        label="工作电话"
        prop="telPhone"
      />
      <el-table-column
        width="190"
        label="邮箱"
        prop="email"
      />
      <el-table-column
        width="180"
        label="生日"
        prop="birthday"
      />
      <el-table-column
        width="180"
        label="更新时间"
        prop="updTime"
      />
      <el-table-column
        width="200"
        label="更新人"
        prop="updName"
      />
      <el-table-column
        fixed="right"
        align="center"
        label="操作"
        width="290"
      >
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="handleUpdate(scope.row)"
          >编辑</el-button>
          <el-button
            type="primary"
            @click="handleResetPassword(scope.row)"
          >重置密码</el-button>
          <el-button
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <div class="group-auth manager-pane">
        <SplitPane
          class="split-pane"
          :min-percent="20"
          :default-percent="30"
          split="vertical"
        >
          <template slot="paneL">
            <div class="left">
              <div class="opt">
                <el-button
                  type="primary"
                  @click="update"
                >保存</el-button>
                <br>
                <th>部门分配</th>
                <br>
                <!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input> -->
                <br>
                <br>
              </div>
              <el-tree
                ref="menuTree"
                class="filter-tree tree"
                check-strictly
                node-key="id"
                :data="treeData"
                show-checkbox
                highlight-current
                :props="defaultProps"
                :filter-node-method="filterNode"
                default-expand-all
              />
            </div>
          </template>
          <template slot="paneR">
            <div class="right">
              <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-width="100px"
              >
                <el-form-item
                  label="姓名"
                  prop="name"
                >
                  <el-input
                    v-model="form.name"
                    placeholder="请输入姓名"
                  />
                </el-form-item>
                <el-form-item
                  label="账户"
                  prop="username"
                >
                  <el-input
                    v-if="dialogStatus == 'create'"
                    v-model="form.username"
                    placeholder="请输入账户"
                  />
                  <el-input
                    v-else
                    v-model="form.username"
                    placeholder="请输入账户"
                    readonly
                  />
                </el-form-item>
                <el-form-item
                  v-if="dialogStatus == 'create'"
                  label="密码"
                  placeholder="请输入密码"
                  prop="password"
                >
                  <el-input
                    v-model="form.password"
                    type="password"
                  />
                </el-form-item>
                <el-form-item label="性别">
                  <el-select
                    v-model="form.sex"
                    class="filter-item"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in sexOptions"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="生日"
                  prop="birthday"
                >
                  <el-date-picker v-model="form.birthday" />
                </el-form-item>
                <el-form-item
                  label="手机号"
                  prop="mobilePhone"
                >
                  <el-input
                    v-model="form.mobilePhone"
                    placeholder
                  />
                </el-form-item>
                <el-form-item
                  label="工作电话"
                  prop="telPhone"
                >
                  <el-input
                    v-model="form.telPhone"
                    placeholder
                  />
                </el-form-item>
                <el-form-item
                  label="邮箱"
                  prop="email"
                >
                  <el-input
                    v-model="form.email"
                    type="email"
                    placeholder
                  />
                </el-form-item>
                <el-form-item
                  v-if="!operation"
                  label="角色"
                  prop="userRoles"
                >
                  <el-select
                    v-model="form.userRoles"
                    multiple
                    filterable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in roles"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="地址"
                  prop="address"
                >
                  <el-input
                    v-model="form.address"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 3}"
                    placeholder="请输入地址"
                  />
                </el-form-item>
                <el-form-item
                  label="备注"
                  prop="description"
                >
                  <el-input
                    v-model="form.description"
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 5}"
                    placeholder="请输入备注"
                  />
                </el-form-item>
                <div class="block" />
              </el-form>
            </div>
          </template>
        </SplitPane>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="create('form')"
        >确 定</el-button>
        <el-button
          v-else
          type="primary"
          @click="update('form')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  page,
  addObj,
  getObj,
  delObj,
  putObj,
  resetPassword,
  fetchTree,
  getDeparts
} from 'api/uac/user'
import { findAll, getRoles } from '@/api/uac/group/index'
export default {
  name: 'User',
  data() {
    return {
      form: {
        username: null,
        name: null,
        sex: '男',
        password: null,
        birthday: null,
        mobilePhone: null,
        telPhone: null,
        email: null,
        type: null,
        address: null,
        description: null,
        userRoles: [],
        departs: []
      },
      roles: [],
      deptData: [],
      deptTreeProps: { multiple: true, checkStrictly: true },
      rules: {
        name: [
          {
            required: true,
            message: '请输入用户',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            message: '请输入账户',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur'
          }
        ],
        mobilePhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1(3\d|47|5((?!4)\d)|7(0|1|[6-8])|8\d)\d{8,8}$/,
            required: true,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            required: true,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }]
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined
      },
      sexOptions: ['男', '女'],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      operation: false, // true:新增, false:编辑
      tableKey: 0,
      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      groupManager_menu: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      page(this.listQuery).then(data => {
        this.list = data.rows
        this.total = data.total
        this.listLoading = false
        this.findUserRoles()
      })
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.operation = true
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      getObj(row.id).then(data => {
        this.form = data
        this.dialogFormVisible = true
        this.dialogStatus = 'update'
      })
      getRoles(row.id).then(data => {
        this.operation = false
        const userRoles = []
        for (let i = 0, len = data.length; i < len; i++) {
          userRoles.push(data[i].id)
        }
        this.form.userRoles = userRoles
      })
      fetchTree().then(data => {
        this.treeData = data
        // this.initAuthoritys()
      })
      this.initDeparts(row.id)
    },
    async handleResetPassword({ id: userId }) {
      let newPassword
      try {
        const { value } = await this.$prompt('请输新密码', '重置密码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\w{5,20}$/,
          inputType: 'password',
          inputErrorMessage: '密码应为长度位5~20的数字、字母及符合的组合',
          inputPlaceholder: '请输入5~20位新密码，可以是数字、字母及符合的组合',
          closeOnClickModal: false
        })
        newPassword = value
      } catch (error) {
        return
      }
      await resetPassword({ newPassword, userId, oldPassword: 'blank' })
      this.$message({
        message: '密码重置成功',
        type: 'success'
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(row.id).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        })
      })
    },
    create(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    cancel(formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          const nodes = this.$refs.menuTree.getCheckedNodes()
          const ids = []
          for (let i = 0; i < nodes.length; i++) {
            ids.push(nodes[i].id)
          }
          this.form.departs = ids.join()
          this.dialogFormVisible = false
          this.form.password = undefined
          putObj(this.form.id, this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    resetTemp() {
      this.form = {
        username: undefined,
        name: undefined,
        sex: '男',
        password: undefined,
        description: undefined
      }
    },
    // 加载用户角色信息
    findUserRoles: function() {
      findAll().then(res => {
        // 加载角色集合
        this.roles = res
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    initDeparts(id) {
      getDeparts(id).then(data => {
        const result = []
        for (let i = 0; i < data.length; i++) {
          result.push(data[i].id)
        }
        this.$refs.menuTree.setCheckedKeys(result)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.group-auth {
  height: 500px;

  .left {
    display: flex;
    flex-direction: column;
    .opt {
      flex: 0 0 auto;
    }
    .tree {
      flex: 1;
      overflow: auto;
    }
  }
}
</style>
