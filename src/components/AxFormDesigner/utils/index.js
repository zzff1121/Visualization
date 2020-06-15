export const baseControl = [
  {
    name: '单行文本',
    type: 'text',
    icon: 'input',
    defaultValue: null
  },
  {
    name: '多行文本',
    type: 'textarea',
    icon: 'textarea',
    defaultValue: null
  },
  {
    name: '单选框组',
    type: 'radio',
    icon: 'fa-dot-circle-o',
    defaultValue: null
  },
  {
    name: '多选框组',
    type: 'checkbox',
    icon: 'fa-check-square',
    defaultValue: []
  },
  {
    name: '时间选择',
    type: 'time',
    icon: 'fa-clock-o',
    defaultValue: null
  },
  {
    name: '时间范围选择',
    type: 'time-range',
    icon: 'fa-clock-o',
    defaultValue: [null, null]
  },
  {
    name: '日期选择',
    type: 'date',
    icon: 'fa-calendar',
    defaultValue: null
  },
  {
    name: '日期范围选择',
    type: 'daterange',
    icon: 'fa-calendar-times-o',
    defaultValue: [null, null]
  },
  {
    name: '日期时间选择',
    type: 'datetime',
    icon: 'fa-calendar',
    defaultValue: null
  },
  {
    name: '日期时间范围',
    type: 'datetimerange',
    icon: 'fa-calendar-times-o',
    defaultValue: [null, null]
  },
  {
    name: '下拉列表',
    type: 'select',
    icon: 'fa-list-alt',
    defaultValue: null
  }
]

export const advanceControl = [
  {
    name: '文件上传',
    type: 'file',
    icon: 'fa-upload',
    defaultValue: []
  },
  {
    name: '富文本编辑器',
    type: 'rich-editor',
    icon: 'edit',
    defaultValue: ''
  },
  {
    name: '代码编辑器',
    type: 'code-editor',
    icon: 'fa-code',
    defaultValue: ''
  },
  {
    name: '级联选择器',
    type: 'cascader',
    icon: 'cascader',
    defaultValue: []
  },
  {
    name: '文本信息',
    type: 'text-info',
    icon: 'text',
    noInput: true
  },
  {
    name: '分割线',
    type: 'divider',
    icon: 'divider',
    noInput: true
  }
]

export const controlGroup = [
  {
    name: '基础组件',
    items: baseControl
  },
  {
    name: '高级组件',
    items: advanceControl
  }
]

export const formConfig = {
  url: process.env.VUE_APP_BASE_API,
  method: 'POST',
  title: '新建表单',
  inline: false,
  labelPosition: 'right',
  labelWidth: '120px'
}
