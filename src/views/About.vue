<template>
    <div class="about">
        <!-- 要打印的区域 -->
        <div id="printMe">
            <p>今天的天气真好啊</p>
        </div>
        <!-- 打印的按钮，显示打印预览 -->
        <el-button v-print="printObj">打印</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            printObj: {
                id: "printMe",//打印区域 Dom ID  personalCenter
                popTitle: '打印页面标题文字',
                preview: true,
                extraCss: '',
                extraHead: '<meta http-equiv="Content-Language" content="zh-cn"/>,<style>  #printMe { width: 100%;} <style>'
                //  可以传进去 system  style tag 标签；注意要逗号分隔   解决特定区域不显示问题；
            },
            form: {}
        }
    },
}
</script>


