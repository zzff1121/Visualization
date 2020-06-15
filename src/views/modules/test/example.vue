<template>
  <div class="ax-page">
    <div class="query">
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
    </div>
    <div class="actions">
      <el-button
        type="primary"
        icon="el-icon-upload2"
      >导入</el-button>
      <el-button
        type="primary"
        icon="el-icon-download"
      >导出</el-button>
      <el-dropdown
        v-if="showMutiOperation"
        trigger="click"
      >
        <el-button>
          批量操作<i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>删除</el-dropdown-item>
          <el-dropdown-item>冻结</el-dropdown-item>
          <el-dropdown-item>解冻</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="data">
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
          width="150"
        >
          <template slot-scope="{row}">
            <el-button
              type="text"
              @click="onEdit(row.id)"
            >编辑</el-button>
            <el-button
              type="text"
              @click="onDelete(row.id)"
            >删除</el-button>
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
    </div>

    <XxDialog
      ref="editDialog"
      title="文章编辑"
    >
      <article-detail
        ref="articleDetail"
        :is-edit="true"
      />
    </XxDialog>
  </div>
</template>

<script>
import { fetchList, deleteArticle } from '@/api/article'
import ArticleDetail from './components/ArticleDetail'
import _ from 'lodash'
export default {
  name: 'AxPageTest',
  components: {
    ArticleDetail
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
    loadData(firstPage = false) {
      this.loading = true
      if (firstPage) {
        this.pagination.page = 1
      }
      const params = Object.assign({}, this.queryForm)
      params.page = this.pagination.page
      params.limit = this.pagination.size
      fetchList(params)
        .then(({ total, items }) => {
          this.pagination.total = total
          this.data = items
        })
        .finally(() => {
          this.loading = false
        })
    },
    onQuery() {
      this.loadData(true)
    },
    onCreate() {},
    onModity() {},
    onDelete(id) {
      this.$confirm('确实删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle({ id }).then(() => {
          this.$message.success('删除成功')
          this.loadData()
        })
      })
    },
    onDeleteBacth() {},
    onExport() {},
    onImport() {},
    onSizeChange(val) {
      // 页面由小变大，最大页数可能会小于当前页，因此需呀调整当前页号
      const maxPage = parseInt(this.pagination.total / val) + 1
      if (maxPage < this.pagination.page) {
        this.pagination.page = maxPage
      }
      this.pagination.size = val
      this.loadData(false)
    },
    onCurrentPageChange(val) {
      this.pagination.page = val
      this.loadData(false)
    },
    onEdit(id) {
      this.$refs.editDialog.show()
      this.$nextTick(() => {
        if (id) {
          this.$refs.articleDetail.fetchData(id)
        } else {
          this.$refs.articleDetail.newPost()
        }
      })
    }
  }
}
</script>

<style>
</style>
