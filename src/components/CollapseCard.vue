<template>
  <el-card :class="['ax-coll-card',show?'show':'']">
    <div
      slot="header"
      class="header"
      @click="show=!show"
    >
      <svg-icon icon-class="fa-caret-down" />
      <span class="text">查看源码</span>
    </div>
    <slot />
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>

<style rel="styleless/scss" lang="scss">
.ax-coll-card {
  &.show {
    .el-card__body {
      display: block;
    }
  }
  .el-card__body {
    display: none;
  }
  .header {
    color: #d3dce6;
    cursor: pointer;
    text-align: center;
    .text {
      margin-left: 15px;
    }
    &:hover {
      color: #409eff;
    }
  }
}
</style>
