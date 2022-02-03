<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>品类管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索筛选 -->
        <el-form :inline="true" :model="form" class="user-search">
            <el-form-item label="使用科室：">
                <el-select v-model="form.name" placeholder="请选择科室" size="small">
                    <el-option label="全部" value="u"></el-option>
                    <el-option label="正常" value="N"></el-option>
                    <el-option label="已锁定" value="Y"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="年度：">
                <el-date-picker
                    placeholder="选择年"
                    size="small"
                    type="year">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="申请进度">
                <el-select v-model="form.name" placeholder="请选择科室" size="small">
                    <el-option label="全部" value="u"></el-option>
                    <el-option label="正常" value="N"></el-option>
                    <el-option label="已锁定" value="Y"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" size="small" type="primary" @click="search">搜索</el-button>
                <el-button icon="el-icon-circle-plus" size="small" type="primary" @click="editFormVisible = true">新增品类</el-button>
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
            <el-table-column align="center" label="设备品类" prop="deptName">
            </el-table-column>
            <el-table-column align="center" label="三级分类" prop="userName">
            </el-table-column>
            <el-table-column align="center" label="已关联设备数" prop="userRealName">
            </el-table-column>
            <el-table-column align="center" label="操作" min-width="120" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <Pagination v-bind:child-msg="page" @callFather="callFather"></Pagination>
        <el-dialog :visible.sync="editFormVisible" title="新增" width="35%">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="80px">
                <el-form-item label="设备品类" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                    <el-checkbox v-model="checked">生命支持类设备</el-checkbox>
                </el-form-item>
                <div class="pleaseSelectLevel3Classification">
                    <p>请选择三级分类</p>
                    <p><i class="el-icon-info"></i><span> 设备品类可以关联多个三级分类，保存后，三级分类的所属设备都将自动归入该品类。</span></p>
                </div>
                <el-form-item
                    v-for="(domain, index) in ruleForm.domains"
                    :key="domain.key"
                    :label="'分类' + (index+1)"
                    :prop="'domains.' + index + '.value'"
                    :rules="{required: true, message: '域名不能为空', trigger: 'blur'}"
                >
                    <el-input v-model="domain.value">
                        <el-button slot="append" @click.prevent="removeDomain(domain)">删除</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-circle-plus" size="small" type="primary" @click="addDomain">继续添加</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click='editFormVisible = false'>取消</el-button>
                <el-button :loading="loading" class="title" size="small" type="primary" @click="submitForm">保存</el-button>
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
            ruleForm: {
                name: '',
                domains: [ {
                    value: ''
                } ],
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
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
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    alert('submit!');
                }
            });
        },
        removeDomain(item) {
            const index = this.ruleForm.domains.indexOf(item)
            if (index !== -1) {
                this.ruleForm.domains.splice(index, 1)
            }
        },
        addDomain() {
            this.ruleForm.domains.push({
                value: '',
                key: Date.now()
            });
        },
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
.pleaseSelectLevel3Classification {
    margin-left: 10px;
    margin-bottom: 10px;
    
    p:first-child {
        font-size: 16px;
    }
    
    P:last-child {
        line-height: 28px;
        color: #317EF3;
    }
}

.user-search {
    margin-top: 20px;
}

.userRole {
    width: 100%;
}
</style>
