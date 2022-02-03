<template>
    <fragment>
        <template v-for="menu in this.menuData">
            <el-submenu v-if="menu.children" :key="menu.path" :index="menu.path">
                <template slot="title">
                    <svg-icon :icon-class="menu.icon" class="i-svg-icon" />
                    <span slot="title">{{ menu.meta.title }}</span>
                </template>
                <menu-tree :menuData="menu.children"></menu-tree>
            </el-submenu>
            <el-menu-item v-else :key="menu.path" :index="menu.path ">
                <svg-icon v-if="menu.icon" :icon-class="menu.icon" class="i-svg-icon" />
                <span slot="title">{{ menu.meta.title }}</span>
            </el-menu-item>
        </template>
    </fragment>
</template>
<script>
export default {
    props: [ "menuData" ],
    name: "MenuTree",
    methods: {}
};
</script>
<style lang="scss">

</style>
