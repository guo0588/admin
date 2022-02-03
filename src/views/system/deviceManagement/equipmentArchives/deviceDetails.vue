<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item to="/equipmentArchives">设备档案</el-breadcrumb-item>
            <el-breadcrumb-item to="/equipmentArchives/details">设备详情</el-breadcrumb-item>
            <el-breadcrumb-item>设备画像</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="i-deviceDetails">
            <div class="portrayal-content">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "deviceDetails"
}
</script>
<style lang="scss" scoped>
.i-deviceDetails {
    padding: 24px 24px 0 24px;
    box-sizing: border-box;
    .portrayal-content {
        
        box-sizing: border-box;
        position: relative;
        min-height: calc(100vh - 100px);
        //min-width: 46.875vw;
        //min-height: 31.25vw;
        width: 100%;
        background: url('../../../../assets/img/bgi2.png') no-repeat;
        background-size: 100% 100%;
        
        
    }
    
}
</style>
