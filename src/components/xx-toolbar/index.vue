<template>
  <div class="xx-tool-bar">
    <XxToolbarGroup v-if="buttons.length>0">
      <XxToolbarItem
        v-for="(b,index) in buttons"
        :key="index"
        v-bind="b"
      />
    </XxToolbarGroup>
    <slot />
  </div>
</template>

<script>
import XxToolbarGroup from './components/XxToolbarGroup'
import XxToolbarItem from './components/XxToolbarItem'

// const DEFAULT_LAYOUT = 'add,delete,view,edit,search'
const buttons = {
  add: {
    type: 'primary',
    text: '新增',
    icon: 'el-icon-circle-plus-outline',
    name: 'add'
  },
  delete: {
    type: 'danger',
    text: '删除',
    icon: 'el-icon-remove-outline',
    name: 'delete'
  },
  view: {
    type: 'primary',
    text: '查看',
    icon: 'book',
    name: 'view'
  },
  edit: {
    type: 'primary',
    text: '修改',
    icon: 'el-icon-edit-outline',
    name: 'edit'
  },
  search: {
    type: 'primary',
    text: '查询',
    icon: 'el-icon-search',
    name: 'search'
  }
}

export default {
  name: 'XxToolBar',
  components: { XxToolbarItem, XxToolbarGroup },
  props: {
    layout: {
      type: String,
      default: ''
    }
  },
  provide() {
    return {
      xxToolBar: this
    }
  },
  data() {
    return {
      buttons: []
    }
  },
  watch: {
    layout(v) {
      this.updateLayout(v)
    }
  },
  mounted() {
    this.updateLayout(this.layout)
  },
  methods: {
    updateLayout(layout) {
      if (!layout) {
        return
      }
      this.buttons = layout
        .split(',')
        .filter(l => {
          return buttons[l]
        })
        .map(l => {
          return buttons[l]
        })
    }
  }
}
</script>

<style scoped>
</style>
