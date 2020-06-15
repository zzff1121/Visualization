import Vue from 'vue'

// import d2Container from './d2-container'
import RemoteCss from './RemoteCss'
import RemoteJs from './RemoteJs'
import RemoteJsGroup from './RemoteJsGroup'

Vue.component(RemoteJsGroup.name, RemoteJsGroup)
Vue.component(RemoteJs.name, RemoteJs)
Vue.component(RemoteCss.name, RemoteCss)
