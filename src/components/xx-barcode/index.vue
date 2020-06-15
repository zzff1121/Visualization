<template>
  <div
    ref="print"
    style="text-align:center"
  >
    <div
      v-show="show"
      class="p-content"
    >
      <div
        v-for="(item,index) in items"
        :key="index"
        :style="{left:item.x+'px',top:item.y+'px'}"
        class="item"
      >
        <img
          v-if="item.type==='img'"
          :id="'img'+index"
          class="img"
        >
        <div
          v-if="item.type==='text'"
          class="text"
        >{{ item.value }}</div>
      </div>
      <br>
    </div>
  </div>
</template>
<script>
import { findByTemplateCode } from '@/api/basedata/barcode/barcode'
export default {
  name: 'XxBarCode',
  data() {
    return {
      show: false,
      items: []
    }
  },
  methods: {
    drawCodes() {
      this.items.forEach((e, i) => {
        if (e.type === 'img') {
          window.JsBarcode('#img' + i, e.value, {
            height: e.height
          })
        }
      })
    },
    async create(data) {
      this.show = true
      const items = await findByTemplateCode({
        templateCode: data.templateCode
      })
      const { params } = data
      items.forEach(item => {
        item.value = params[item.parameter] || ''
        item.x = item.lateralAxis
        item.y = item.verticalAxis
      })
      this.items = items
      try {
        this.$nextTick(() => {
          this.drawCodes()
          this.$print(this.$refs.print)
          this.show = false
        })
      } catch (error) {
        console.error(error)
      }
    },
    beforeClose(done) {
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
.p-content {
  position: relative;
  width: 100%;
  height: 200px;
  border: 1px solid #ccc;
  .item {
    position: absolute;
    .text {
      z-index: 1;
      color: #000;
    }
  }
}
</style>
