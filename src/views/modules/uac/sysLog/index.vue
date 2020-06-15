<template>
  <div>
    <XxDataTable
      ref="_table"
      :url="pageListUrl()"
      :selection="true"
      :columns="logColumns"
      enable-search
    />
  </div>
</template>
<script>
import { pageListUrl } from 'api/uac/sysLog'
import logMixin from './logMixin'
export default {
  name: 'SysLog',
  mixins: [logMixin],
  data() {
    return {}
  },
  methods: {
    pageListUrl() {
      return pageListUrl()
    }
  }
}
</script>

