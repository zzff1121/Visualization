<template>
  <div class="ax-control-type">
    <svg-icon :icon-class="icon" /> {{ name }}
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.ax-control-type {
  background-color: $mainBg;
  display: inline-block;
  box-sizing: border-box;
  width: 130px;
  margin: 8px;
  padding: 8px;
  font-size: 13px;
  cursor: move;
  border: 1px solid $mainBg;
  &:hover {
    border: 1px dashed $--color-primary;
  }
}
</style>
