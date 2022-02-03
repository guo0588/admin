/**
* 设备档案
*/
<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>设备档案</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索筛选 -->
        <div class="searchFilter">
            <el-form :inline="true" :model="form" class="user-search" label-width="80px">
                <el-form-item label="所属科室">
                    <el-select v-model="form.name" placeholder="请选择科室" size="small">
                        <el-option label="全部" value="u"></el-option>
                        <el-option label="正常" value="N"></el-option>
                        <el-option label="已锁定" value="Y"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二维码">
                    <el-input
                        placeholder="请输入设备名称"
                        size="small"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="设备型号">
                    <el-input
                        placeholder="请输入设备型号"
                        size="small"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item v-if="!$store.state.app.collapsed " label="设备状态">
                    <el-input
                        placeholder="请输入设备型号"
                        size="small"
                    >
                    </el-input>
                </el-form-item>
                <el-collapse-transition>
                    <div v-show="show3">
                        <el-form-item v-if="$store.state.app.collapsed " label="设备状态">
                            <el-input placeholder="请输入设备型号" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="设备型号">
                            <el-input placeholder="请输入设备型号" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="设备名称">
                            <el-input placeholder="请输入设备型号" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="保修状态">
                            <el-input placeholder="请输入设备型号" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="计量类型">
                            <el-input placeholder="请输入设备型号" size="small"></el-input>
                        </el-form-item>
                    </div>
                </el-collapse-transition>
            </el-form>
            <div class="more_conditions">
                <el-button icon="el-icon-search" size="small" type="primary" @click="search">搜索</el-button>
                <el-button icon="el-icon-download" size="small" type="primary" @click="editFormVisible = true">导出列表</el-button>
                <el-button :icon="show3 ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" size="small" type="text" @click="show3 = !show3">更多查询条件</el-button>
            </div>
        </div>
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
            <el-table-column align="center" label="二维码编号" prop="deptName">
            </el-table-column>
            <el-table-column align="center" label="资产编码" prop="userName">
            </el-table-column>
            <el-table-column align="center" label="设备名称" prop="userRealName">
            </el-table-column>
            <el-table-column align="center" label="设备分类" prop="userMobile">
            </el-table-column>
            <el-table-column align="center" label="品牌" prop="userSex">
            </el-table-column>
            <el-table-column align="center" label="型号" prop="userEmail"></el-table-column>
            <el-table-column align="center" label="所属科室" prop="userEmail"></el-table-column>
            <el-table-column align="center" label="保修状态" prop="userEmail"></el-table-column>
            <el-table-column align="center" label="操作" min-width="120" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="$router.push('/equipmentArchives/details')">查看</el-button>
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
            show3: false,
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
    computed: {
        clientWidth() {
            return document.body.clientWidth
        }
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
<style lang="scss" scoped>
.searchFilter {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    
    .user-search, {
        flex: 1;
        margin-top: 20px;
        
        
        .el-select {
            width: 200px;
        }
        
    }
    
    .more_conditions {
        //flex: 1;
        //width: 25%;
        margin-bottom: 24px;
    }
}


.userRole {
    width: 100%;
}

.more_conditions {

}
</style>


