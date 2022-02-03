<template>
    <div class="i-new-plan">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/purchaseRequisition' }">采购申请</el-breadcrumb-item>
            <el-breadcrumb-item>新建采购</el-breadcrumb-item>
        </el-breadcrumb>
        <!--计划表单-->
        <p class="page-title">计划内容</p>
        <div class="i-page-padding">
            <ul class="i-row-purchase">
                <li>
                    <el-checkbox v-model="checked">是否属于年度采够计划</el-checkbox>
                    <div v-show="checked">
                        <el-button style="margin-top: 24px" type="primary">添加计划</el-button>
                        <el-table
                            :data="tableData"
                            style="width: 100%;margin-top: 24px">
                            <el-table-column label="日期" prop="date"></el-table-column>
                            <el-table-column label="姓名" prop="name"></el-table-column>
                            <el-table-column label="地址" prop="address"></el-table-column>
                        </el-table>
                    </div>
                </li>
                <li>
                    <el-checkbox v-model="checked1">是否大于10万</el-checkbox>
                    <div v-show="checked1">
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
                    </div>
                </li>
                <li>
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="是否政府采购"></el-checkbox>
                        <el-checkbox label="是否进口设备"></el-checkbox>
                    </el-checkbox-group>
                    <div v-show="checkList.length === 2">
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
                                <iframe class="office-iframe" src="https://view.officeapps.live.com/op/view.aspx?src=https://kedu-hospital.ajmd-med.com/static/template/政府采购进口产品申请表.doc"></iframe>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="95px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="申请科室" prop="name">
                            <el-select v-model="ruleForm.region" placeholder="请选择">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="2" :span="8">
                        <el-form-item label="申请人" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="申请人电话" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="2" :span="8">
                        <el-form-item label="申请日期" prop="desc">
                            <el-date-picker
                                v-model="ruleForm.desc"
                                placeholder="选择日期"
                                type="date">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="设备名称" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="2" :span="8">
                        <el-form-item label="设备型号" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="现有数量" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="2" :span="8">
                        <el-form-item label="申请数量" prop="amountOfMoney">
                            <el-input v-model="ruleForm.amountOfMoney" placeholder="请输入">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="预算单价" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="2" :span="8">
                        <el-form-item label="预算总金额" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="计划类型" prop="name">
                            <el-select v-model="ruleForm.region" placeholder="请选择">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="2" :span="8">
                        <el-form-item label="年度" prop="name">
                            <el-date-picker
                                v-model="ruleForm.region"
                                placeholder="选择年"
                                type="year">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="申购理由" prop="name">
                            <el-input v-model="ruleForm.desc" placeholder="请输入" type="textarea"></el-input>
                            <span>备注：主要指临床现状，需求理由，用途功能等。</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="situation">
                <p>申购设备基本情况</p>
                <p class="situation-2">可收费项目,
                    <el-input></el-input>
                    项，平均收费标准
                    <el-input />
                    元
                </p>
                <p class="situation-3">收费编码：
                    <el-input></el-input>
                </p>
                <p class="situation-4"> 是否需要配套耗材，
                    <el-radio v-model="radio" label="1">是</el-radio>
                    <el-radio v-model="radio" label="2">否</el-radio>
                    <span>根据市非营利性医疗机构服务价格规定</span>
                </p>
                <el-table
                    :data="tableData"
                    header-row-class-name="recommendedBrand" style="width: 100%;margin-top: 24px">
                    <el-table-column align="center" label="推荐品牌">
                        <el-table-column prop="date"></el-table-column>
                        <el-table-column prop="name"></el-table-column>
                        <el-table-column prop="address"></el-table-column>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="footer-btn">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button>取消</el-button>
        </div>
    </div>
</template>
<script>
import { amountVerification } from '@/utils/filters'

export default {
    name: "index",
    data() {
        return {
            checked: false,
            checked1: false,
            radio: '1',
            checkList: [],
            tableData: [ {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            } ],
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
    .i-page-padding {
        padding: 0 48px;
        
        .i-row-purchase {
            > li {
                padding: 25px 0;
                border-bottom: 1px solid #dcdfe6;
            }
        }
        
        .office-preview {
            width: 100%;
            height: 600px;
            margin-top: 24px;
            padding-bottom: 100px;
            
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
        
        .demo-ruleForm {
            margin-top: 24px;
            
            
            ::v-deep {
                .el-select, .el-date-editor {
                    width: 100%;
                }
            }
            
            padding-bottom: 24px;
        }
        
        .situation {
            p {
                font-size: 16px;
                color: black;
                line-height: 60px;
            }
            
            .situation-1 {
                display: flex;
                align-items: center;
            }
            
            .situation-2 {
                @extend .situation-1;
                
                .el-input {
                    width: 50px;
                    margin: 0 10px;
                }
            }
            
            .situation-3 {
                @extend .situation-1;
                
                .el-input {
                    width: 200px;
                    margin: 0 10px;
                }
            }
            
            .situation-4 {
                @extend .situation-1;
                
                > span {
                    color: #789;
                    font-size: 14px;
                }
                
                .el-radio {
                    span {
                        font-size: 16px;
                        color: black;
                    }
                    
                    
                }
            }
        }
        
        ::v-deep .recommendedBrand:last-child {
            display: none;
        }
        
    }
    
    
    .footer-btn {
        margin: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
}
</style>
