<template>
  <div>
    <!-- 搜索框 -->
    <div v-if="enableSearch === true">
      <div style="float:left">
        <XxForm
          ref="_form"
          :forms="searchForm"
          :inline="true"
          :label="false"
        />
      </div>
      <div style="float:left">
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="search"
        >查询</el-button>
        <el-button
          type="primary"
          icon="el-icon-delete"
          @click="clear"
        >重置</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      ref="_table"
      :data="curTableData"
      row-key="id"
      highlight-current-row
      stripe
      border
      :height="height"
      @current-change="onSelect"
      @select="selectOne"
      @select-all="selectAll"
      @row-dblclick="rowDblclick"
    >
      <el-table-column
        v-if="selection === true"
        type="selection"
        fixed
        reserve-selection
      />
      <el-table-column
        v-if="index === true"
        type="index"
        fixed
      />
      <template v-for="(column,i) in curColumns">
        <!-- 带有自定义的渲染 -->
        <el-table-column
          v-if="column.click"
          :key="i"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :formatter="column.formatter"
          :sortable="column.sortable"
        >
          <template slot-scope="scope">
            <el-button
              v-if="column.click"
              type="text"
              @click="column.click(scope.row,scope.column,scope.cell,scope.event)"
            >{{ scope.row[column.prop] }}</el-button>
          </template>
        </el-table-column>
        <!-- 带有操作列的渲染 -->
        <el-table-column
          v-else-if="column.opts"
          :key="i"
          :label="column.label"
          :width="column.width"
        >
          <template slot-scope="scope">
            <el-button
              v-for="(opt,j) in column.opts"
              :key="j"
              :type="opt.type ?opt.type:'text'"
              :icon="opt.icon"
              @click="opt.func(scope.row)"
            >{{ opt.label }}</el-button>
          </template>
        </el-table-column>
        <!-- 普通文本渲染 -->
        <el-table-column
          v-else
          :key="i"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :formatter="column.formatter"
          :sortable="column.sortable"
          :fixed="column.fixed"
        />
      </template>
    </el-table>
  </div>
</template>
<script>
import selectionTableMixin from '@/views/common/mixins/SelectionTableMixin'
export default {
  name: 'XxSelectionTable',
  mixins: [selectionTableMixin],
  props: {
    selection: {
      type: Boolean,
      default: true
    },
    index: { type: Boolean, default: true },
    height: { type: Number, default: null },
    columns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    enableSearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      curColumns: this.columns,
      curTableData: this.tableData,
      selectIds: new Set(),
      curSelect: null,
      searchForm: []
    }
  },
  watch: {
    columns: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal) {
          this.columns = newVal
        }
      }
    },
    tableData: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal) {
          this.curTableData = newVal
        }
      }
    }
  },
  mounted() {
    this.buildSearchForm()
  },
  methods: {
    getSelectIds() {
      return this.selectIds
    },
    getSelectIdsArray() {
      return Array.from(this.selectIds)
    },
    getCurSelect() {
      return this.curSelect
    },
    // 清空所选id
    clearSelectIds() {
      this.selectIds = new Set()
    },
    // 选框置空
    clearSelection() {
      this.$refs._table.clearSelection()
    },
    // 清空当前所选
    clearCurSelect() {
      this.curSelect = null
    },
    // 清空以上所有
    clearAll() {
      this.clearSelectIds()
      this.clearSelection()
      this.clearCurSelect()
    },
    onSelect(row) {
      if (this.selection === false) {
        this.curSelect = row
      }
    },
    selectOne(selection, row) {
      if (this.selectIds.has(row.id)) {
        // 取消选中
        this.numSub(row)
      } else if (this.selectIds.has(row.id) === false) {
        // 选中
        this.numAdd(row)
      }
    },
    // 全选操作
    selectAll(selection) {
      if (selection.length === 0) {
        // 取消勾选
        this.tableData.filter(row => {
          this.numSub(row)
        })
      } else if (selection.length > 0) {
        // 全选
        selection.filter(row => {
          this.numAdd(row)
        })
      }
    },
    numAdd(row) {
      this.selectIds.add(row.id)
      this.curSelect = row // 设置当前选中的一条数据
    },
    numSub(row) {
      this.selectIds.delete(row.id)
    },
    // 判断选中的是否是一条
    judgeSelectOne(msg = '请选中一条数据进行操作！') {
      if (this.selectIds.size > 1 || this.selectIds.size === 0) {
        this.$message({
          message: msg,
          type: 'warning'
        })
        return false
      }
      return true
    },
    // 判断选中是否有数据
    judgeSelect(msg = '请选中至少一条数据进行操作！') {
      if (this.selectIds.size === 0) {
        this.$message.warning(msg)
        return false
      }
      return true
    },
    // 设置默认选中的ID
    setSelectedIds(defaultSelectedIds) {
      if (defaultSelectedIds && defaultSelectedIds instanceof Set) {
        this.tableData.forEach(row => {
          if (defaultSelectedIds.has(row.id)) {
            this.$refs._table.toggleRowSelection(row)
            this.selectIds.add(row.id) // 设置选中的ID
          }
        })
      } else {
        console.log('The defaultSelectedIds type must be Set')
      }
    },
    // 设置默认选中的行
    toggleSelection(rows) {
      this.tableData.forEach(data => {
        rows.forEach(row => {
          if (row.id === data.id) {
            this.$refs._table.toggleRowSelection(data)
            this.numAdd(data)
          }
        })
      })
    },
    // 双击事件
    rowDblclick(row, event) {
      this.$emit('row-dblclick', row, event)
    },
    // 构造搜索框
    buildSearchForm() {
      if (this.enableSearch === true) {
        for (const column of this.columns) {
          if (column.search) {
            // 如果标明是搜索框
            const form = {
              prop: column.prop,
              label: column.label,
              placeholder: column.label
            }
            this.searchForm.push(Object.assign({}, column.search, form))
          }
        }
        // 重新渲染一次
        this.$nextTick(() => {
          this.$refs._form.buildForm()
        })
      }
    },
    search() {
      console.log('执行查询')
    },
    clear() {
      this.$refs._form.reset()
    }
  }
}
</script>
