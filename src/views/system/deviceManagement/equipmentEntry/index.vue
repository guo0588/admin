/**
* 设备录入
*/
<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>设备录入</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索筛选 -->
        <el-form :inline="true" :model="form" class="user-search">
            <el-form-item label="所属科室：">
                <el-select v-model="form.name" placeholder="请选择科室" size="small">
                    <el-option label="全部" value="u"></el-option>
                    <el-option label="正常" value="N"></el-option>
                    <el-option label="已锁定" value="Y"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设备名称：">
                <el-input
                    placeholder="请输入设备名称"
                    size="small"
                >
                </el-input>
            </el-form-item>
            <el-form-item label="设备型号：">
                <el-input
                    placeholder="请输入设备型号"
                    size="small"
                >
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" size="small" type="primary" @click="search">搜索</el-button>
                <el-button icon="el-icon-circle-plus" size="small" type="primary" @click="editFormVisible = true">新建设备</el-button>
                <el-button icon="el-icon-upload" size="small" type="primary" @click="equipmentVisible = true">导入设备</el-button>
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
            <el-table-column align="center" label="设备名称" prop="deptName">
            </el-table-column>
            <el-table-column align="center" label="设备型号" prop="userName">
            </el-table-column>
            <el-table-column align="center" label="所属科室" prop="userRealName">
            </el-table-column>
            <el-table-column align="center" label="合同号" prop="userMobile">
            </el-table-column>
            <el-table-column align="center" label="维保服务商" prop="userSex">
            </el-table-column>
            <el-table-column align="center" label="设备生产商" prop="userEmail">
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
        <!--新建设备-->
        <el-dialog :visible.sync="editFormVisible" title="新建设备" width="40%">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="100px">
                <el-form-item label="合同号" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="所属科室" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域" style="width: 100%">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备型号" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="设备名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="生产设备商" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="维保服务商" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="设备单价" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="设备数量" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click='editFormVisible = false'>取消</el-button>
                <el-button :loading="loading" class="title" size="small" type="primary" @click="editFormVisible = false">保存</el-button>
            </div>
        </el-dialog>
        <!--导入设备-->
        <el-dialog :visible.sync="equipmentVisible" title="导入设备" width="60%">
            <el-tabs v-model="activeName">
                <el-tab-pane label="导入设备" name="first">
                    <el-upload
                        :before-remove="beforeRemove"
                        :file-list="fileList"
                        :limit="3"
                        :on-exceed="handleExceed"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        class="upload-demo"
                        multiple>
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-tab-pane>
                <el-tab-pane label="导入历史" name="second">
                    <el-table
                        border
                        :data="userData"
                    >
                        <el-table-column align="center" label="导入日期" prop="addUser"></el-table-column>
                        <el-table-column align="center" label="导入文件名" prop="addUser"></el-table-column>
                        <el-table-column align="center" label="导入结果" prop="addUser"></el-table-column>
                        <el-table-column align="center" label="总条数" prop="addUser"></el-table-column>
                        <el-table-column align="center" label="错误条数" prop="addUser"></el-table-column>
                        <el-table-column align="center" label="录入人员" prop="addUser"></el-table-column>
                        <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <!--<el-button size="small" @click='editFormVisible = false'>取消</el-button>-->
                <!--<el-button :loading="loading" class="title" size="small" type="primary" @click="editFormVisible = false">保存</el-button>-->
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
            equipmentVisible: false,
            activeName: 'first',
            fileList: [ {
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }, {
                name: 'food2.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            } ],
            ruleForm: {
                name: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
            },
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
        //上传
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        }
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


