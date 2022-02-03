/**
*
* params 维修管理
* return
*/
<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>维修管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索筛选 -->
        <el-form :inline="true" :model="form" class="user-search">
            <el-form-item label="维修单号">
                <el-select v-model="form.name" placeholder="请选择科室" size="small">
                    <el-option label="全部" value="u"></el-option>
                    <el-option label="正常" value="N"></el-option>
                    <el-option label="已锁定" value="Y"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="系统单号">
                <el-date-picker
                    placeholder="选择年"
                    size="small"
                    type="year">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="设备系列号">
                <el-select v-model="form.name" placeholder="请选择科室" size="small">
                    <el-option label="全部" value="u"></el-option>
                    <el-option label="正常" value="N"></el-option>
                    <el-option label="已锁定" value="Y"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" size="small" type="primary" @click="search" v-permission="{action:'delete', effect:'disabled'}"
                >搜索</el-button>
                <el-button icon="el-icon-circle-plus" size="small" type="primary">保修</el-button>
                <el-button icon="el-icon-circle-plus" size="small" type="primary">快速修复</el-button>
                <el-button icon="el-icon-circle-plus" size="small" type="primary">批量打印工单</el-button>
                <el-button icon="el-icon-download" size="small" type="primary">导出列表</el-button>
            </el-form-item>
        </el-form>
        <!--列表-->
        <el-table
            id="printMe"
            v-loading="loading"
            :data="userData"
            border
            element-loading-text="拼命加载中"
            highlight-current-row size="small"
            style="width: 100%;" @selection-change="selectChange">
            <el-table-column align="center" label="#" type="index" width="50">
            </el-table-column>
            <el-table-column align="center" label="维修单号" prop="deptName">
            </el-table-column>
            <el-table-column align="center" label="设备名称" prop="userName">
            </el-table-column>
            <el-table-column align="center" label="系统编号" prop="userRealName">
            </el-table-column>
            <el-table-column align="center" label="所属科室" prop="userMobile">
            </el-table-column>
            <el-table-column align="center" label="设备型号" prop="userSex" width="80">
            </el-table-column>
            <el-table-column align="center" label="设备序列号" prop="userEmail"></el-table-column>
            <el-table-column align="center" label="二维码编号" prop="userEmail"></el-table-column>
            <el-table-column align="center" label="保修类型" prop="userEmail"></el-table-column>
            <el-table-column align="center" label="保修时间" prop="userEmail"></el-table-column>
            <el-table-column align="center" label="关单时间" prop="userEmail"></el-table-column>
            <el-table-column align="center" label="工单状态" prop="editTime"></el-table-column>
            <el-table-column align="center" label="工程师" prop="isLock"></el-table-column>
            <el-table-column align="center" label="操作" min-width="120" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
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
