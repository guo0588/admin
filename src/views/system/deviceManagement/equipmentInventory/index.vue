/**
* 设备档案
*/
<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>设备盘点</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索筛选 -->
        <div class="searchFilter">
            <el-form :inline="true" :model="form" class="user-search">
                <el-form-item label="任务编号">
                    <el-input
                        placeholder="请输入设备名称"
                        size="small"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="任务名称">
                    <el-input
                        placeholder="请输入设备型号"
                        size="small"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker
                        v-model="form.name"
                        end-placeholder="结束日期"
                        range-separator="至"
                        size="small"
                        start-placeholder="开始日期"
                        type="daterange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" size="small" type="primary" @click="search">搜索</el-button>
                    <el-button icon="el-icon-circle-plus" size="small" type="primary" @click="editFormVisible = true">盘点任务</el-button>
                </el-form-item>
            </el-form>
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
            <el-table-column align="center" label="任务编号" prop="deptName">
            </el-table-column>
            <el-table-column align="center" label="任务名称" prop="userName">
            </el-table-column>
            <el-table-column align="center" label="创建日期" prop="userRealName">
            </el-table-column>
            <el-table-column align="center" label="创建人" prop="userMobile">
            </el-table-column>
            <el-table-column align="center" label="设备总数" prop="userSex">
            </el-table-column>
            <el-table-column align="center" label="盘到" prop="userEmail"></el-table-column>
            <el-table-column align="center" label="盈亏" prop="userEmail"></el-table-column>
            <el-table-column align="center" label="盘盈" prop="userEmail"></el-table-column>
            <el-table-column align="center" label="盘点负责人" prop="userEmail"></el-table-column>
            <el-table-column align="center" label="状态" prop="userEmail"></el-table-column>
            <el-table-column align="center" label="操作" fixed="right" min-width="120" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="$router.push('/equipmentArchives/details')">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <Pagination v-bind:child-msg="page" @callFather="callFather"></Pagination>
        <el-dialog :visible.sync="editFormVisible" title="盘点任务" width="30%">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
                <el-form-item label="盘点名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="盘点类型" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="盘点科室" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="盘点设备" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="盘点负责人" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
            </el-form>
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
            form: { name: '' },
            ruleForm: {
                name: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
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


