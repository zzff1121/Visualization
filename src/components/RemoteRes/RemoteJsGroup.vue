<template>
  <div class="remote-js-group">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'RemoteJsGroup',
  data() {
    return {
      success: false,
      jsList: []
    }
  },
  provide() {
    return {
      group: this
    }
  },
  mounted() {
    this.loadjs()
  },
  methods: {
    async loadjs() {
      for (const js of this.jsList) {
        await js.loadjsAsync()
      }
      this.$emit('loaded')
    },
    addJs(js) {
      this.jsList.push(js)
    }
  }
}
</script>

<style>
</style>
