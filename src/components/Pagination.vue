/**
* 分页组件
*/
<template>
    <div class="page-box">
        <el-pagination
            :current-page="childMsg.currentPage"
            :page-size="childMsg.pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :total="childMsg.total"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>
<script>
export default {
    name: 'Pagination',
    props: [ 'childMsg' ],
    data() {
        return {
            pageparm: {
                currentPage: this.childMsg.currentPage,
                pageSize: this.childMsg.pageSize
            }
        }
    },
    created() {
    },
    methods: {
        handleSizeChange(val) {
            /**
             * 子传父
             * 参数1 父元素方法
             * 参数2 数据
             */
            this.pageparm.pageSize = val
            this.$emit('callFather', this.pageparm)
        },
        handleCurrentChange(val) {
            /**
             * 子传父
             * 参数1 父元素方法
             * 参数2 数据
             */
            this.pageparm.currentPage = val
            this.$emit('callFather', this.pageparm)
        }
    }
}
</script>
<style>
.page-box {
    margin-top: 20px;
   height: 60px;
    text-align: right;
}
</style>
