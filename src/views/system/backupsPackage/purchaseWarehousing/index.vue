/**
*
* params 采购入库
* return
*/*/
<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>采购入库</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索筛选 -->
        <el-form :inline="true" :model="form" class="user-search">
            <el-form-item label="入库单号">
                <el-input placeholder="请输入" size="small"></el-input>
            </el-form-item>
            <el-form-item label="设备名称">
                <el-input placeholder="请输入" size="small"></el-input>
            </el-form-item>
            <el-form-item label="设备型号">
                <el-input placeholder="请输入" size="small"></el-input>
            </el-form-item>
            <el-form-item label="品牌">
                <el-input placeholder="请输入" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" size="small" type="primary" @click="search">搜索</el-button>
                <el-button icon="el-icon-circle-plus" size="small" type="primary" @click="$router.push('/purchaseWarehousing/addReceipt')">新增入库</el-button>
            </el-form-item>
        </el-form>
        <!--列表-->
        <el-table
            id="printMe"
            v-loading="loading"
            :data="userData"
            border
            element-loading-text="拼命加载中"
            highlight-current-row
            size="small"
            style="width: 100%;" @selection-change="selectChange">
            <el-table-column align="center" label="#" type="index" width="50">
            </el-table-column>
            <el-table-column align="center" label="采购单号" min-width="50" prop="deptName" width="100">
            </el-table-column>
            <el-table-column align="center" label="入库单号" min-width="50" prop="userName" width="100">
            </el-table-column>
            <el-table-column align="center" label="入库时间" min-width="50" prop="userRealName" width="100">
            </el-table-column>
            <el-table-column align="center" label="设备序列号" min-width="50" prop="userMobile" width="100">
            </el-table-column>
            <el-table-column align="center" label="设备名称" min-width="50" prop="userSex" width="100">
            </el-table-column>
            <el-table-column align="center" label="设备品牌" min-width="50" prop="userName" width="100">
            </el-table-column>
            <el-table-column align="center" label="设备厂家" min-width="50" prop="userName" width="100"></el-table-column>
            <el-table-column align="center" label="设备型号" min-width="50" prop="isLock" width="100"></el-table-column>
            <el-table-column align="center" label="设备分类" prop="isLock"></el-table-column>
            <el-table-column align="center" label="设备金额" prop="isLock"></el-table-column>
            <el-table-column align="center" label="供应商" prop="isLock"></el-table-column>
            <el-table-column align="center" label="状态" prop="isLock"></el-table-column>
            <el-table-column align="center" fixed="right" label="操作" min-width="150" width="240">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">申请</el-button>
                    <el-button size="mini" type="primary" @click="deleteUser(scope.$index, scope.row)">审批</el-button>
                    <el-button size="mini" type="primary" @click="deleteUser(scope.$index, scope.row)">执行</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <Pagination v-bind:child-msg="page" @callFather="callFather"></Pagination>
        <el-dialog :visible.sync="editFormVisible" title="年度计划" width="30%">
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click='editFormVisible = false'>取消</el-button>
                <el-button :loading="loading" class="title" size="small" type="primary" @click="editFormVisible = false">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'

export default {
    data() {
        return {
            editFormVisible: false,
            form: {
                name: '',
            },
            page: {
                currentPage: 1,
                pageSize: 10,
                total: 10
            },
            loading: false, //是显示加载
            userData: [
                {
                    addUser: '1',
                    editUser: '1',
                    addTime: null,
                    editTime: 1527411068000,
                    userId: 1,
                    systemNo: 'pmd',
                    userName: 'root',
                    userPassword: 'e10adc3949ba59abbe56e057f20f883e',
                    userRealName: '超级管理员',
                    userSex: '女',
                    userMobile: '138123456789',
                    userEmail: '111@qq.com',
                    isLock: 'N',
                    deptId: 1,
                    deptName: 'xxxx',
                    roleId: 1
                },
                {
                    addUser: '1',
                    editUser: '1',
                    addTime: null,
                    editTime: 1527410579000,
                    userId: 3,
                    systemNo: 'mc',
                    userName: 'zengzhuo',
                    userPassword: 'e10adc3949ba59abbe56e057f20f883e',
                    userRealName: '系统管理员',
                    userSex: 'M',
                    userMobile: '18616988966',
                    userEmail: '222@qq.com',
                    isLock: 'N',
                    deptId: 2,
                    deptName: 'xxxx',
                    roleId: 101
                },
            ],
        }
    },
    // 注册组件
    components: {
        Pagination
    },
    methods: {
        search() {
        },
        selectChange() {
        },
        handleEdit() {
        },
        deleteUser() {
        },
        // 分页插件事件
        callFather() {
        },
    }
}
</script>
<style scoped>
.user-search {
    margin-top: 20px;
}
.userRole {
    width: 100%;
}
</style>

