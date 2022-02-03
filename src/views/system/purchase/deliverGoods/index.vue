/**
* 发货管理
*/
<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>发货管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索筛选 -->
        <el-form :inline="true" :model="form" class="user-search">
            <el-form-item label="合同号:">
                <el-input v-model="form.name" placeholder="请输入合同号" size="small"></el-input>
            </el-form-item>
            <el-form-item label="服务商名称:">
                <el-input v-model="form.name" placeholder="请输入服务商名称" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" size="small" type="primary" @click="search">搜索</el-button>
                <el-button icon="el-icon-s-promotion" size="small" type="primary" @click="editFormVisible = true">发起发货申请</el-button>
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
            <el-table-column align="center" label="合同号" prop="deptName">
            </el-table-column>
            <el-table-column align="center" label="服务商名称" prop="userName">
            </el-table-column>
            <el-table-column align="center" label="合同内设备数量" prop="userRealName">
            </el-table-column>
            <el-table-column align="center" label="已申请发货设备数" prop="userMobile">
            </el-table-column>
            <el-table-column align="center" label="已安装验收设备数" prop="userSex">
            </el-table-column>
            <el-table-column align="center" label="收款状态" prop="userEmail">
            </el-table-column>
            <el-table-column align="center" label="待处理设备数" prop="editTime"></el-table-column>
            <el-table-column align="center" label="操作" min-width="120" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <Pagination v-bind:child-msg="page" @callFather="callFather"></Pagination>
        <el-dialog :visible.sync="editFormVisible" title="发货申请" width="60%">
            <div>
                <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                    <el-form-item label="合同号">
                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item label="服务商名称">
                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-search" size="small" type="primary" @click="search">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-divider></el-divider>
                <el-table
                    :data="tableData"
                    style="width: 100%;margin-top: 24px">
                    <el-table-column label="合同号" prop="date"></el-table-column>
                    <el-table-column label="服务商名称" prop="date"></el-table-column>
                    <el-table-column label="合同内设备数" prop="date"></el-table-column>
                    <el-table-column label="已发货设备申请数" prop="date"></el-table-column>
                    <el-table-column label="已安装验收设备数" prop="date"></el-table-column>
                    <el-table-column label="操作" prop="date">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                   
                </el-table>
            </div>
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
            formInline: {
                user: '',
                region: ''
            },
            loading: false, //是显示加载
            tableData: [ {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, ],
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


