import _ from 'lodash'

export default {
  provide() {
    return {
      data: this.data || {},
      pagination: this.pagination
    }
  },
  data() {
    return {
      data: [],
      selections: [],
      currentRow: null,
      pagination: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      }
    }
  },
  computed: {
    hasCurrentRow() {
      return !!this.currentRow
    },
    hasSelections() {
      return !_.isEmpty(this.selections)
    }
  },
  methods: {
    onSelect(selection, row) {
      this.currentRow = row
    },
    onCurrentChange(row) {
      this.currentRow = row
    },
    onSelectionChange(rows) {
      this.selections = rows
    },
    // eslint-disable-next-line no-unused-vars
    onGotPageData({ content, totalElements, size, number }) {
      this.data = content
      this.pagination.currentPage = number + 1
      // this.pagination.pageSize = size
      this.pagination.total = totalElements
    },
    onPageChanged({ currentPage, pageSize }) {
      this.pagination.currentPage = currentPage
      this.pagination.pageSize = pageSize
      if (this.getData) {
        this.getData()
      }
    },
    addPageInfo(params = {}) {
      Object.assign(params, {
        size: this.pagination.pageSize,
        page: this.pagination.currentPage - 1
      })
      return params
    }
  }
}
