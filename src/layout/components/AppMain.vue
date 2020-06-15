<template>
  <section class="app-main">
    <div class="app-main-wrap">
      <div
        class="app-main-view"
        :class="{'auto-style':autoStyle}"
      >
        <!-- <keep-alive :include="cachedViews"> -->
        <router-view :key="key" />
        <!-- </keep-alive> -->
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    },
    autoStyle() {
      return this.$route.meta ? this.$route.meta.autoStyle === true : false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  position: relative;
  .app-main-wrap {
    padding: 12px;
    .app-main-view {
      background-color: #fff;
      padding: 24px 32px;
      border-radius: 2px;
      &.auto-style {
        background: none;
        padding: 0;
        border-radius: 0;
      }
    }
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
