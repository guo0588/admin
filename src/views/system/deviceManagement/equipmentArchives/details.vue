<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item to="/equipmentArchives">设备档案</el-breadcrumb-item>
            <el-breadcrumb-item>设备详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!--设备基本信息-->
        <div class="basicEquipmentInformation">
            <div class="basicEquipmentInformation-left">
                <h3>坐位体前屈测试仪</h3>
                <p>
                    深圳市恒康佳业科技有限公司&nbsp;&nbsp;｜&nbsp;&nbsp; HK-6000智能型&nbsp;&nbsp;｜&nbsp;&nbsp; 资产编码：32203990004-12-201507
                    <br> 归属科室：航天七三八疗养院 &nbsp;&nbsp;｜&nbsp;&nbsp; 二维码编号：738-068
                </p>
                <div class="status-con">
                    <span class="text">保修状态</span> <span class="green">其他在保&nbsp;&nbsp;2021.01.08-2022.01.07</span>
                    <span class="text">设备状态</span> <span class="green">正常使用</span> <span class="text">使用状态</span>
                    <span class="grey">非使用中</span> <span class="text">所在位置</span>
                    <span class="green">航天738-综合检查科-103</span></div>
            </div>
            <div class="basicEquipmentInformation-right">
                <el-button icon="el-icon-full-screen" type="primary" @click="changeLargeScreen"> 大屏</el-button>
                <el-button icon="el-icon-document" type="primary">关联文档</el-button>
                <el-button icon="el-icon-postcard" type="primary" @click="$router.push('/equipmentArchives/deviceDetails')"> 设备画像</el-button>
                <el-button icon="el-icon-s-operation" type="primary"> 设备生命树</el-button>
            </div>
        </div>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    name: "detail",
    data() {
        return {
            activeName: 'first',
        };
    },
    mounted() {
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        changeLargeScreen() {
            this.$router.push({ path: '/equipmentArchives/archivesDataLargeScreen' })
        },
    }
}
</script>
<style lang="scss" scoped>
.basicEquipmentInformation {
    padding: 24px;
    box-sizing: border-box;
    
    &-left {
        
        > h3 {
            
            margin: 0 0 5px 0;
            padding: 0;
            box-sizing: border-box;
            font-size: 24px;
            font-weight: 600;
            color: #345;
            
        }
        
        > p {
            
            margin: 0 0 15px 0;
            padding: 0;
            box-sizing: border-box;
            font-size: 14px;
            color: #345;
            line-height: 35px;
            
        }
        
        .status-con {
            
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            
            .text {
                
                margin: 0 7px 0 0;
                padding: 0;
                box-sizing: border-box;
                font-size: 14px;
                font-weight: 600;
                color: #345;
                
            }
            
            .green {
                
                margin: 0 14px 0 0;
                box-sizing: border-box;
                font-size: 14px;
                font-weight: 600;
                border-radius: .20833333333333334vw;
                padding: 6px;
                
                color: #67c23a;
                border: .052083333333333336vw solid #67c23a;
            }
        }
        
    }
    
    &-right {
        flex: 1;
        
    }
}

@media all and (min-width: 1660px) {
    .basicEquipmentInformation {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        &-right {
            
            margin-left: 100px;
        }
    }
}

@media screen and (max-width: 1660px) {
    .basicEquipmentInformation {
        &-right {
            margin-top: 24px;
        }
    }
}

.el-tabs {
    margin-top: 60px;
}
</style>
