export default {
  data() {
    return {
      inited: false,
      intervalId: null
    }
  },
  watch: {
    inited(v) {
      if (v) {
        this.$emit('inited')
      }
    }
  },
  methods: {
    clearCheckInterval() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
    checkInit() {
      return new Promise((reslove, reject) => {
        if (this.inited) {
          this.clearCheckInterval()
          reslove(true)
        }
        let count = 0
        this.intervalId = setInterval(() => {
          count++
          if (this.inited) {
            this.clearCheckInterval()
            reslove(true)
          }
          if (count > 10) {
            this.clearCheckInterval()
            reject(false)
          }
        }, 500)
      })
    }
  }
}
