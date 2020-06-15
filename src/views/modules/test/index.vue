<template>
  <ax-page>
    <template v-slot:query>
      <el-form
        ref="queryForm"
        :inline="true"
        :model="queryForm"
      >
        <el-form-item prop="title">
          <el-input
            v-model="queryForm.title"
            placeholder="标题"
          />
        </el-form-item>
        <el-form-item label="">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="onQuery"
          >搜索</el-button>
          <el-button
            type="default"
            icon="el-icon-refresh"
            @click="$refs.queryForm.resetFields()"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:actions>
      <el-button
        type="primary"
        icon="el-icon-plus"
      >新增</el-button>
      <el-button
        type="primary"
        icon="el-icon-upload2"
        @click="onImport"
      >导入</el-button>
      <el-button
        type="primary"
        icon="el-icon-download"
        @click="onExport"
      >导出</el-button>
      <el-dropdown
        v-if="showMutiOperation"
        trigger="click"
        @command="onCommand"
      >
        <el-button>
          批量操作<i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="deleteBatch">删除</el-dropdown-item>
          <el-dropdown-item command="lockBatch">冻结</el-dropdown-item>
          <el-dropdown-item command="unlockBatch">解冻</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <XxDialog
        ref="fileUploadDialog"
        title="文件上传"
        width="500px"
      >
        <upload-excel-component
          :on-success="onUploadSuccess"
          :before-upload="beforeUpload"
        />
      </XxDialog>
    </template>
    <template v-slot:data>
      <el-table
        v-loading="loading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        :data="data"
        border
        fit
        highlight-current-row
        @selection-change="onSelectionChange"
        @current-change="onCurrentChange"
      >

        <el-table-column
          type="selection"
          fixed="left"
          label=""
        />
        <el-table-column
          label="ID"
          width="80"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          label="日期"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="120px"
          label="作者"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="100px"
          label="星级"
        >
          <template slot-scope="scope">
            <svg-icon
              v-for="n in +scope.row.importance"
              :key="n"
              icon-class="star"
              class="meta-item__icon"
            />
          </template>
        </el-table-column>

        <el-table-column
          class-name="status-col"
          label="状态"
          width="110"
        >
          <template slot-scope="{row}">
            <el-tag :type="row.status">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          min-width="300px"
          label="标题"
        >
          <template slot-scope="{row}">
            <el-link type="primary">{{ row.title }}</el-link>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          width="200"
        >
          <template slot-scope="{row}">
            <el-button type="text">编辑</el-button>
            <el-button type="text">重置密码</el-button>
            <el-dropdown
              trigger="click"
              @command="onCommand"
            >
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="delete">删除</el-dropdown-item>
                <el-dropdown-item command="lock">冻结</el-dropdown-item>
                <el-dropdown-item>{{ row.name }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="pagination.page"
        :page-sizes="pagination.pageSizeOptions"
        :page-size="pagination.size"
        :total="pagination.total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSizeChange"
        @current-change="onCurrentPageChange"
      />
    </template>
  </ax-page>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import AxPage from '@/components/AxPage'
import { getAction, deleteAction } from '@/api/actions'
import _ from 'lodash'
import { parseTime, titleCase } from '@/utils'

export default {
  name: 'AxPageTest',
  components: {
    AxPage,
    UploadExcelComponent
  },
  data() {
    return {
      // 当前行
      currentRow: null,
      // 已选择行
      selections: [],
      showLoading: true,
      loading: false,
      // 查询表单
      queryForm: {
        title: null
      },
      // 数据
      data: [],
      // 分页参数
      pagination: {
        page: 1,
        size: 10,
        pageSizeOptions: ['10', '20', '50', '100'],
        total: 0
      },
      // 排序参数
      sorter: {
        column: 'createTime',
        order: 'desc'
      },
      urls: {
        query: '/mock/article/list',
        create: '',
        modity: '',
        delete: '/mock/article/:id',
        deleteBatch: '/mock/article/deletes',
        export: '',
        import: ''
      }
    }
  },
  computed: {
    showMutiOperation() {
      return !_.isEmpty(this.selections)
    }
  },
  mounted() {
    this.loadData(true)
  },
  methods: {
    onSelectionChange(selections) {
      this.selections = selections
    },
    onCurrentChange(currentRow) {
      this.currentRow = currentRow
    },
    checkUrl(urlName) {
      if (!this.urls[urlName]) {
        const message = `请设置url.${urlName}属性!`
        this.$message.error(message)
        throw new Error(message)
      }
    },
    loadData(firstPage = false) {
      this.loading = true
      if (firstPage) {
        this.pagination.page = 1
      }
      const params = Object.assign({}, this.queryForm)
      params.page = this.pagination.page
      params.limit = this.pagination.size
      getAction(this.urls.query, params)
        .then(({ total, items }) => {
          this.pagination.total = total
          this.data = items
        })
        .finally(() => {
          this.loading = false
        })
    },
    onQuery() {
      this.checkUrl('query')
      this.loadData(true)
    },
    onCreate() {},
    onModity() {},
    onCommand(command) {
      const functionName = `on${titleCase(command)}`
      if (_.isFunction(this[functionName])) {
        _.invoke(this, functionName)
      } else {
        this.$message.error(
          `指令[${command}]对应的函数[${functionName}]不存在！`
        )
      }
    },
    async onDelete() {
      this.checkUrl('delete')
      await this.$confirm('确定删除该条数据吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      const { id } = this.currentRow
      await deleteAction(this.urls.delete, { id })
      this.$message.success('删除成功')
      // 刷新页面
      this.loadData()
    },
    async onDeleteBatch() {
      this.checkUrl('deleteBatch')
      await this.$confirm('确定删除选择条目吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      const ids = this.selections.map(i => i.id).join(',')
      await deleteAction(this.urls.deleteBatch, { ids })
      this.$message.success('删除成功')
      // 刷新页面
      this.loadData()
    },
    formatJson(filterFileds, dataList) {
      return dataList.map(data =>
        filterFileds.map(field => {
          if (field === 'timestamp') {
            return parseTime(data[field])
          } else {
            return data[field]
          }
        })
      )
    },
    onExport() {
      const tHeader = ['Id', '姓名', '账户', '性别', '手机号', '更新时间']
      const filterFileds = [
        'id',
        'name',
        'username',
        'sex',
        'mobilePhone',
        'updTime'
      ]
      const data = this.formatJson(filterFileds, this.data)
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: data,
          filename: 'excel-list',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    beforeUpload({ size }) {
      const isLt1M = size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    onUploadSuccess({ results, header }) {
      console.log(results)
      console.log(header)
    },
    onImport() {
      this.$refs.fileUploadDialog.show()
    },
    onSizeChange(val) {
      // 页面由小变大，最大页数可能会小于当前页，因此需呀调整当前页号
      const maxPage = parseInt(this.pagination.total / val) + 1
      if (maxPage < this.pagination.page) {
        this.pagination.size = maxPage
      }
      this.pagination.size = val
      this.loadData(false)
    },
    onCurrentPageChange(val) {
      this.pagination.page = val
      this.loadData(false)
    }
  }
}
</script>

<style>
</style>
