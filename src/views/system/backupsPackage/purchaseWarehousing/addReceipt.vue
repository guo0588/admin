<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item to="/purchaseWarehousing">采购入库</el-breadcrumb-item>
            <el-breadcrumb-item>新增入库</el-breadcrumb-item>
        </el-breadcrumb>
        <p class="page-title">基本信息</p>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="170px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="采购申请单号" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="折旧分类" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="设备名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="设备通用名" prop="desc">
                        <el-input v-model="ruleForm.desc" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="设备品牌" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="设备型号" prop="desc">
                        <el-input v-model="ruleForm.desc" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="设备分类" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="行业分类" prop="desc">
                        <el-input v-model="ruleForm.desc" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="设备生产商" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="注册证号" prop="desc">
                        <el-input v-model="ruleForm.desc" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="设备产地" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="设备销售商" prop="desc">
                        <el-input v-model="ruleForm.desc" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="数量" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="设备序列号" prop="desc">
                        <el-input v-model="ruleForm.desc" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="设备购买金额" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="总金额" prop="desc">
                        <el-input v-model="ruleForm.desc" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="计量类型" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="是否计量" prop="desc">
                        <el-input v-model="ruleForm.desc" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="使用年限" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="保修年限" prop="desc">
                        <el-input v-model="ruleForm.desc" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="保修开始时间" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="保修结束时间" prop="desc">
                        <el-input v-model="ruleForm.desc" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="上传文件" prop="name">
                        <el-button>上传</el-button>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="备注" prop="desc">
                        <el-input v-model="ruleForm.desc" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">立即创建</el-button>
                <el-button @click="$router.back()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { amountVerification } from "@/utils/filters";
import IFooterBtn from '@/components/FooterBtn'

export default {
    name: "addReceipt",
    components: { IFooterBtn },
    data() {
        return {
            ruleForm: {
                name: '',
                desc: '',
                amountOfMoney: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                amountOfMoney: [
                    { required: true, message: '请输入', trigger: 'blur' },
                    { validator: amountVerification(), trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    this.$message({
                        message: '您有输入错误请查看！',
                        type: 'warning'
                    });
                    return false;
                }
            });
        },
    }
}
</script>
<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 24px;
    
    
    ::v-deep {
        .el-select {
            width: 100%;
        }
    }
    
    padding-bottom: 24px;
}
</style>
