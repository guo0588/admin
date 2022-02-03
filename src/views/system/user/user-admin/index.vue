/**
* 系统管理 用户管理
*/
<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索筛选 -->
        <el-form :inline="true" :model="formInline" class="user-search">
            <el-form-item label="所属科室">
                <el-select v-model="formInline.isLock" placeholder="请选择" size="small">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="正常" value="N"></el-option>
                    <el-option label="已锁定" value="Y"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="账号">
                <el-input v-model="formInline.userName" placeholder="输入用户名" size="small"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="formInline.userMobile" placeholder="输入手机号" size="small"></el-input>
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="formInline.isLock" placeholder="请选择" size="small">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="正常" value="N"></el-option>
                    <el-option label="已锁定" value="Y"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" size="small" type="primary" @click="search">搜索</el-button>
                <el-button icon="el-icon-plus" size="small" type="primary" @click="handleEdit()">添加用户</el-button>
                <el-button icon="el-icon-upload" size="small" type="primary" @click="batchImport()">批量导入</el-button>
                <el-button size="small" type="danger" @click="batchDelete()">批量删除</el-button>
            </el-form-item>
        </el-form>
        <!--列表-->
        <el-table id="printMe" v-loading="loading" :data="userData" border element-loading-text="拼命加载中" highlight-current-row size="small" style="width: 100%;" @selection-change="selectChange">
            <el-table-column align="center" type="selection" width="50">
            </el-table-column>
            <el-table-column align="center" label="公司" min-width="60" prop="deptName" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" label="用户名" min-width="50" prop="userName" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" label="姓名" min-width="50" prop="userRealName" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" label="手机号" min-width="60" prop="userMobile" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" label="性别" min-width="50" prop="userSex" show-overflow-tooltip width="80">
            </el-table-column>
            <el-table-column align="center" label="邮件" min-width="70" prop="userEmail" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" label="修改时间" min-width="70" prop="editTime" show-overflow-tooltip>
                <template slot-scope="scope">
                    <div>{{ scope.row.editTime }}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="状态" min-width="40" prop="isLock" show-overflow-tooltip width="80">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.isLock==='N'?nshow:fshow" active-color="#13ce66" inactive-color="#ff4949" @change="editType(scope.$index, scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" min-width="170" show-overflow-tooltip width="325">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
                    <el-button size="mini" type="primary" @click="resetpwd(scope.$index, scope.row)">重置密码</el-button>
                    <el-button size="mini" type="primary" @click="dataAccess(scope.$index, scope.row)">数据权限</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
        <!-- 编辑界面 -->
        <el-dialog :title="title" :visible.sync="editFormVisible" top="20px" width="30%" @click='closeDialog("edit")'>
            <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px">
                <el-form-item label="姓名" prop="userName">
                    <el-input v-model="editForm.userName" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="userSex">
                    <el-radio v-model="editForm.userSex" label="男">男</el-radio>
                    <el-radio v-model="editForm.userSex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="所属科室" prop="roleId">
                    <el-select v-model="editForm.roleId" class="userRole" placeholder="请选择">
                        <el-option label="公司管理员" value="1"></el-option>
                        <el-option label="普通用户" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="授权科室" prop="userMobile">
                    <el-input v-model="editForm.userMobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="电子邮件" prop="userEmail">
                    <el-input v-model="editForm.userEmail" placeholder="请输入邮箱地址"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="userEmail">
                    <el-input v-model="editForm.userEmail" placeholder="请输入邮箱地址"></el-input>
                </el-form-item>
                <el-form-item label="职位名称" prop="userEmail">
                    <el-input v-model="editForm.userEmail" placeholder="请输入邮箱地址"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="userEmail">
                    <el-input v-model="editForm.userEmail" placeholder="请输入邮箱地址"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="userEmail">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-form-item>
                <el-form-item label="用户账号" prop="userEmail">
                    <el-input v-model="editForm.userEmail" placeholder="请输入邮箱地址"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="userEmail">
                    <el-input v-model="editForm.userEmail" placeholder="请输入邮箱地址"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
                <el-button :loading="loading" class="title" size="small" type="primary" @click="submitForm('editForm')">保存</el-button>
            </div>
        </el-dialog>
        <!-- 数据权限 -->
        <el-dialog :visible.sync="dataAccessshow" title="数据权限" width="30%" @click='closeDialog("perm")'>
            <el-tree ref="tree" :data="UserDept" :default-checked-keys="checkmenu" :props="defaultProps" default-expand-all="" node-key="id" show-checkbox>
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click='closeDialog("perm")'>取消</el-button>
                <el-button :loading="loading" class="title" size="small" type="primary" @click="menuPermSave">保存</el-button>
            </div>
        </el-dialog>
        <!-- 所属单位 -->
        <el-dialog :visible.sync="unitAccessshow" title="批量导入" width="30%" @click='closeDialog("unit")'>
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
               style="width: 100%"
                drag
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click='unitAccessshow = false'>取消</el-button>
                <el-button :loading="loading" class="title" size="small" type="primary" @click="unitAccessshow = false">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'

export default {
    data() {
        return {
            nshow: true, //switch开启
            fshow: false, //switch关闭
            loading: false, //是显示加载
            title: '添加用户',
            editFormVisible: false, //控制编辑页面显示与隐藏
            dataAccessshow: false, //控制数据权限显示与隐藏
            unitAccessshow: false, //控制所属单位隐藏与显示
            // 编辑与添加
            editForm: {
                userId: '',
                userName: '',
                userRealName: '',
                roleId: '',
                userMobile: '',
                userEmail: '',
                userSex: '',
                token: localStorage.getItem('logintoken')
            },
            // 部门参数
            unitparm: {
                userIds: '',
                deptId: '',
                deptName: ''
            },
            // 选择数据
            selectdata: [],
            // rules表单验证
            rules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                userRealName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                roleId: [ { required: true, message: '请选择角色', trigger: 'blur' } ],
                userMobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    {
                        pattern: /^1(3\d|47|5((?!4)\d)|7(0|1|[6-8])|8\d)\d{8,8}$/,
                        required: true,
                        message: '请输入正确的手机号',
                        trigger: 'blur'
                    }
                ],
                userEmail: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    {
                        pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                        required: true,
                        message: '请输入正确的邮箱',
                        trigger: 'blur'
                    }
                ],
                userSex: [ { required: true, message: '请选择性别', trigger: 'blur' } ]
            },
            // 删除用户
            seletedata: {
                ids: '',
                token: localStorage.getItem('logintoken')
            },
            // 重置密码
            resetpsd: {
                userId: '',
                token: localStorage.getItem('logintoken')
            },
            // 用户下线
            offline: {
                token: localStorage.getItem('logintoken')
            },
            // 请求数据参数
            formInline: {
                page: 1,
                limit: 10,
                deptId: '',
                userName: '',
                userMobile: '',
                isLock: ''
            },
            //用户数据
            userData: [],
            // 数据权限
            UserDept: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            // 选中
            checkmenu: [],
            //参数role
            saveroleId: '',
            // 分页参数
            pageparm: {
                currentPage: 1,
                pageSize: 10,
                total: 10
            }
        }
    },
    // 注册组件
    components: {
        Pagination
    },
    /**
     * 数据发生改变
     */
    watch: {},
    /**
     * 创建完毕
     */
    created() {
        this.getdata(this.formInline)
    },
    /**
     * 里面的方法只有被调用才会执行
     */
    methods: {
        // 获取数据方法
        getdata(parameter) {
            this.loading = true
            // 模拟数据开始
            let res = {
                code: 0,
                msg: null,
                count: 12,
                data: [
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
                    {
                        addUser: '1',
                        editUser: '4',
                        addTime: null,
                        editTime: 1527411586000,
                        userId: 4,
                        systemNo: 'ec',
                        userName: 'admin',
                        userPassword: '59ba8b7dda9ff79186311a5a9fa155ca',
                        userRealName: '超级管理员',
                        userSex: '女',
                        userMobile: '138123456789',
                        userEmail: 'huangxuekun@founder.com',
                        isLock: 'N',
                        deptId: 2,
                        deptName: 'xxxx',
                        roleId: 3
                    },
                    {
                        addUser: null,
                        editUser: null,
                        addTime: 1526275128000,
                        editTime: 1526284402000,
                        userId: 28,
                        systemNo: null,
                        userName: 'eee111',
                        userPassword: 'e10adc3949ba59abbe56e057f20f883e',
                        userRealName: '123111',
                        userSex: '男',
                        userMobile: '12354342345',
                        userEmail: '111232@qq.com',
                        isLock: 'N',
                        deptId: 4,
                        deptName: 'zxxxxx',
                        roleId: 1
                    },
                    {
                        addUser: null,
                        editUser: null,
                        addTime: 1526284533000,
                        editTime: 1526284533000,
                        userId: 37,
                        systemNo: null,
                        userName: 'ces',
                        userPassword: 'e10adc3949ba59abbe56e057f20f883e',
                        userRealName: 'sesfg',
                        userSex: '男',
                        userMobile: '12312312312',
                        userEmail: '122111111',
                        isLock: 'N',
                        deptId: 1,
                        deptName: 'xxxx',
                        roleId: 1
                    },
                    {
                        addUser: null,
                        editUser: null,
                        addTime: 1526285228000,
                        editTime: 1526285228000,
                        userId: 43,
                        systemNo: null,
                        userName: '22',
                        userPassword: 'e10adc3949ba59abbe56e057f20f883e',
                        userRealName: '22',
                        userSex: '男',
                        userMobile: '222',
                        userEmail: '222',
                        isLock: 'N',
                        deptId: 1,
                        deptName: 'xxxx',
                        roleId: 1
                    },
                    {
                        addUser: null,
                        editUser: null,
                        addTime: 1526448593000,
                        editTime: 1526448593000,
                        userId: 58,
                        systemNo: null,
                        userName: '1',
                        userPassword: 'e10adc3949ba59abbe56e057f20f883e',
                        userRealName: '1',
                        userSex: '女',
                        userMobile: '13607118810',
                        userEmail: '1@qq.com',
                        isLock: 'N',
                        deptId: 1,
                        deptName: 'xxxx',
                        roleId: 1
                    },
                    {
                        addUser: null,
                        editUser: null,
                        addTime: 1526452698000,
                        editTime: 1526520341000,
                        userId: 60,
                        systemNo: null,
                        userName: '222222222',
                        userPassword: 'e10adc3949ba59abbe56e057f20f883e',
                        userRealName: '222222222222',
                        userSex: '男',
                        userMobile: '13607118810',
                        userEmail: '111@qq.com',
                        isLock: 'N',
                        deptId: 1,
                        deptName: 'xxxx',
                        roleId: 1
                    },
                    {
                        addUser: null,
                        editUser: null,
                        addTime: 1526452731000,
                        editTime: 1526452731000,
                        userId: 61,
                        systemNo: null,
                        userName: '33333333333333',
                        userPassword: 'e10adc3949ba59abbe56e057f20f883e',
                        userRealName: '4444444444444444444',
                        userSex: '女',
                        userMobile: '13607118810',
                        userEmail: 'qqq@qq.com',
                        isLock: 'N',
                        deptId: 1,
                        deptName: 'xxxx',
                        roleId: 2
                    },
                    {
                        addUser: null,
                        editUser: null,
                        addTime: 1526452756000,
                        editTime: 1527128981000,
                        userId: 62,
                        systemNo: null,
                        userName: '211111111',
                        userPassword: 'e10adc3949ba59abbe56e057f20f883e',
                        userRealName: '21111111111',
                        userSex: '男',
                        userMobile: '13601478451',
                        userEmail: '222222@qq.com',
                        isLock: 'N',
                        deptId: 17,
                        deptName: 'v',
                        roleId: 2
                    }
                ]
            }
            this.loading = false
            this.userData = res.data
            // 分页赋值
            this.pageparm.currentPage = this.formInline.page
            this.pageparm.pageSize = this.formInline.limit
            this.pageparm.total = res.count
            // 模拟数据结束
            /***
             * 调用接口，注释上面模拟数据 取消下面注释
             */
            // 获取用户列表
            // userList(parameter).then(res => {
            //   this.loading = false
            //   if (res.success == false) {
            //     this.$message({
            //       type: 'info',
            //       message: res.msg
            //     })
            //   } else {
            //     this.userData = res.data
            //     // 分页赋值
            //     this.pageparm.currentPage = this.formInline.page
            //     this.pageparm.pageSize = this.formInline.limit
            //     this.pageparm.total = res.count
            //   }
            // })
        },
        // 分页插件事件
        callFather(parm) {
            this.formInline.page = parm.currentPage
            this.formInline.limit = parm.pageSize
            this.getdata(this.formInline)
        },
        //搜索事件
        search() {
            this.getdata(this.formInline)
        },
        // 修改type
        editType: function (index, row) {
            this.loading = true
            let parm = {
                lock: '',
                userId: '',
                token: localStorage.getItem('logintoken')
            }
            parm.userId = row.userId
            let lock = row.isLock
            if (lock == 'N') {
                parm.lock = 'Y'
            } else {
                parm.lock = 'N'
            }
            // 修改状态
            userLock(parm).then(res => {
                this.loading = false
                if (res.success == false) {
                    this.$message({
                        type: 'info',
                        message: res.msg
                    })
                } else {
                    this.$message({
                        type: 'success',
                        message: '状态修改成功'
                    })
                    this.getdata(this.formInline)
                }
            })
        },
        //显示编辑界面
        handleEdit: function (index, row) {
            this.editFormVisible = true
            if (row !== undefined && row !== 'undefined') {
                this.title = '修改用户'
                this.editForm.userId = row.userId
                this.editForm.userName = row.userName
                this.editForm.userRealName = row.userRealName
                this.editForm.roleId = row.roleId
                this.editForm.userMobile = row.userMobile
                this.editForm.userEmail = row.userEmail
                this.editForm.userSex = row.userSex
            } else {
                this.title = '添加用户'
                this.editForm.userId = ''
                this.editForm.userName = ''
                this.editForm.userRealName = ''
                this.editForm.roleId = ''
                this.editForm.userMobile = ''
                this.editForm.userEmail = ''
                this.editForm.userSex = ''
            }
        },
        // 编辑、添加提交方法
        submitForm(editData) {
            this.$refs[editData].validate(valid => {
                if (valid) {
                    // 请求方法
                    userSave(this.editForm)
                        .then(res => {
                            this.editFormVisible = false
                            this.loading = false
                            if (res.success) {
                                this.getdata(this.formInline)
                                this.$message({
                                    type: 'success',
                                    message: '数据保存成功！'
                                })
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: res.msg
                                })
                            }
                        })
                        .catch(err => {
                            this.editFormVisible = false
                            this.loading = false
                            this.$message.error('保存失败，请稍后再试！')
                        })
                } else {
                    return false
                }
            })
        },
        batchDelete(){
            this.$confirm('确定要删除吗?', '信息', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    // 删除
                    userDelete(row.id)
                        .then(res => {
                            if (res.success) {
                                this.$message({
                                    type: 'success',
                                    message: '数据已删除!'
                                })
                                this.getdata(this.formInline)
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: res.msg
                                })
                            }
                        })
                        .catch(err => {
                            this.loading = false
                            this.$message.error('数据删除失败，请稍后再试！')
                        })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除！'
                    })
                })
        },
        
        batchImport: function (index, row) {
            this.unitAccessshow = true
            
            
        },
        handleClick(data, checked, node) {
            if (checked) {
                this.$refs.tree.setCheckedNodes([])
                this.$refs.tree.setCheckedNodes([ data ])
                this.unitparm.deptId = data.id
                this.unitparm.deptName = data.name
                //交叉点击节点
            } else {
            }
        },
        // 保存部门
        unitPermSave() {
            let len = this.selectdata
            let ids = []
            if (len != 0) {
                for (let i = 0; i < len.length; i++) {
                    ids.push(len[i].userId)
                }
            }
            this.unitparm.userIds = ids.join(',')
            UserChangeDept(this.unitparm)
                .then(res => {
                    this.unitAccessshow = false
                    if (res.success) {
                        this.$message({
                            type: 'success',
                            message: '部门设置成功！'
                        })
                        this.getdata(this.formInline)
                    } else {
                        this.$message({
                            type: 'info',
                            message: res.msg
                        })
                    }
                })
                .catch(err => {
                    this.loading = false
                    this.$message.error('部门设置失败,请稍后再试！')
                })
        },
        // 选择复选框事件
        selectChange(val) {
            this.selectdata = val
        },
        // 关闭编辑、增加弹出框
        closeDialog(dialog) {
            if (dialog == 'edit') {
                this.editFormVisible = false
            } else if (dialog == 'perm') {
                this.dataAccessshow = false
            } else if (dialog == 'unit') {
                this.unitAccessshow = false
            }
        },
        // 删除用户
        deleteUser(index, row) {
            this.$confirm('确定要删除吗?', '信息', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    // 删除
                    userDelete(row.id)
                        .then(res => {
                            if (res.success) {
                                this.$message({
                                    type: 'success',
                                    message: '数据已删除!'
                                })
                                this.getdata(this.formInline)
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: res.msg
                                })
                            }
                        })
                        .catch(err => {
                            this.loading = false
                            this.$message.error('数据删除失败，请稍后再试！')
                        })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除！'
                    })
                })
        },
        // 重置密码
        resetpwd(index, row) {
            this.resetpsd.userId = row.userId
            this.$confirm('确定要重置密码吗?', '信息', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    userPwd(this.resetpsd)
                        .then(res => {
                            if (res.success) {
                                this.$message({
                                    type: 'success',
                                    message: '重置密码成功！'
                                })
                                this.getdata(this.formInline)
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: res.msg
                                })
                            }
                        })
                        .catch(err => {
                            this.loading = false
                            this.$message.error('重置密码失败，请稍后再试！')
                        })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消重置密码！'
                    })
                })
        },
        // 数据权限
        dataAccess: function (index, row) {
            this.dataAccessshow = true
            this.saveroleId = row.userId
            UserDeptTree(row.userId)
                .then(res => {
                    if (res.data.success) {
                        this.checkmenu = this.changemenu(res.data.data)
                        this.UserDept = this.changeArr(res.data.data)
                    } else {
                        this.$message({
                            type: 'info',
                            message: res.data.msg
                        })
                    }
                })
                .catch(err => {
                    this.loading = false
                    this.$message.error('获取权限失败，请稍后再试！')
                })
        },
        //数据格式化
        changeArr(data) {
            var pos = {}
            var tree = []
            var i = 0
            while (data.length != 0) {
                if (data[i].pId == 0) {
                    tree.push({
                        id: data[i].id,
                        name: data[i].name,
                        pId: data[i].pId,
                        open: data[i].open,
                        checked: data[i].checked,
                        children: []
                    })
                    pos[data[i].id] = [ tree.length - 1 ]
                    data.splice(i, 1)
                    i--
                } else {
                    var posArr = pos[data[i].pId]
                    if (posArr != undefined) {
                        var obj = tree[posArr[0]]
                        for (var j = 1; j < posArr.length; j++) {
                            obj = obj.children[posArr[j]]
                        }
                        obj.children.push({
                            id: data[i].id,
                            name: data[i].name,
                            pId: data[i].pId,
                            open: data[i].open,
                            checked: data[i].checked,
                            children: []
                        })
                        pos[data[i].id] = posArr.concat([ obj.children.length - 1 ])
                        data.splice(i, 1)
                        i--
                    }
                }
                i++
                if (i > data.length - 1) {
                    i = 0
                }
            }
            return tree
        },
        // 选中菜单
        changemenu(arr) {
            let change = []
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].checked) {
                    change.push(arr[i].id)
                }
            }
            return change
        },
        // 菜单权限-保存
        menuPermSave() {
            let parm = {
                userId: this.saveroleId,
                deptIds: ''
            }
            let node = this.$refs.tree.getCheckedNodes()
            let moduleIds = []
            if (node.length != 0) {
                for (let i = 0; i < node.length; i++) {
                    moduleIds.push(node[i].id)
                }
                parm.deptIds = JSON.stringify(moduleIds)
            }
            UserDeptSave(parm)
                .then(res => {
                    if (res.success) {
                        this.$message({
                            type: 'success',
                            message: '权限保存成功'
                        })
                        this.dataAccessshow = false
                        this.getdata(this.formInline)
                    } else {
                        this.$message({
                            type: 'info',
                            message: res.msg
                        })
                    }
                })
                .catch(err => {
                    this.loading = false
                    this.$message.error('权限保存失败，请稍后再试！')
                })
        },
        // 下线用户
        offlineUser(index, row) {
            this.$confirm('确定要让' + row.userName + '用户下线吗?', '信息', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    userExpireToken(row.userName)
                        .then(res => {
                            if (res.success) {
                                this.$message({
                                    type: 'success',
                                    message: '用户' + row.userName + '强制下线成功！'
                                })
                                this.getdata(this.formInline)
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: res.msg
                                })
                            }
                        })
                        .catch(err => {
                            this.loading = false
                            this.$message.error('用户下线失败，请稍后再试！')
                        })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
        },
    }
}
</script>
<style lang="scss" scoped>
::v-deep{
    .el-upload-dragger {
        width: 535px;
    }
}


.user-search {
    margin-top: 20px;
}
.userRole {
    width: 100%;
}
</style>


