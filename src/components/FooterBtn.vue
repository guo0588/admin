<template>
    <div :class="$store.state.app.collapsed ? 'footer-btn': 'footer-btn-left'">
        <slot name="btn"></slot>
    </div>
</template>
<script>
export default {
    name: "FooterBtn"
}
</script>
<style lang="scss" scoped>
.btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #f1f4f7;
    height: 80px;
    line-height: 80px;
    text-align: right;
    padding-right: 300px;
    box-sizing: border-box;
    transition: left .2s;
    .el-button{
        width: 100px;
    }
    
}

.footer-btn {
    
    left: 65px;
    @extend .btn;
}

.footer-btn-left {
    
    left: 210px;
    @extend .btn;
}
</style>
