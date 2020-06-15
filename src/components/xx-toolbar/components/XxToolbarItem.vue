<template>
  <el-button
    class="xx-toolbar-item"
    :type="type"
    :disabled="disabled"
    :icon="icon"
    @click="handleClick"
  >
    <span v-if="icon&&!icon.startsWith('el-')">
      <d2-icon :name="icon" />&nbsp;
    </span>
    <span v-if="$slots.text || text">
      <slot name="text">{{ text }}</slot>
    </span>
    <slot v-else />
  </el-button>
</template>

<script>
export default {
  name: 'XxToolBarItem',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: ''
    },
    buildIn: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  inject: ['xxToolBar'],
  provide() {
    return {
      xxToolBarItem: this
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClick() {
      if (this.name) {
        this.xxToolBar.$emit(this.name)
      } else {
        this.$emit('click')
      }
    }
  }
}
</script>

<style scoped>
</style>
