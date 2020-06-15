import moment from 'moment'

export default {
  methods: {
    // 表格中时间数据格式化
    dateFormat(row, column) {
      const date = row[column.property]
      return this.formatDate(date)
    },
    // 格式化物料配送最晚时间
    dateDeliveryFormat(row, column) {
      const date = row[column.property]
      return this.formatDay(date)
    },
    formatDate(date) {
      if (!date) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    dayFormat(row, column) {
      const date = row[column.property]
      return this.formatDay(date)
    },
    formatDay(date) {
      if (!date) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD')
    },
    // 工艺路线状态格式化
    formatRouteSatus(row, column) {
      const type = row[column.property]
      return this.formatRouteSatusType(type)
    },
    formatRouteSatusType(type) {
      if (type === 'PUBLISHED') {
        return '已发布'
      } else if (type === 'PENDING') {
        return '待发布'
      } else if (type === 'STOP') {
        return '已停用'
      }
    },
    // 工艺路线是否默认版本格式化
    formatRouteverison(row, column) {
      const type = row[column.property]
      return this.formatRouteVerisonType(type)
    },
    formatRouteVerisonType(type) {
      if (type === '0') {
        return '是'
      } else {
        return '否'
      }
    },
    formatkeyAttribute(row, column) {
      const type = row[column.keyAttribute]
      if (type === true) {
        return '是'
      } else {
        return '否'
      }
    },
    // 条码类型格式化
    formatBarcodeType(row, column) {
      const type = row[column.property]
      if (type.demand === 'JOB') {
        return '工单码'
      } else if (type === 'REPAIR') {
        return '补码'
      } else if (type === 'PLAN') {
        return '计划码'
      }
    },
    // 物料需求状态格式化
    formatDemandStatus(row, column) {
      const type = row[column.property]
      if (type === 'unconfirm') {
        return '未确认'
      } else if (type === 'confirmed') {
        return '已确认'
      } else if (type === 'completed') {
        return '已完成'
      }
    },
    // 物料需求紧急程度格式化
    formatDemandUrgent(row, column) {
      const type = row[column.property]
      if (type === 'common') {
        return '一般'
      } else if (type === 'urgent') {
        return '紧急'
      } else if (type === 'expedited') {
        return '加急'
      }
    },
    // 工具组格式化
    formatToolTypeStatus(row, column) {
      const type = row[column.property]
      switch (type) {
        case 'VALID':
          return '有效'
        case 'INVALID':
          return '无效'
      }
    },
    // 物料追溯方式格式化
    formatBackWay(row, column) {
      const type = row[column.property]
      switch (type) {
        case 'SINGLETON':
          return '单件追溯'
        case 'BATCH':
          return '批次追溯'
        case 'NUMBER':
          return '数量追溯'
      }
    },
    formatBackWay2(row) {
      const materiel = row.materiel
      const type = materiel.backWay
      switch (type) {
        case 'SINGLETON':
          return '单件追溯'
        case 'BATCH':
          return '批次追溯'
        case 'NUMBER':
          return '数量追溯'
      }
    },
    formatBackWay3(type) {
      switch (type) {
        case 'SINGLETON':
          return '单件追溯'
        case 'BATCH':
          return '批次追溯'
        case 'NUMBER':
          return '数量追溯'
      }
    },
    // 物料种类格式化
    formatKind(row, column) {
      const type = row[column.property]
      switch (type) {
        case 'PRODUCT':
          return '产品'
        case 'COMPONENTS':
          return '部件'
        case 'PART':
          return '零件'
      }
    },
    formatKind2(row) {
      const materiel = row.materiel
      const type = materiel.kind
      switch (type) {
        case 'PRODUCT':
          return '产品'
        case 'COMPONENTS':
          return '部件'
        case 'PART':
          return '零件'
      }
    },
    formatKind3(type) {
      switch (type) {
        case 'PRODUCT':
          return '产品'
        case 'COMPONENTS':
          return '部件'
        case 'PART':
          return '零件'
      }
    },
    // 物料生产类型格式化
    formatProductType(row, column) {
      const property = column.property
      const type = row[property]
      switch (type) {
        case 'TOTALASSEMBLY':
          return '总装'
        case 'SELFCREATED':
          return '自制'
        case 'OUTSOURCING':
          return '外购'
        case 'OUTASSIST':
          return '外协'
        case 'SEWED':
          return '线装'
        case 'DIVIDE':
          return '分装'
      }
    },
    formatProductType2(row) {
      const materiel = row.materiel
      const type = materiel.productType
      switch (type) {
        case 'TOTALASSEMBLY':
          return '总装'
        case 'SELFCREATED':
          return '自制'
        case 'OUTSOURCING':
          return '外购'
        case 'OUTASSIST':
          return '外协'
        case 'SEWED':
          return '线装'
        case 'DIVIDE':
          return '分装'
      }
    },
    formatProductType3(type) {
      switch (type) {
        case 'TOTALASSEMBLY':
          return '总装'
        case 'SELFCREATED':
          return '自制'
        case 'OUTSOURCING':
          return '外购'
        case 'OUTASSIST':
          return '外协'
        case 'SEWED':
          return '线装'
        case 'DIVIDE':
          return '分装'
      }
    },
    formatManageType2(row) {
      const materiel = row.materiel
      const type = materiel.manageType
      switch (type) {
        case 'STANDARD':
          return '标准件'
        case 'GENERAL':
          return '通用件'
        case 'COMMON':
          return '一般件'
        case 'KEY':
          return '关重件'
      }
    },
    formatManageType3(type) {
      switch (type) {
        case 'STANDARD':
          return '标准件'
        case 'GENERAL':
          return '通用件'
        case 'COMMON':
          return '一般件'
        case 'KEY':
          return '关重件'
      }
    },
    // 生产单元格式化
    formatUnitStatus(row, column) {
      const type = row[column.property]
      switch (type) {
        case 1:
          return '一般'
        case 2:
          return '工作单元'
        case 3:
          return '黑盒'
      }
    },
    // 工具状态格式化
    formatToolStatus(row) {
      switch (row.status) {
        case 'ENABLE':
          return '启用'
        case 'DISABLE':
          return '闲置'
      }
    },
    // 班组状态格式化
    formatTeamStatus(row) {
      switch (row.status) {
        case 'USABLE':
          return '可用'
        case 'UNUSABLE':
          return '不可用'
      }
    },
    // 管理类型格式化
    formatManageType(row) {
      switch (row.manageType) {
        case 'STANDARD':
          return '标准件'
        case 'GENERAL':
          return '通用件'
        case 'COMMON':
          return '一般件'
        case 'KEY':
          return '关重件'
      }
    },
    // 订单紧急程度格式化
    formatLevel(row) {
      switch (row.urgentLevel) {
        case 'EXTRAURGENT':
          return '特急'
        case 'URGENT':
          return '加急'
        case 'COMMON':
          return '常规'
      }
    },
    // 订单是否已释放
    formatRelease(row) {
      if (row.release === false) {
        return '未释放'
      } else {
        return '已释放'
      }
    },
    // 属性是否必填格式化
    formateRequired(row, column) {
      const state = row[column.property]
      if (state === true) {
        return '是'
      } else {
        return '否'
      }
    },
    // 加日期
    addDays(date, num) {
      return moment(date).add(num, 'days')
    }
  }
}
