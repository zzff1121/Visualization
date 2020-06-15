<template>
  <div class="group-container">
    <groupDetail />
  </div>
</template>

<script>
import groupDetail from './components/groupDetail'
export default {
  name: 'Group',
  components: {
    groupDetail
  },
  data() {
    return {
      activeName: 'role'
    }
  },
  methods: {}
}
</script>

<style scoped>
</style>
