<template>
    <div class="tags-view-container">
        <el-tag
            v-for="tag in Array.from(visitedViews)"
            :key="tag.path"
            :class="isActive(tag)?'el-tag_active':''"
            :closable="Array.from(visitedViews).length!==1"
            :disable-transitions="false"
            :style="activeTextColor"
            @close="delSelectTag(tag)"
        >
            <router-link
                :to="tag.path"
                class="tags-view-item">
                <span>{{ tag.name }}</span>
            </router-link>
        </el-tag>
    </div>
</template>
<script>
export default {
    name: "TagsView",
    watch: {
        $route() {
            this.addViewTags();
        }
    },
    computed: {
        visitedViews() {//store中取值
            return this.$store.state.app.visitedViews
        },
        activeTextColor() {
            return { '--tage-color': this.$store.state.settings.activeTextColor }
        },
    },
    methods: {
        isActive(route) {
            return route.path === this.$route.path
        },
        addViewTags() {//路由改变时执行的方法
            if (this.$route.name) {
                const route = this.$route
                this.$store.dispatch('app/addVisitedViews', route);
            }
        },
        delSelectTag(view) {//先提交删除数据的方法,数组删除出掉数据后，如果关闭的是当前打开的路由需要将路由改为数组最后一次push进去的路由
            this.$store.dispatch('app/delVisitedViews', view).then((views) => {
                if (this.isActive(view)) {//只有在关闭当前打开的标签页才会有影响
                    let lastView = views.slice(-1)[0]//选取路由数组中的最后一位
                    if (lastView) {
                        this.$router.push(lastView.path);
                    }
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.tags-view-container {
    height: 34px;
    line-height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    padding: 0 24px;
    box-sizing: border-box;
    overflow: hidden;
    
    .el-tag {
        border-radius: 0;
        margin-right: 10px;
        
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        
        ::v-deep {
            .el-icon-close {
                color: #333333;
            }
            
            .el-icon-close:hover {
                background-color: #ffffff;
            }
        }
    }
    
    .el-tag_active {
        background-color: var(--tage-color);
        color: #fff;
        border-color: var(--tage-color);
        
        span {
            color: #ffffff;
        }
        
        ::v-deep {
            .el-icon-close {
                color: #ffffff;
            }
            
            .el-icon-close:hover {
                background-color: var(--tage-color);
            }
        }
        
        &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 8px;
        }
    }
    
    
    .tags-view-item {
        text-decoration: none;
        color: #666666;
    }
}
</style>
