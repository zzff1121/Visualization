<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">开发助手</h3>
      <div>
        <div v-html="helpInfo" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    helpInfo() {
      const meta = this.$route.meta
      return meta.helpInfo || '暂无帮助信息'
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
