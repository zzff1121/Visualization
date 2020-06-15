export default {
  name: 'remote-js',
  render(c) {
    return c('div', '')
  },
  data() {
    return {
      success: false
    }
  },
  inject: {
    group: {
      default: null
    }
  },
  props: {
    src: {
      type: String,
      required: true
    }
  },
  methods: {
    loadjs() {
      const domScript = document.createElement('script')
      domScript.src = this.src
      domScript.onload = () => {
        this.success = true
        this.$emit('loaded')
      }
      document.getElementsByTagName('head')[0].appendChild(domScript)
    },
    async loadjsAsync() {
      // console.log('loadjsAsync:' + this.src)
      return new Promise((resolve, reject) => {
        const domScript = document.createElement('script')
        domScript.src = this.src
        domScript.onload = () => {
          // console.log('loadjsAsync success:' + this.src)
          this.success = true
          resolve(true)
        }
        domScript.onerror = () => {
          console.error('loadjsAsync error:' + this.src)
          this.success = false
          reject(false)
        }
        document.getElementsByTagName('head')[0].appendChild(domScript)
      })
    }
  },
  mounted() {
    if (this.group) {
      this.group.addJs(this)
    }
  }
}
