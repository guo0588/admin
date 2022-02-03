<template>
    <div class="i-new-plan">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/annualPlan' }">年度计划</el-breadcrumb-item>
            <el-breadcrumb-item>新建计划</el-breadcrumb-item>
        </el-breadcrumb>
        <!--计划表单-->
        <p class="page-title">计划内容</p>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="170px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="编制科室" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="使用科室" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="项目名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="项目简介" prop="desc">
                        <el-input v-model="ruleForm.desc" placeholder="请输入" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="项目金额测算说明" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="文件依据" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="数量" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="单价" prop="amountOfMoney">
                        <el-input v-model="ruleForm.amountOfMoney" placeholder="请输入">
                            <span slot="append">万元</span>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="预算金额合计" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入">
                            <span slot="append">万元</span>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="预计自筹" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入">
                            <span slot="append">万元</span>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="市本级财政拨款" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入">
                            <span slot="append">万元</span>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="是否为政府采购项目" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="采购方式" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="采购形式" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="项目属性" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :offset="2" :span="8">
                    <el-form-item label="是否编制项目目标绩效" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="备注" prop="name">
                        <el-input v-model="ruleForm.desc" placeholder="请输入" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <p class="page-title">计划报表</p>
        <div class="office-preview">
            <div class="office-con">
                <el-button icon="el-icon-download">
                    下载模板文件
                    <!--<a href="https://kedu-hospital.ajmd-med.com/static/template/项目年度预算绩效目标申报表.xls">下载模板文件</a>-->
                </el-button>
                <el-upload
                    :before-remove="beforeRemove"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    class="upload-demo"
                >
                    <el-button icon="el-icon-s-promotion" type="primary">导入文件</el-button>
                </el-upload>
            </div>
            <div class="office-iframe-con">
                <iframe class="office-iframe" src="https://view.officeapps.live.com/op/view.aspx?src=https://kedu-hospital.ajmd-med.com/static/template/项目年度预算绩效目标申报表.xls"></iframe>
            </div>
        </div>
        
        <i-footer-btn>
            <template slot="btn">
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button>取消</el-button>
            </template>
        </i-footer-btn>
    </div>
</template>
<script>
import { amountVerification } from '@/utils/filters'
import IFooterBtn from '@/components/FooterBtn'

export default {
    name: "index",
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
            fileList: [ {
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }, {
                name: 'food2.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            } ]
        }
    },
    mounted() {
        scrollTo(0, 800)
    },
    methods: {
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
        },
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
.i-new-plan {
    padding-bottom: 100px;
    
    .demo-ruleForm {
        margin-top: 24px;
        
        
        ::v-deep {
            .el-select {
                width: 100%;
            }
        }
        
        padding-bottom: 24px;
    }
    
    .office-preview {
        width: 100%;
        height: 800px;
        margin-top: 24px;
        padding: 0 48px 100px 48px;
        //padding-bottom: 100px;
        box-sizing: border-box;
        
        .office-con {
            display: flex;
            margin-bottom: 24px;
            
            .upload-demo {
                margin-left: 24px;
                
                ::v-deep .el-upload-list {
                    display: none;
                }
            }
            
        }
        
        .office-iframe-con {
            width: 100%;
            height: 100%;
            
            .office-iframe {
                width: 100%;
                height: 100%;
            }
        }
        
        
    }
    
    
}
</style>
