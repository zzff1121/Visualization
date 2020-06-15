import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import { setItem, getItem } from '@/utils/store'

const settings = getItem('settings')
const { showSettings, tagsView, fixedHeader, sidebarLogo } =
  settings || defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
    setItem('settings', state)
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
