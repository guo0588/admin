/**
* 左边菜单
*/
<template>
    <div>
        <div v-if="sidebarLogo" :class="!collapsed ? 'i-menu-title' : 'i-menu-title-s'">
            <img alt="" src="../../assets/logo.png" /> <span v-if="!collapsed">苏州未方智能医疗</span>
        </div>
        <el-menu
            :active-text-color="activeTextColor"
            :background-color="menuBackgroundColor"
            :collapse="collapsed"
            :default-active="routerActive"
            :style=" collapsed ? 'transition: none;': ''"
            class="el-menu-vertical-demo"
            collapse-transition
            router
            text-color="#fff"
            unique-opened
        >
            <menu-tree :menuData="menuList"></menu-tree>
        </el-menu>
    </div>
</template>
<script>
import MenuTree from "./MentTree";
import { mapGetters } from 'vuex'

export default {
    components: { MenuTree },
    computed: {
        ...mapGetters({
            collapsed: 'app/collapsed',
            menuList: 'app/menuList',
            activeTextColor: 'settings/activeTextColor',
            sidebarLogo: 'settings/sidebarLogo',
            menuBackgroundColor: 'settings/menuBackgroundColor',
        }),
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            return path
        },
    },
    watch: {
        activeMenu: {
            handler(val) {
                const r = val.split('/')[1]
                this.routerActive = '/' + r
            },
            immediate: true
        },
    },
    data() {
        return {
            routerActive: '',
        }
    },
};
</script>

