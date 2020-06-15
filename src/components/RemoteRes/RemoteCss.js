export default {
  name: 'remote-css',
  render(c) {
    return c('div', '')
  },
  props: {
    href: {
      type: String,
      required: true
    }
  },
  mounted() {
    const domCss = document.createElement('link')
    domCss.href = this.href
    domCss.rel = 'stylesheet'
    domCss.type = 'text/css'
    document.getElementsByTagName('head')[0].appendChild(domCss)
  }
}
