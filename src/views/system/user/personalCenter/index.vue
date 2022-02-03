<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :lg="6" :md="8" :sm="24" :xl="5" :xs="24" style="margin-bottom: 10px">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>个人信息</span>
                    </div>
                    <div>
                        <div style="text-align: center">
                            <div class="el-upload">
                                <img alt=""
                                     class="avatar"
                                     src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                                     title="点击上传头像"
                                     @click="toggleShow">
                                <myUpload
                                    :modelValue.sync="show"
                                    @crop-upload-success="cropUploadSuccess"
                                />
                            </div>
                        </div>
                        <ul class="user-info">
                            <li>
                                <div style="height: 100%">
                                    <svg-icon icon-class="login" />
                                    登录账号
                                    <div class="user-right">admin</div>
                                </div>
                            </li>
                            <li>
                                <svg-icon icon-class="user1" />
                                用户昵称
                                <div class="user-right">管理员</div>
                            </li>
                            <li>
                                <svg-icon icon-class="dept" />
                                所属部门
                                <div class="user-right"> 技术部</div>
                            </li>
                            <li>
                                <svg-icon icon-class="phone" />
                                手机号码
                                <div class="user-right">13333333333</div>
                            </li>
                            <li>
                                <svg-icon icon-class="email" />
                                用户邮箱
                                <div class="user-right">12312312@qq.com</div>
                            </li>
                            <li>
                                <svg-icon icon-class="anq" />
                                安全设置
                                <div class="user-right">
                                    <a @click="passVisible = true">修改密码</a> <a @click="emailVisible = true">修改邮箱</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-card>
            </el-col>
            <el-col :lg="18" :md="16" :sm="24" :xl="19" :xs="24">
                <!--    用户资料    -->
                <el-card class="box-card">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="用户资料" name="first">
                            <el-form ref="form" :model="form" :rules="rules" label-width="65px" size="small" style="margin-top: 10px;">
                                <el-form-item label="昵称" prop="nickName">
                                    <el-input v-model="form.nickName" style="width: 35%" />
                                    <span style="color: #C0C0C0;margin-left: 10px;">用户昵称不作为登录使用</span>
                                </el-form-item>
                                <el-form-item label="手机号" prop="phone">
                                    <el-input v-model="form.phone" style="width: 35%;" />
                                    <span style="color: #C0C0C0;margin-left: 10px;">手机号码不能重复</span>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <el-radio-group v-model="form.sex" style="width: 178px">
                                        <el-radio label="男">男</el-radio>
                                        <el-radio label="女">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-button size="mini" type="primary" @click="doSubmit">保存配置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <!--    操作日志    -->
                        <el-tab-pane label="操作日志" name="second">
                            <el-table :data="data" style="width: 100%;">
                                <el-table-column label="行为" prop="description" />
                                <el-table-column label="IP" prop="requestIp" />
                                <el-table-column :show-overflow-tooltip="true" label="IP来源" prop="address" />
                                <el-table-column label="浏览器" prop="browser" />
                                <el-table-column align="center" label="请求耗时" prop="time">
                                    <template slot-scope="scope">
                                        <el-tag v-if="scope.row.time <= 300">{{ scope.row.time }}ms</el-tag>
                                        <el-tag v-else-if="scope.row.time <= 1000" type="warning">{{ scope.row.time }}ms</el-tag>
                                        <el-tag v-else type="danger">{{ scope.row.time }}ms</el-tag>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!--分页组件-->
                            <el-pagination
                                :current-page="10"
                                :total="100"
                                layout="total, prev, pager, next, sizes"
                                style="margin-top: 8px;"
                                @size-change="sizeChange"
                                @current-change="pageChange"
                            />
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
        <!--修改密码-->
        <el-dialog
            :visible.sync="passVisible"
            title="修改密码"
            width="30%"
        >
            <el-form ref="formPass" :model="formPass" :rules="rulesPass" label-width="88px" size="small">
                <el-form-item label="旧密码" prop="oldPass">
                    <el-input v-model="formPass.oldPass" auto-complete="on" style="width: 370px;" type="password" />
                </el-form-item>
                <el-form-item label="新密码" prop="newPass">
                    <el-input v-model="formPass.newPass" auto-complete="on" style="width: 370px;" type="password" />
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPass">
                    <el-input v-model="formPass.confirmPass" auto-complete="on" style="width: 370px;" type="password" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="passVisible = false">取 消</el-button>
                <el-button type="primary" @click="passSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <!--修改邮箱-->
        <el-dialog
            :visible.sync="emailVisible"
            title="修改邮箱"
            width="30%"
        >
            <el-form ref="formEmail" :model="formEmail" :rules="rulesEmail" label-width="88px" size="small">
                <el-form-item label="新邮箱" prop="email">
                    <el-input v-model="formEmail.email" auto-complete="on" style="width: 200px;" />
                    <el-button :disabled="isDisabled" :loading="codeLoading" size="small" @click="sendCode">{{ buttonName }}</el-button>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input v-model="formEmail.code" style="width: 320px;" />
                </el-form-item>
                <el-form-item label="当前密码" prop="pass">
                    <el-input v-model="formEmail.pass" style="width: 320px;" type="password" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="emailVisible = false">取 消</el-button>
                <el-button type="primary" @click="emailSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import myUpload from 'vue-image-crop-upload'
import { validEmail, isvalidPhone } from '@/utils/validate'

export default {
    name: 'Center',
    components: { myUpload },
    data() {
        // 自定义验证
        const validPhone = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入电话号码'))
            } else if (!isvalidPhone(value)) {
                callback(new Error('请输入正确的11位手机号码'))
            } else {
                callback()
            }
        }
        const confirmPass = (rule, value, callback) => {
            if (value) {
                if (this.form.newPass !== value) {
                    callback(new Error('两次输入的密码不一致'))
                } else {
                    callback()
                }
            } else {
                callback(new Error('请再次输入密码'))
            }
        }
        const validMail = (rule, value, callback) => {
            if (value === '' || value === null) {
                callback(new Error('新邮箱不能为空'))
            } else if (value === this.email) {
                callback(new Error('新邮箱不能与旧邮箱相同'))
            } else if (validEmail(value)) {
                callback()
            } else {
                callback(new Error('邮箱格式错误'))
            }
        }
        return {
            show: false,
            passVisible: false,
            emailVisible: false,
            activeName: 'first',
            saveLoading: false,
            form: { nickName: '', phone: '', sex: '' },
            data: [],
            rules: {
                nickName: [
                    { required: true, message: '请输入用户昵称', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, trigger: 'blur', validator: validPhone }
                ]
            },
            //密码
            formPass: { oldPass: '', newPass: '', confirmPass: '' },
            rulesPass: {
                oldPass: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ],
                confirmPass: [
                    { required: true, validator: confirmPass, trigger: 'blur' }
                ]
            },
            //    邮箱
            formEmail: { pass: '', email: '', code: '' },
            user: { email: '', password: '' }, codeLoading: false,
            buttonName: '获取验证码', isDisabled: false, time: 60,
            rulesEmail: {
                pass: [
                    { required: true, message: '当前密码不能为空', trigger: 'blur' }
                ],
                email: [
                    { required: true, validator: validMail, trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        toggleShow() {
            this.show = !this.show
        },
        handleClick(tab, event) {
            if (tab.name === 'second') {
            }
        },
        doSubmit() {
            if (this.$refs['form']) {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.saveLoading = true
                        // editUser(this.form).then(() => {
                        //     this.editSuccessNotify()
                        //     store.dispatch('GetInfo').then(() => {
                        //     })
                        //     this.saveLoading = false
                        // }).catch(() => {
                        //     this.saveLoading = false
                        // })
                    }
                })
            }
        },
        cropUploadSuccess(jsonData, field) {
            console.log(jsonData, field)
        },
        sizeChange() {
        },
        pageChange() {
        },
        passSubmit() {
            this.$refs['formPass'].validate((valid) => {
                if (valid) {
                    this.loading = true
                }
            })
        },
        sendCode() {
            if (this.form.email && this.form.email !== this.email) {
                this.codeLoading = true
                this.buttonName = '验证码发送中'
                const _this = this
            }
        },
        emailSubmit() {
            this.$refs['formEmail'].validate((valid) => {
                if (valid) {
                    this.loading = true
                }
            })
        },
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info {
    padding-left: 0;
    list-style: none;
    
    li {
        border-bottom: 1px solid #F0F3F4;
        padding: 11px 0;
        font-size: 13px;
    }
    
    .user-right {
        float: right;
        
        a {
            color: #317EF3;
            cursor: pointer;
        }
    }
}
</style>
