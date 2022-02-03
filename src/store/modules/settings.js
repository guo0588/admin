import variables from '@/assets/css/element-variables.scss'
import defaultSettings from '@/settings'

const {
	menuBackgroundColor,
	activeTextColor,
	tagsView,
	sidebarLogo,
	showFooter,
	footerTxt,
	caseNumber
} = defaultSettings
const state = ({
	theme: variables.theme,
	menuBackgroundColor: menuBackgroundColor,
	activeTextColor: activeTextColor,
	showSettings: false,
	tagsView: tagsView,
	sidebarLogo: sidebarLogo,
	showFooter: showFooter,
	footerTxt: footerTxt,
	caseNumber: caseNumber,
	layoutSettingsDrawer: false,
})
const getters = {
	theme: state => state.theme,
	menuBackgroundColor: state => state.menuBackgroundColor,
	activeTextColor: state => state.activeTextColor,
	tagsView: state => state.tagsView,
	sidebarLogo: state => state.sidebarLogo,
	uniqueOpened: state => state.uniqueOpened,
	withoutAnimation: state => state.withoutAnimation,
}
const mutations = {
	CHANGE_SETTING: (state, { key, value }) => {
		if (state.hasOwnProperty(key)) {
			state.activeTextColor = value
			state[key] = value
		}
	},
	SETTINGS: (state, data) => {
		return state.layoutSettingsDrawer = data
	}
}
const actions = {
	changeSetting({ commit }, data) {
		commit('CHANGE_SETTING', data)
	},
	getSettings({ commit }, data) {
		commit('SETTINGS', data)
	}
}
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}

