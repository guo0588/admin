import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
// import store from "@/store";
Vue.use(VueRouter)
// const home = { name: '首页', path: '/home', component: () => import('@/views/Home') }
// const user = { name: '用户管理', path: '/user', component: () => import('@/views/system/user/index') }
// const role = { name: '角色管理', path: '/role', component: () => import('@/views/system/role/index') }
// const dept = { name: '部门管理', path: '/dept', component: () => import('@/views/system/dept/index') }
// const about = { name: '关于', path: '/about', component: () => import('@/views/About.vue') }
// const role_list = { name: '角色列表', path: '/role-list', component: () => import('@/views/system/role/roleList') }
// const ruleMapping = { home, user, role, dept, about, role_list }
const routes = [
	{
		path: '/',
		name: 'login',
		component: () => import('@/views/login'),
		meta: {
			title: '登录',
			requireAuth: false
		}
	},
	{
		path: '*',
		component: () => import('@/views/error/401'),
		meta: {
			title: '错误',
			requireAuth: false,
		}
	},
	{
		path: '/equipmentArchives/archivesDataLargeScreen',
		component: () => import('@/views/system/deviceManagement/equipmentArchives/archivesDataLargeScreen'),
		meta: {
			title: '数据大屏',
			requireAuth: true,
		}
	},
	{
		path: '/system',
		name: 'Layout',
		component: () => import('@/layout/index'),
		children: [
			{
				name: 'home',
				path: '/home',
				component: () =>  import(/* webpackChunkName: 'hjjnjnj' */ '@/views/Home'),
				meta: { requireAuth: true, title: '首页' }
			},
			{
				name: 'user',
				path: '/user',
				component: () => import('@/views/system/user/user-admin/index'),
				meta: { requireAuth: true, title: '用户管理' }
			},
			/** 采购管理*/
			{
				name: 'personalCenter',
				path: '/personalCenter',
				component: () => import('@/views/system/user/personalCenter/index'),
				meta: { requireAuth: true, title: '个人中心' }
			},
			{
				name: 'annualPlan',
				path: '/annualPlan',
				component: () => import('@/views/system/purchase/annualPlan/index'),
				meta: { requireAuth: true, title: '年度计划' }
			},
			{
				name: 'newPlan',
				path: '/annualPlan/newPlan/:id',
				component: () => import('@/views/system/purchase/annualPlan/newPlan/index'),
				meta: { requireAuth: true, title: '新建计划' }
			},
			{
				name: 'purchaseRequisition',
				path: '/purchaseRequisition',
				component: () => import('@/views/system/purchase/purchaseRequisition/index'),
				meta: { requireAuth: true, title: '采购申请' }
			}, {
				name: 'newPurchase',
				path: '/purchaseRequisition/newPurchase',
				component: () => import('@/views/system/purchase/purchaseRequisition/newPurchase/index'),
				meta: { requireAuth: true, title: '新建采购' }
			},
			{
				name: 'contract',
				path: '/contract',
				component: () => import('@/views/system/purchase/contract/index'),
				meta: { requireAuth: true, title: '合同管理' }
			},
			{
				name: 'deliverGoods',
				path: '/deliverGoods',
				component: () => import('@/views/system/purchase/deliverGoods/index'),
				meta: { requireAuth: true, title: '发货管理' }
			},
			{
				name: 'checkBeforeAcceptance',
				path: '/checkBeforeAcceptance',
				component: () => import('@/views/system/purchase/checkBeforeAcceptance/index'),
				meta: { requireAuth: true, title: '验收管理' }
			},
			/*****  设备管理********************/
			
			
			
			{
				name: 'equipmentEntry',
				path: '/equipmentEntry',
				component: () => import('@/views/system/deviceManagement/equipmentEntry/index'),
				meta: { requireAuth: true, title: '设备录入' }
			},
			{
				name: 'equipmentInformation',
				path: '/equipmentInformation',
				component: () => import('@/views/system/deviceManagement/equipmentInformation/index'),
				meta: { requireAuth: true, title: '设备管理' }
			},
			{
				name: 'equipmentArchives',
				path: '/equipmentArchives',
				component: () => import('@/views/system/deviceManagement/equipmentArchives/index'),
				meta: { requireAuth: true, title: '设备档案' }
			},
			{
				name: 'equipmentArchivesDetails',
				path: '/equipmentArchives/details',
				component: () => import('@/views/system/deviceManagement/equipmentArchives/details'),
				meta: { requireAuth: true, title: '设备详情' }
			},
			{
				name: 'deviceDetails',
				path: '/equipmentArchives/deviceDetails',
				component: () => import('@/views/system/deviceManagement/equipmentArchives/deviceDetails'),
				meta: { requireAuth: true, title: '设备画像' }
			},
			{
				name: 'equipmentInventory',
				path: '/equipmentInventory',
				component: () => import('@/views/system/deviceManagement/equipmentInventory/index'),
				meta: { requireAuth: true, title: '设备盘点' }
			},
			{
				name: 'equipmentAdverseEvent',
				path: '/equipmentAdverseEvent',
				component: () => import('@/views/system/deviceManagement/equipmentAdverseEvent/index'),
				meta: { requireAuth: true, title: '不良事件' }
			}, {
				name: 'equipmentScrap',
				path: '/equipmentScrap',
				component: () => import('@/views/system/deviceManagement/equipmentScrap/index'),
				meta: { requireAuth: true, title: '报废管理' }
			},
			/*************备件库管理*********************/
			
			
			{
				name: 'purchaseWarehousing',
				path: '/purchaseWarehousing',
				component: () => import('@/views/system/backupsPackage/purchaseWarehousing/index'),
				meta: { requireAuth: true, title: '采购入库' }
			}, {
				name: 'addReceipt',
				path: '/purchaseWarehousing/addReceipt',
				component: () => import('@/views/system/backupsPackage/purchaseWarehousing/addReceipt'),
				meta: { requireAuth: true, title: '新增入库' }
			},
			{
				name: 'receiptIssueInformation',
				path: '/receiptIssueInformation',
				component: () => import('@/views/system/backupsPackage/receiptIssueInformation/index'),
				meta: { requireAuth: true, title: '出入库信息' }
			},
			{
				name: 'inventoryAnalysisAndEarlyWarning',
				path: '/inventoryAnalysisAndEarlyWarning',
				component: () => import('@/views/system/backupsPackage/inventoryAnalysisAndEarlyWarning/index'),
				meta: { requireAuth: true, title: '库存分析及预警' }
			},
			/*************临床使用管理**************/
			
			{
				name: 'maintenanceRecord',
				path: '/maintenanceRecord',
				component: () => import('@/views/system/clinicalUseManagement/maintenanceRecord/index'),
				meta: { requireAuth: true, title: '保养记录' }
			},
			{
				name: 'usageRecord',
				path: '/usageRecord',
				component: () => import('@/views/system/clinicalUseManagement/usageRecord/index'),
				meta: { requireAuth: true, title: '使用管理' }
			},
			/*****************医生操作管理********************************/
			{
				name: 'onSiteInspection',
				path: '/onSiteInspection',
				component: () => import('@/views/system/doctorOperation/onSiteInspection/index'),
				meta: { requireAuth: true, title: '巡检管理' }
			},{
				name: 'patrolInspectionPlan',
				path: '/onSiteInspection/patrolInspectionPlan',
				component: () => import('@/views/system/doctorOperation/onSiteInspection/patrolInspectionPlan'),
				meta: { requireAuth: true, title: '巡检计划' }
			},
			
			{
				name: 'maintain',
				path: '/maintain',
				component: () => import('@/views/system/doctorOperation/maintain/index'),
				meta: { requireAuth: true, title: '保养管理' }
			},
			{
				name: 'repair',
				path: '/repair',
				component: () => import('@/views/system/doctorOperation/repair/index'),
				meta: { requireAuth: true, title: '维修管理' , action:['add']}
			},
			{
				name: 'metering',
				path: '/metering',
				component: () => import('@/views/system/doctorOperation/metering/index'),
				meta: { requireAuth: true, title: '计量管理' }
			},
			{
				name: 'sharedProvisioning',
				path: '/sharedProvisioning',
				component: () => import('@/views/system/doctorOperation/sharedProvisioning/index'),
				meta: { requireAuth: true, title: '共享调配' }
			},
			{
				name: 'trainingRecords',
				path: '/trainingRecords',
				component: () => import('@/views/system/doctorOperation/trainingRecords/index'),
				meta: { requireAuth: true, title: '培训记录' }
			},
			
			/**********************数据整理**************************/
			{
				name: 'dataManagement',
				path: '/dataManagement',
				component: () => import('@/views/system/supplier/dataManagement/index'),
				meta: { requireAuth: true, title: '资料管理' }
			},
			{
				name: 'serviceScopeQuery',
				path: '/serviceScopeQuery',
				component: () => import('@/views/system/supplier/serviceScopeQuery/index'),
				meta: { requireAuth: true, title: '服务范围查询' }
			},
			
			/**********************数据整理**********************/
			{
				name: 'importData',
				path: '/importData',
				component: () => import('@/views/system/dataSorting/importData/index'),
				meta: { requireAuth: true, title: '导入数据' },
			},
			{
				name: 'exportData',
				path: '/exportData',
				component: () => import('@/views/system/dataSorting/exportData/index'),
				meta: { requireAuth: true, title: '导出数据' },
			},
			/*******************基础数据*************************/
			{
				name: 'categoryManagement',
				path: '/categoryManagement',
				component: () => import('@/views/system/basicData/categoryManagement/index'),
				meta: { requireAuth: true, title: '科室管理' },
			},
			{
				name: 'departmentManagement',
				path: '/departmentManagement',
				component: () => import('@/views/system/basicData/departmentManagement/index'),
				meta: { requireAuth: true, title: '品类管理' },
			},
			
			{
				name: 'dataAnalysis',
				path: '/dataAnalysis',
				component: () => import('@/views/system/dataAnalysis/index'),
				meta: { requireAuth: true, title: '数据分析' }
			},
			
			{
				name: 'logManagement',
				path: '/logManagement',
				component: () => import('@/views/system/log/logManagement/index'),
				meta: { requireAuth: true, title: '错误日志' }
			}
		],
	},
]
const router = new VueRouter({
	mode: '',
	scrollBehavior: () => ({ y: 0 }),
	base: process.env.BASE_URL,
	routes
})
// 路由拦截器
router.beforeEach((to, from, next) => {
	if (to.matched.length !== 0) {
		const { requireAuth, title } = to.meta
		document.title = title
		if (requireAuth) { // 判断该路由是否需要登录权限
			if (Cookies.get('token')) { // 取当前的us通过vuex state获是否存在
				next();
			} else {
				next({
					path: '/',
					query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
				})
			}
		} else {
			console.log(2)
			if (Cookies.get('token')) { // 判断是否登录
				if (to.path !== "/") { //判断是否要跳到登录界面
					next();
				} else {
					/*** 防刷新，如果登录，修改路由跳转到登录页面，修改路由为登录后的首页*/
					next({
						path: '/home'
					})
				}
			} else {
				next();
			}
		}
	} else {
		console.log(3)
		next({
			path: '/',
			query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
		})
	}
})
// function permission() {
// 	const perm = function (data) {
// 		data.forEach((item) => {
// 			if (!item.children) {
// 				currentRoutes[2].children.push(ruleMapping[item.name])
// 			} else {
// 				perm(item.children)
// 			}
// 		})
// 	}
// 	const currentRoutes = router.options.routes
// 	const rightList = store.state.menuList
// 	perm(rightList)
// 	router.addRoutes(currentRoutes)
// }
//
// permission()
export default router
