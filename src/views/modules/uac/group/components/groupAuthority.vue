<template>
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
            <br>
            <el-input
              v-model="filterText"
              placeholder="输入关键字进行过滤"
            />
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
            @node-click="getNodeData"
          />
        </div>
      </template>
      <template slot="paneR">
        <div class="right">
          <el-table
            ref="elementTable"
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%"
            @select="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              width="200px"
              label="资源编码"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="200px"
              label="资源类型"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="200px"
              label="资源名称"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="200px"
              label="资源地址"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.uri }}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="200px"
              label="资源请求类型"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.method }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </SplitPane>
  </div>
</template>
<script>
import { fetchTree } from 'api/uac/menu'
import { page } from 'api/uac/element/index'
import {
  removeElementAuthority,
  addElementAuthority,
  getElementAuthority,
  modifyMenuAuthority,
  getMenuAuthority
} from 'api/uac/group/index'
export default {
  name: 'Menu',
  props: {
    groupId: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      filterText: '',
      list: null,
      total: null,
      listQuery: {
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
      //   currentId: -1
    }
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchTree(this.listQuery).then(data => {
        this.treeData = data
        this.initAuthoritys()
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getNodeData(data) {
      this.listQuery.menuId = data.id
      page(this.listQuery).then(data => {
        this.list = data.rows
        getElementAuthority(this.groupId).then(data => {
          const obj = {}
          for (let i = 0; i < this.list.length; i++) {
            obj[this.list[i].id] = this.list[i]
          }
          const toggle = {}
          for (let i = 0; i < data.length; i++) {
            const id = data[i]
            if (obj[id] !== undefined && toggle[id] === undefined) {
              this.$refs.elementTable.toggleRowSelection(obj[data[i]])
              toggle[id] = true
            }
          }
        })
      })
      this.currentId = data.id
      this.showElement = true
    },
    getTreeNodeKey(node) {
      return node.id
    },
    handleSelectionChange(val, row) {
      let flag = true
      for (let i = 0; i < val.length; i++) {
        if (val[i].id === row.id) {
          addElementAuthority(this.groupId, {
            menuId: this.currentId,
            elementId: row.id
          })
          flag = false
          break
        }
      }
      if (flag) {
        removeElementAuthority(this.groupId, {
          menuId: this.currentId,
          elementId: row.id
        })
      }
    },
    update() {
      this.$emit('closeAuthorityDialog')
      const nodes = this.$refs.menuTree.getCheckedNodes()
      const ids = []
      for (let i = 0; i < nodes.length; i++) {
        ids.push(nodes[i].id)
      }
      modifyMenuAuthority(this.groupId, {
        menuTrees: ids.join()
      }).then(() => {
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    initAuthoritys() {
      getMenuAuthority(this.groupId).then(data => {
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
