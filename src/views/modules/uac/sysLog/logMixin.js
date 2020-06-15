export default {
  data() {
    return {
      logColumns: [
        {
          label: '日志级别',
          prop: 'level',
          fixed: true,
          search: true,
          width: '80'
        },
        {
          label: '调用方法',
          prop: 'method',
          search: true,
          width: '200'
        },
        {
          label: '参数',
          prop: 'param',
          width: '150px'
        },
        {
          label: '操作人',
          prop: 'userName',
          width: '100'
        },
        {
          label: '耗时',
          prop: 'useTime',
          width: '80'
        },
        {
          label: '操作时间',
          prop: 'crtTime',
          width: '160px'
        },
        {
          label: '详情',
          search: true,
          prop: 'content'
        }
      ]
    }
  }
}
