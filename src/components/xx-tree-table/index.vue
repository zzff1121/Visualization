<template>
  <el-table
    ref="_table"
    row-key="id"
    :data="curTableData"
    highlight-current-row
    stripe
    border
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
      type="index"
      fixed
    />
    <table-tree-column
      prop="code"
      header-align="center"
      tree-key="id"
      width="150"
      label="编码"
    />
    <el-table-column
      v-for="(column,index) in curColumns"
      :key="index"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
      :formatter="column.formatter"
      :sortable="column.sortable"
    />
  </el-table>
</template>
<script>
import selectionTableMixin from '@/views/common/mixins/SelectionTableMixin'
import TableTreeColumn from './TableTreeColumn'
export default {
  name: 'XxTreeTable',
  components: { TableTreeColumn },
  mixins: [selectionTableMixin],
  props: {
    selection: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      curColumns: this.columns,
      curTableData: this.tableData,
      selectIds: new Set(),
      curSelect: null
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
  mounted() {},
  methods: {
    getSelectIds() {
      return this.selectIds
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
    judgeSelectOne() {
      if (this.selectIds.size > 1 || this.selectIds.size === 0) {
        this.$message({
          message: '请选中一条数据进行操作！',
          type: 'warning'
        })
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
    }
  }
}
</script>
