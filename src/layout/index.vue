<template>
    <el-container class="index-con">
        <div v-if="withoutAnimation" class="drawer-bg" @click="handleClickOutside" />
        <el-aside :class="!$store.state.app.collapsed ? 'asideshow':'aside'">
            <i-left-nav></i-left-nav>
        </el-aside>
        <el-container class="main-con">
            <el-header class="index-header">
                <i-nav-con></i-nav-con>
            </el-header>
            <div v-if="tagsView" class="i-tags-content">
                <i-tags-view></i-tags-view>
            </div>
            <el-main>
                <el-card :style="styleVar" class="index-main">
                    <transition mode="out-in" name="fade-transform">
                        <router-view></router-view>
                    </transition>
                </el-card>
            </el-main>
        </el-container>
        <el-drawer
            :visible.sync="$store.state.settings.layoutSettingsDrawer"
            :with-header="false"
            direction="rtl"
            size="15%"
        >
            <i-settings></i-settings>
        </el-drawer>
        <!--  防止刷新后主题丢失  -->
        <theme-picker v-show="false" ref="theme" />
    </el-container>
</template>
<script>
// 导入组件
import INavCon from './components/Header.vue'
import ILeftNav from './components/LeftNav.vue'
import ITagsView from './components/TagsView.vue'
import ISettings from './components/Settings'
import ThemePicker from '@/components/ThemePicker'
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'

export default {
    name: 'index',
    // 注册组件
    components: {
        INavCon,
        ILeftNav,
        ITagsView,
        ISettings,
        ThemePicker
    },
    computed: {
        ...mapGetters({
            tagsView: 'settings/tagsView',
            withoutAnimation: 'settings/withoutAnimation'
        }),
        styleVar() {
            return { '--box-height': this.height + 'px' }
        }
    },
    watch: {
        screenWidth: {
            immediate: true,
            handler(newValue) {
                this.$store.commit("app/WINDOW_COLLAPSE", newValue);
            }
        },
        tagsView(val) {
            if (!val) {
                return this.height = 106
            }
            this.height = 140
        }
    },
    data() {
        return {
            drawer: true,
            screenWidth: document.body.clientWidth,
            height: 140,
        }
    },
    mounted() {
        const route = this.$route
        this.$store.dispatch('app/addVisitedViews', route);
        const that = this
        window.addEventListener("resize", function () {
            return (() => {
                window.screenWidth = document.body.clientWidth;
                that.screenWidth = window.screenWidth;
            })();
        });
        if (Cookies.get('theme')) {
            this.$refs.theme.theme = Cookies.get('theme')
            this.$store.dispatch('settings/changeSetting', {
                key: 'theme',
                value: Cookies.get('theme')
            })
        }
    },
    methods: {
        handleClickOutside() {
            this.withoutAnimation = false
        },
    },
}
</script>

