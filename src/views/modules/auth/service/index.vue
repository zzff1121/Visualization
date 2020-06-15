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
        class="filter-item"
        type="primary"
        icon="search"
        @click="handleFilter"
      >搜索</el-button>
      <el-button
        v-if="serviceManager_btn_add"
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="edit"
        @click="handleCreate"
      >添加</el-button>
      <el-button
        class="filter-item"
        type="primary"
        :disabled="currentId==-1"
        @click="handlerClient"
      >授权服务</el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading.body="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @current-change="handleDataCurrentChange"
    >
      <el-table-column
        label="id"
        width="65"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        label="服务编码"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        label="服务密钥"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.secret }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        label="服务名"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column width="200px" label="是否锁定">
      <template slot-scope="scope">
        <span>{{scope.row.locked}}</span>
      </template>
      </el-table-column>-->
      <el-table-column
        width="200px"
        label="描述"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        label="创建时间"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.crtTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        label="创建人"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.crtUser }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        label="创建人姓名"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.crtName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        label="创建主机"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.crtHost }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        label="更新时间"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.updTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        label="更新人"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.updUser }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        label="更新姓名"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.updName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        label="更新主机"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.updHost }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            v-if="serviceManager_btn_edit"
            size="small"
            type="success"
            @click="handleUpdate(scope.row)"
          >编辑</el-button>
          <el-button
            v-if="serviceManager_btn_del"
            size="small"
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
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item
          label="服务编码"
          prop="code"
        >
          <el-input
            v-model="form.code"
            placeholder="请输入服务编码"
          />
        </el-form-item>
        <el-form-item
          label="服务密钥"
          prop="secret"
        >
          <el-input
            v-model="form.secret"
            placeholder="请输入服务密钥"
          />
        </el-form-item>
        <el-form-item
          label="服务名"
          prop="name"
        >
          <el-input
            v-model="form.name"
            placeholder="请输入服务名"
          />
        </el-form-item>
        <!-- <el-form-item label="是否锁定" prop="locked">
      <el-input v-model="form.locked" placeholder="请输入是否锁定"></el-input>
        </el-form-item>-->
        <el-form-item
          label="描述"
          prop="description"
        >
          <el-input
            v-model="form.description"
            placeholder="请输入描述"
          />
        </el-form-item>
      </el-form>
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
    <el-dialog
      :title="dialogClientName"
      :visible.sync="dialogClientVisible"
      :close-on-click-modal="false"
    >
      <service-client
        ref="serviceClient"
        @closeClientDialog="closeClientDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
import { page, addObj, getObj, delObj, putObj } from 'api/auth/service/index'
export default {
  name: 'Client',
  components: {
    'service-client': () => import('./client')
  },
  data() {
    return {
      form: {
        code: undefined,
        secret: undefined,
        name: undefined,
        description: undefined
      },
      rules: {
        code: [
          {
            required: true,
            message: '请输入服务编码',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 64,
            message: '长度在 2 到 64 个字符',
            trigger: 'blur'
          }
        ],
        secret: [
          {
            required: true,
            message: '请输入服务密钥',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 64,
            message: '长度在 2 到 64 个字符',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入服务名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 64,
            message: '长度在 2 到 64 个字符',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: '请输入描述',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 64,
            message: '长度在 2 到 64 个字符',
            trigger: 'blur'
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined
      },
      dialogFormVisible: false,
      dialogClientName: '授权服务',
      dialogClientVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0,
      currentId: -1
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
    handleDataCurrentChange(val) {
      this.currentId = val.id
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      getObj(row.id).then(data => {
        this.form = data
        this.dialogFormVisible = true
        this.dialogStatus = 'update'
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
    handlerClient() {
      this.dialogClientVisible = true
      this.$nextTick(() => {
        this.$refs.serviceClient.init(this.currentId)
      })
    },
    closeClientDialog() {
      this.dialogClientVisible = false
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
      const set = this.$refs
      set[formName].resetFields()
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
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
    }
  }
}
</script>
