<template>
  <div class="ax-page">
    <div class="query">
      <slot name="query" />
    </div>
    <div class="actions">
      <slot name="actions" />
    </div>
    <div class="data">
      <slot name="data" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AxPage',
  provide: {
    page: this
  }
}
</script>

<style lang="scss" scoped>
</style>
