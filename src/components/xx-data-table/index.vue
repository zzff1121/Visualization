<template>
  <div>
    <!-- 顶部自定义内容 -->
    <slot name="topSlot" />
    <!-- 搜索框 -->
    <div v-if="enableSearch === true">
      <div style="float:left">
        <XxForm
          ref="_form"
          :forms="searchForm"
          :inline="true"
          :label="false"
        >
          <template
            slot="formSlot"
            slot-scope="props"
          >
            <!-- 自定义搜索框 -->
            <slot
              name="searchFormSlot"
              :params="props.params"
            />
            <!-- 查询-重置按钮 -->
            <el-form-item>
              <el-button-group>
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="search"
                >查询</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  @click="reset"
                >重置</el-button>
              </el-button-group>
            </el-form-item>
          </template>
        </XxForm>
      </div>
    </div>
    <div style="clear:both" />
    <!-- 中部自定义内容 -->
    <slot name="midSlot" />
    <!-- 表格头上按钮组 -->
    <XxButton
      v-if="buttons"
      :buttons="buttons"
    />
    <XxButtonGroup
      v-if="buttonGroups"
      :groups="buttonGroups"
    />
    <br>
    <!-- 表格 onSelect @select="selectOne" @select-all="selectAll"-->
    <el-table
      ref="_table"
      v-loading="loading"
      :data="tableData"
      row-key="id"
      highlight-current-row
      stripe
      border
      :max-height="maxheight"
      :height="height"
      @select="onSelect"
      @current-change="onCurrentChange"
      @selection-change="onSelectionChange"
      @row-dblclick="rowDblclick"
    >
      <!-- 复选框 -->
      <el-table-column
        v-if="selection === true"
        type="selection"
        fixed
        reserve-selection
      />
      <!-- 单选框 -->
      <el-table-column
        v-if="selection === false"
        width="50px;"
        fixed
        align="center"
      >
        <template slot-scope="scope">
          <el-radio
            v-model="curSelect"
            class="radio"
            :label="scope.row"
          >&nbsp;</el-radio>
        </template>
      </el-table-column>
      <!-- 游标 -->
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
          :fixed="column.fixed"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :formatter="column.formatter"
          :sortable="column.sortable"
        >
          <template slot-scope="scope">
            <el-link
              v-if="column.click"
              type="primary"
              @click="column.click(scope.row,scope.column,scope.cell,scope.event)"
            >{{ scope.row[column.prop] }}</el-link>
          </template>
        </el-table-column>
        <!-- 带有操作列的渲染 -->
        <el-table-column
          v-else-if="column.opts"
          :key="i"
          :fixed="column.fixed"
          :label="column.label"
          :width="column.width"
        >
          <template slot-scope="scope">
            <el-button
              v-for="(opt,j) in column.opts"
              v-show="opt.condition?opt.condition(scope.row):true"
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
          :fixed="column.fixed"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :formatter="column.formatter"
          :sortable="column.sortable"
        />
      </template>
    </el-table>
    <XxPagination @pageChanged="onPageChanged" />
  </div>
</template>
<script>
import selectionTableMixin from '@/views/common/mixins/SelectionTableMixin'
import PageMixins from '@/views/common/mixins/PageMixins'
import request from '@/utils/request'
export default {
  name: 'XxDataTable',
  mixins: [selectionTableMixin, PageMixins],
  props: {
    selection: {
      type: Boolean,
      default: false
    },
    index: { type: Boolean, default: false },
    height: { type: Number, default: null },
    maxheight: { type: Number, default: null },
    size: { type: String, default: 'mini' },
    buttons: {
      type: Array,
      default: () => []
    },
    buttonGroups: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    url: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: 'GET'
    },
    params: {
      type: Object,
      default: () => {}
    },
    enableSearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: true,
      tableData: null,
      curColumns: this.columns,
      selectIds: new Set(),
      selectRows: new Map(), // k:id,value:row
      curSelect: null,
      searchForm: []
    }
  },
  watch: {
    columns: {
      deep: true,
      handler(newVal) {
        if (newVal) {
          this.columns = newVal
        }
      }
    },
    buttons: {
      deep: true,
      handler(newVal) {
        if (newVal) {
          this.buttons = newVal
        }
      }
    },
    buttonGroups: {
      deep: true,
      handler(newVal) {
        if (newVal) {
          this.buttonGroups = newVal
        }
      }
    },
    params: {
      deep: true,
      handler(newVal) {
        this.getData(newVal)
      }
    }
  },
  mounted() {
    this.buildSearchForm()
    this.getData()
  },
  methods: {
    async getData(params = {}) {
      let formParams = {}
      if (this.enableSearch) {
        formParams = this.$refs._form.getValue()
      }
      params = Object.assign(params, this.params, formParams)
      const data = await request({
        url: this.url,
        method: this.method,
        params: this.addPageInfo(params)
      })
      this.loading = false
      this.tableData = data.content
      this.onGotPageData(data)
    },
    search(params = {}) {
      this.getData(params)
      this.clearCurSelect()
    },
    refresh(params = {}) {
      this.search(params)
      this.clearAll()
    },
    reset() {
      this.$refs._form.reset()
    },
    getSelectIds() {
      return this.selections.map(s => s.id)
    },
    getCurSelect() {
      return this.currentRow
    },
    getSelectRows() {
      return this.selections
    },
    // 清空所选id
    clearSelectIds() {
      this.selections = []
    },
    // 选框置空
    clearSelection() {
      this.$refs._table.clearSelection()
      this.selections = []
    },
    // 清空当前所选
    clearCurSelect() {
      this.currentRow = null
    },
    // 清空以上所有
    clearAll() {
      this.clearSelectIds()
      this.clearSelection()
      this.clearCurSelect()
    },
    clearData() {
      this.tableData = []
    },
    // onSelect(row) {
    //   // 单选
    //   if (this.selection === false) {
    //     this.curSelect = row
    //   }
    // },
    // selectOne(selection, row) {
    //   if (this.selectIds.has(row.id)) {
    //     // 取消选中
    //     this.numSub(row)
    //   } else if (this.selectIds.has(row.id) === false) {
    //     // 选中
    //     this.numAdd(row)
    //   }
    // },
    // // 全选操作
    // selectAll(selection) {
    //   if (selection.length === 0) {
    //     // 取消勾选
    //     this.tableData.filter(row => this.numSub(row))
    //   } else if (selection.length > 0) {
    //     // 全选
    //     selection.filter(row => this.numAdd(row))
    //   }
    // },
    // numAdd(row) {
    //   this.selectIds.add(row.id)
    //   this.selectRows.set(row.id, row)
    //   this.curSelect = row // 设置当前选中的一条数据
    // },
    // numSub(row) {
    //   this.selectIds.delete(row.id)
    //   this.selectRows.delete(row.id)
    // },
    // 单条数据操作-判断选中的是否是一条
    judgeSelectOne(msg = '请选中一条数据进行操作！') {
      if (this.getSelectIds().size > 1 || this.getSelectIds().size === 0) {
        this.$message({
          message: msg,
          type: 'warning'
        })
        return false
      }
      return true
    },
    // 多条数据操作-判断选中是否有数据
    judgeSelect(msg = '请选中至少一条数据进行操作！') {
      if (this.getSelectIds().size === 0) {
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
    // 自定义单元格点击事件
    cellClick(funName, row, column, cell, event) {
      this.$emit(funName, row, column, cell, event)
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
      }
    }
  }
}
</script>
