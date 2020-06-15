<template>
  <el-pagination
    class="xx-pagination"
    :page-sizes="[10, 20, 50, 100]"
    :total="iTotal"
    :current-page="iCurrentPage"
    :page-size="iPageSize"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="onPageSizeChange"
    @current-change="onPageChange"
  />
</template>
<script>
export default {
  name: 'XxPagination',
  inject: ['pagination'],
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      iPageSize: this.pageSize,
      iCurrentPage: this.currentPage,
      iTotal: this.total
    }
  },
  watch: {
    pagination: {
      deep: true,
      handler(v) {
        if (!v) {
          return
        }
        const { pageSize, total, currentPage } = v
        this.iPageSize = pageSize
        this.iTotal = total
        this.iCurrentPage = currentPage
      }
    }
  },
  methods: {
    _emitPaginationChangeInfo() {
      const pageInfo = {
        pageSize: this.iPageSize,
        currentPage: this.iCurrentPage
      }
      this.$emit('pageChanged', pageInfo)
    },
    onPageSizeChange(pageSize) {
      const willMakePageChange = this.total / pageSize + 1 < this.iCurrentPage
      this.iPageSize = pageSize
      // 可能会造成页码改变发生，这时候不发送事件，因为可能造成事件死循环
      if (!willMakePageChange) {
        this._emitPaginationChangeInfo()
      }
    },
    onPageChange(currentPage) {
      this.iCurrentPage = currentPage
      this._emitPaginationChangeInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
.xx-pagination {
  margin: 10px 0;
}
</style>
