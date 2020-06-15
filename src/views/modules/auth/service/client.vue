<template>
  <el-form label-position="top">
    <el-form-item label="允许本服务访问的服务">
      <el-select
        v-model="clients"
        style="width:100%"
        multiple
        filterable
        clearable
        placeholder="请输入服务关键词"
      >
        <el-option
          v-for="item in services"
          :key="item.id"
          :label="item.name+' '+item.description"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="onSubmit"
      >保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getClients, modifyClients, getAll } from '@/api/auth/service/index'
export default {
  data() {
    return {
      serviceId: null,
      items: [],
      clients: [],
      services: [],
      list: [],
      loading: false
    }
  },
  mounted() {},
  methods: {
    onSubmit() {
      const vals = {}
      if (this.clients.length > 0) vals.clients = this.clients.join()
      modifyClients(this.serviceId, vals).then(() => {
        this.$emit('closeClientDialog')
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
      })
    },

    async init(serviceId) {
      this.serviceId = serviceId
      this.services = await getAll()
      const clients = await getClients(serviceId)
      this.clients = clients.map(c => c.id)
    }
  }
}
</script>
