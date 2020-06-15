<template>
  <div>
    <div class="filter-container">
      <el-input
        v-model="listQuery.crtName"
        style="width: 200px;"
        class="filter-item"
        placeholder="操作人姓名"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="search"
        @click="handleFilter"
      >搜索</el-button>
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
        label="id"
        width="65"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        label="菜单"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.menu }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        label="操作"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.opt }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        label="资源路径"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.uri }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        label="操作人"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.crtName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        label="操作主机"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.crtHost }}</span>
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
        :page-size="listQuery.limit"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { page } from 'api/uac/gateLog/index'
export default {
  name: 'GateLog',
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        crtName: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0
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
    }
  }
}
</script>
