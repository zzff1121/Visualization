<template>
  <div>
    <div class="filter-container">
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
        label="名称"
        prop="name"
      />
      <el-table-column
        width="110"
        label="值"
        prop="value"
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
            type="danger"
            @click="handleDelete(row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      append-to-body
      :close-on-click-modal="false"
      width="500px"
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
          label="数据值"
          prop="value"
        >
          <el-input
            v-model="form.value"
            placeholder="请输入数据值"
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
        <el-form-item
          label="排序"
          prop="sortCode"
        >
          <el-input v-model="form.sortCode" />
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
  </div>
</template>

<script>
import { getList, deleteDict, saveDict } from 'api/uac/dictContent'
import DialogMixins from '@/views/common/mixins/DialogMixins'
import _ from 'lodash'

export default {
  name: 'DictContent',
  mixins: [DialogMixins],
  data() {
    return {
      form: {
        id: null,
        name: null,
        value: null,
        description: null,
        sortCode: null,
        dictionaryId: null,
        status: 1
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        value: [
          {
            required: true,
            message: '请输入数据值',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 255,
            message: '长度在 1 到 255 个字符',
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
        dictionanrId: null,
        name: null,
        status: null
      },
      dictionaryId: null,
      dialogFormVisible: false,
      dialogStatus: '',
      userManager_btn_edit: false,
      userManager_btn_del: false,
      userManager_btn_add: false,
      userManager_btn_resetpassword: false,
      textMap: {
        update: '修改',
        create: '新建'
      },
      tableKey: 0
    }
  },
  methods: {
    onData({ id }) {
      this.dictionaryId = id
      this.form.dictionaryId = id
      this.getList()
    },
    getList() {
      this.listLoading = true
      getList({
        dictionaryId: this.dictionaryId
      })
        .then(data => {
          this.list = data
        })
        .finally(() => {
          this.listLoading = false
        })
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
        value: null,
        description: null,
        sortCode: null,
        dictionaryId: this.dictionaryId,
        status: 1
      }
    }
  }
}
</script>
