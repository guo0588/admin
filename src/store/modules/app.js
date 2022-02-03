const state = ({
	collapsed: false,
	withoutAnimation: false,
	visitedViews: [],
	menuList: [
		{
			icon: "home",
			path: '/home',
			meta: {
				title: '首页',
			}
		},
		{
			icon: "user",
			path: '/user',
			meta: { title: '用户管理', },
		},
		{
			icon: 'caiGou',
			path: '/purchase',
			meta: { title: '采购管理', },
			children: [
				{
					path: '/annualPlan',
					meta: { title: '年度计划' }
				},
				{
					path: '/purchaseRequisition',
					meta: { title: '采购申请' }
				},
				{
					path: '/contract',
					meta: { title: '合同管理' }
				},
				{
					path: '/deliverGoods',
					meta: { title: '发货管理' }
				},
				{
					path: '/checkBeforeAcceptance',
					meta: { title: '验收管理' }
				},
			]
		},
		{
			icon: 'shebei',
			path: '/deviceManagement',
			meta: { title: '设备管理' },
			children: [
				{
					path: '/equipmentInformation',
					meta: { title: '设备信息' }
				},
				{
					path: '/equipmentEntry',
					meta: { title: '设备录入' }
				},
				{
					path: '/equipmentArchives',
					meta: { title: '设备档案' }
				},
				{
					path: '/equipmentInventory',
					meta: { title: '设备盘点' }
				},
				{
					path: '/equipmentAdverseEvent',
					meta: { title: '不良事件' }
				},
				{
					path: '/equipmentScrap',
					meta: { title: '报废管理' }
				},
			]
		},
		
		{
			icon: 'linchuang',
			path: '/clinicalUseManagement',
			meta: { title: '临床使用管理' },
			children: [
				{
					path: '/maintenanceRecord',
					meta: { title: '保养记录' }
				},
				{
					path: '/usageRecord',
					meta: { title: '使用管理' }
				},
			]
		},
		{
			icon: 'yisheng',
			path: '/doctorOperation',
			meta: { title: '医生操作管理' },
			children: [
				{
					path:'/onSiteInspection',
					meta: {title: '巡检管理'},
				},
				{
					path:'/maintain',
					meta: {title: '保养管理'},
				},
				{
					path:'/repair',
					meta: {title: '维修管理'},
				},
				{
					path:'/metering',
					meta: {title: '计量管理'},
				},
				{
					path:'/sharedProvisioning',
					meta: {title: '共享调配'},
				},
				{
					path:'/trainingRecords',
					meta: {title: '培训记录'},
				},
				
			]
		},
		
		{
			icon: 'gongyinshang',
			path: '/supplier',
			meta: { title: '供应商管理' },
			children: [
				{
					path: '/dataManagement',
					meta: { title: ' 资料管理' }
				}, {
					path: '/serviceScopeQuery',
					meta: { title: ' 服务范围查询' }
				},
			]
		},
		{
			icon: 'data',
			path: '/dataSorting',
			meta: { title: '数据整理' },
			children: [
				{
					path: '/importData',
					meta: { title: '导入数据' }
				}, {
					path: '/exportData',
					meta: { title: '导出数据' }
				},
			]
		},
		{
			icon: 'log',
			path: '/logManagement',
			meta: { title: '日志管理' },
			children: [
				{
					path: '/logManagement',
					meta: { title: '错误日志' }
				},
			]
		},
		{
			icon: 'basic',
			path: '/basicData',
			meta: { title: '基础数据' },
			children: [
				{
					path: '/departmentManagement',
					meta: { title: '科室管理' }
				},
				{
					path: '/categoryManagement',
					meta: { title: ' 品类管理' }
				},
			]
		},
		{
			icon: 'setup',
			path: '/log',
			meta: { title: '系统设置' },
		},
		/*先不做*/
		/*{
			icon: 'shuju',
			path: '/dataAnalysis',
			meta: { title: '数据分析' },
		},
		{
			icon: 'beijian',
			path: '/backupsPackage',
			meta: { title: '备件库管理' },
			children: [
				{
					path: '/purchaseWarehousing',
					meta: { title: '采购入库' }
				},
				{
					path: '/receiptIssueInformation',
					meta: { title: '出入库信息' }
				},
				{
					path: '/inventoryAnalysisAndEarlyWarning',
					meta: { title: '库存分析及预警' }
				},
			],
		},*/
	
	],
})
const getters = {
	collapsed: state => state.collapsed,
	visitedViews: state => state.visitedViews,
	menuList: state => state.menuList,
	withoutAnimation: state => state.withoutAnimation,
}
const mutations = {
	COLLAPSE(state,) {
		return state.collapsed = !state.collapsed
	},
	WINDOW_COLLAPSE(state, value) {
		if (value < 1660) {
			return state.collapsed = true
		}
		return state.collapsed = false
	},
	ADD_VISITED_VIEWS: (state, route) => {//打开新页签--添加路由数据的方法
		if (state.visitedViews.some(v => v.path === route.path)) return;
		state.visitedViews.push({
			name: route.meta.title,
			path: route.path,
			title: route.meta.title || 'no-title'
		})
	},
	DEL_VISITED_VIEWS: (state, view) => {//关闭页签--删除路由数据的方法
		for (let [ i, v ] of state.visitedViews.entries()) {
			if (v.path === view.path) {
				state.visitedViews.splice(i, 1)
				break
			}
		}
	}
}
const actions = {//调用这里去触发mutations，如何调用？在组件内使用this.$store.dispatch('action中对应名字', 参数)
	addVisitedViews({ commit }, route) {//通过解构赋值得到commit方法
		commit('ADD_VISITED_VIEWS', route)//去触发ADD_VISITED_VIEWS，并传入参数
	},
	delVisitedViews({ commit, state }, view) {//删除数组存放的路由之后，需要再去刷新路由，这是一个异步的过程，需要有回掉函数，所以使用并返回promise对象，也可以让组件在调用的时候接着使用.then的方法
		return new Promise((resolve) => {//resolve方法：未来成功后回掉的方法
			commit('DEL_VISITED_VIEWS', view);
			resolve([ ...state.visitedViews ]);
		})
	}
}
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
