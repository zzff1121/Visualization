export default {
  inject: ['parent'],
  data() {
    return {
      loading: false,
      loadingText: '数据加载中'
    }
  },
  watch: {
    'parent.data': {
      handler(v) {
        if (this.onData) {
          this.onData(v)
        }
      },
      deep: true
    }
  },
  methods: {
    close(data = null) {
      if (this.parent) {
        this.parent.close(data)
      }
    }
  }
}
