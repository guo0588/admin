<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据分析</el-breadcrumb-item>
        </el-breadcrumb>
        <div id="main" class="i-main-echarts"></div>
    </div>
</template>
<script>
import * as echarts from 'echarts';

export default {
    name: "index",
    mounted() {
        this.getMain()
    },
    methods: {
        getMain() {
            // 基于准备好的dom，初始化echarts实例
            const myChart = echarts.init(document.getElementById('main'));
            // 绘制图表
            const setOption = ({
               
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: [ '电子邮件', '联合广告', '视频广告', '直接的', '搜索引擎' ]
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [ '周一', '周二', '周三', '周四', '周五', '周六', '周天' ]
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '电子邮件',
                        type: 'line',
                        stack: 'Total',
                        data: [ 120, 132, 101, 134, 90, 230, 210 ]
                    },
                    {
                        name: '联合广告',
                        type: 'line',
                        stack: 'Total',
                        data: [ 220, 182, 191, 234, 290, 330, 310 ]
                    },
                    {
                        name: '视频广告',
                        type: 'line',
                        stack: 'Total',
                        data: [ 150, 232, 201, 154, 190, 330, 410 ]
                    },
                    {
                        name: '直接的',
                        type: 'line',
                        stack: 'Total',
                        data: [ 320, 332, 301, 334, 390, 330, 320 ]
                    },
                    {
                        name: '搜索引擎',
                        type: 'line',
                        stack: 'Total',
                        data: [ 820, 932, 901, 934, 1290, 1330, 1320 ]
                    }
                ]
            });
            myChart.setOption(setOption, false)
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }
    },
    
}
</script>
<style scoped>
.i-main-echarts {
    margin-top: 24px;
    width: 100%;
    height: 600px;
}
</style>
