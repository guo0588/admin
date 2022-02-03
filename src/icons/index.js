import Vue from 'vue'//引入组件
import SvgIcon from '../components/SvgIcon.vue'// svg组件
Vue.component('svg-icon', SvgIcon)  //此处递归获取.svg文件
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
