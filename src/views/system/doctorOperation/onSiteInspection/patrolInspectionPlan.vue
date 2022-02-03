<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item to="onSiteInspection">巡检管理</el-breadcrumb-item>
            <el-breadcrumb-item>巡检计划</el-breadcrumb-item>
        </el-breadcrumb>
        <p class="page-title">巡检信息</p>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="170px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="计划名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="计划编号" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="巡检周期" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="计划状态" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="巡检类型" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="设备类型" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="巡检任务开始时间" prop="name">
                        <el-date-picker
                            v-model="ruleForm.region"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="巡检任务结束时间" prop="name">
                        <el-date-picker
                            v-model="ruleForm.region"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="执行方式" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="备注" prop="name">
                        <el-input v-model="ruleForm.desc" placeholder="请输入" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
            
            </el-row>
        </el-form>
        <p class="page-title">已选设备</p>
        <i-footer-btn>
            <template slot="btn">
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button>取消</el-button>
            </template>
        </i-footer-btn>
    </div>
</template>
<script>
import IFooterBtn from '@/components/FooterBtn'
export default {
    name: "patrolInspectionPlan",
    components:{ IFooterBtn},
    data() {
        return {
            ruleForm: {
                name: '',
                region: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
            },
        }
    },
    methods:{
        submitForm(){
        
        },
    }
}
</script>
<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 24px;
    
    ::v-deep {
        .el-select,.el-date-editor {
            width: 100%;
        }
    }
    
    padding-bottom: 24px;
}
</style>
