<template>
  <div>
    <div class="filter-container">
      <el-form
        :model="listQuery"
        :inline="true"
      >
        <el-form-item label="名称">
          <el-input
            v-model="listQuery.name"
            class="filter-item"
            placeholder="名称"
          />
        </el-form-item>
        <el-form-item label="编号">
          <el-input
            v-model="listQuery.code"
            class="filter-item"
            placeholder="编号"
          />
        </el-form-item>
        <el-form-item label="">

          <el-button
            class="filter-item"
            type="primary"
            icon="search"
            @click="getList"
          >搜索</el-button>
          <el-button
            class="filter-item"
            style="margin-left: 10px;"
            type="primary"
            icon="edit"
            @click="handleCreate"
          >添加</el-button>
        </el-form-item>
      </el-form>
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
        label="名称"
        prop="name"
      />
      <el-table-column
        width="110"
        label="编号"
        prop="code"
      />
      <el-table-column
        label="描述"
        prop="description"
      />
      <el-table-column
        fixed="right"
        align="center"
        label="操作"
        width="290"
      >
        <template slot-scope="{row}">
          <el-button
            type="success"
            @click="handleUpdate(row)"
          >编辑</el-button>
          <el-button
            type="primary"
            @click="handConfig(row)"
          >配置</el-button>
          <el-button
            type="danger"
            @click="handleDelete(row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.size"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item
          label="名称"
          prop="name"
        >
          <el-input
            v-model="form.name"
            placeholder="请输入名称"
          />
        </el-form-item>
        <el-form-item
          label="编码"
          prop="code"
        >
          <el-input
            v-model="form.code"
            placeholder="请输入编码"
          />
        </el-form-item>
        <el-form-item
          label="描述"
          prop="description"
        >
          <el-input
            v-model="form.description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5}"
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
    <XxDialog
      ref="XxDialog"
      title="字典配置"
      width="800px"
    >
      <dictContent />
    </XxDialog>
  </div>
</template>

<script>
import { getList, deleteDict, saveDict } from 'api/uac/dict'
import dictContent from './dictContent'
import _ from 'lodash'

export default {
  name: 'Dict',
  components: { dictContent },
  data() {
    return {
      form: {
        id: null,
        name: null,
        code: null,
        description: null
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入编码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 20,
        name: null,
        code: null
      },
      dialogFormVisible: false,
      dialogStatus: '',
      userManager_btn_edit: false,
      userManager_btn_del: false,
      userManager_btn_add: false,
      userManager_btn_resetpassword: false,
      textMap: {
        update: '编辑字典',
        create: '新建字典'
      },
      tableKey: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getList(this.listQuery)
        .then(data => {
          this.list = data.content
          this.total = data.totalElements
        })
        .finally(() => {
          this.listLoading = false
        })
    },
    handConfig(row) {
      this.$refs.XxDialog.show(row)
    },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.form = _.cloneDeep(row)
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
    },
    handleDelete({ id }) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteDict({ id })
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getList()
      })
    },
    create(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          saveDict(this.form).then(() => {
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
          this.dialogFormVisible = false
          saveDict(this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$message({
              message: '更细成功',
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
        name: null,
        code: null,
        description: null
      }
    }
  }
}
</script>
