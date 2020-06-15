<template>
  <i
    class="fa xx-icon"
    :class="`fa-${iconName}`"
    aria-hidden="true"
  />
</template>

<script>
import './font-awesome-4.7.0/css/font-awesome.min.css'
export default {
  name: 'D2Icon',
  props: {
    name: {
      type: String,
      required: false,
      default: 'font-awesome'
    }
  },
  computed: {
    iconName() {
      if (this.name.indexOf('fa-') !== -1) {
        return this.name.replace('fa-', '')
      } else {
        return this.name
      }
    }
  }
}
</script>
