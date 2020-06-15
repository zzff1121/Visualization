<template>
  <div class="ax-code-view">
    <CollapseCard>
      <tree-view :data="data" />
    </CollapseCard>
  </div>
</template>

<script>
import CollapseCard from '@/components/CollapseCard'
import TreeView from 'vue-json-tree-view'

export default {
  components: { CollapseCard, TreeView },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
.ax-code-view {
  margin-top: 12px;
  .tree-view-item-key {
    color: #ce9178;
  }
}
</style>
