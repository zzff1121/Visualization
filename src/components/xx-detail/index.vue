<template>
  <div class="xx-detail">
    <span
      v-if="title"
      class="title"
    >{{ title }}</span>
    <el-row
      v-for="(row,rowIndex) in dataGrid"
      :key="rowIndex"
      class="row"
    >
      <el-col
        v-for="(col,colIndex) in row"
        :key="colIndex"
        class="col"
        :lg="24/maxCol"
        :md="12"
        :sm="24"
      >
        <div class="item">
          <div class="name">{{ col.name }}:</div>
          <div class="value">
            <!-- <el-input disabled :value="col.value"></el-input> -->
            {{ col.value }}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'XxDetail',
  props: {
    title: {
      type: String,
      default: ''
    },
    maxCol: {
      type: Number,
      default: 3
    },
    nullValue: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    props: {
      type: Object,
      default() {
        return {}
      }
    },
    auditing: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    dataGrid() {
      if (!this.data) {
        return []
      }
      const dataGrid = []
      let row = 0
      let col = 0

      const props = Object.assign({}, this.props)
      if (this.auditing) {
        Object.assign(props, {
          createdDate: '创建时间',
          createdBy: '创建人',
          lastModifiedDate: '修改时间',
          lastModifiedBy: '修改人'
        })
      }

      for (const key in props) {
        if (key === 'bom.type') {
          console.log(key)
        }
        if (col >= this.maxCol) {
          col = 0
          ++row
        }
        if (!dataGrid[row]) {
          dataGrid[row] = []
        }
        const nameObj = props[key]
        let value = _.at(this.data, key)[0]
        let name = nameObj
        if (_.isObject(nameObj)) {
          name = nameObj.name
          if (nameObj.formatter) {
            value = nameObj.formatter(null, null, value)
          }
        }
        dataGrid[row][col++] = {
          key,
          name,
          value: value || this.nullValue
        }
      }
      return dataGrid
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.xx-detail {
  .title {
    font-weight: bold;
  }
  .row {
    &:hover {
      background-color: #ecf5ff !important;
    }
    &:nth-child(even) {
      background-color: #fafafa;
    }
    &:first-child {
      border-top: 1px solid #ebeef5;
    }
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    margin: 0;
    .col {
      box-sizing: border-box;
      .item {
        padding: 10px 4px;
        .name {
          display: table-cell;
          white-space: nowrap;
          padding-right: 8px;
        }
        .value {
          display: table-cell;
          width: 100%;
          .el-input .el-input__inner {
            border: none;
            border-radius: 0;
            // border-bottom: solid 1px #c0c4cc;
            background: none;
            color: #606266;
            cursor: auto;
            &:hover {
              border-color: #c0c4cc;
            }
          }
        }
      }
    }
  }
}
</style>
