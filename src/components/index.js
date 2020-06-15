import Vue from 'vue'

// import d2Container from './d2-container'
import XxToolBar from './xx-toolbar/index.vue'
import XxToolBarGroup from './xx-toolbar/components/XxToolbarGroup.vue'
import XxToolBarItem from './xx-toolbar/components/XxToolbarItem.vue'
// import XxTableAuditingColumn from './XxTableAuditingColumn'

import XxDialog from './xx-dialog'
import XxPagination from './xx-pagination'
import XxDetail from './xx-detail'
import XxSelectionTable from './xx-selection-table'
import XxDataTable from './xx-data-table'
import XxTreeTable from './xx-tree-table'
// import XxQCode from './xx-qcode'
// import XxBarCode from './xx-barcode'
import XxForm from './xx-form'
import XxButton from './xx-button'
import XxButtonGroup from './xx-button-group'
import './RemoteRes'

// import TreeTable from './TreeTable'

// 注意 有些组件使用异步加载会有影响
// Vue.component('d2-container', d2Container)
// Vue.component('d2-page-cover', () => import('./d2-page-cover'))
Vue.component('xx-icon', () => import('./xx-icon'))

Vue.component(XxToolBar.name, XxToolBar)
Vue.component(XxToolBarGroup.name, XxToolBarGroup)
Vue.component(XxToolBarItem.name, XxToolBarItem)
Vue.component(XxDialog.name, XxDialog)
// Vue.component(XxTableAuditingColumn.name, XxTableAuditingColumn)
Vue.component(XxPagination.name, XxPagination)
Vue.component(XxDetail.name, XxDetail)
Vue.component(XxSelectionTable.name, XxSelectionTable)
Vue.component(XxDataTable.name, XxDataTable)
Vue.component(XxTreeTable.name, XxTreeTable)
// Vue.component(XxQCode.name, XxQCode)
// Vue.component(XxBarCode.name, XxBarCode)
Vue.component(XxForm.name, XxForm)
Vue.component(XxButton.name, XxButton)
Vue.component(XxButtonGroup.name, XxButtonGroup)

// Vue.component(TreeTable.name, TreeTable)
