/**
* 头部菜单
*/
<template>
    <div class="i-header">
        <div @click="toggle()">
            <i :class="collapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'" class="el-icon-s-f" />
        </div>
        <div class="i-header-right">
            <div class="i-header-function">
                <p class="i-header-bug">
                    <svg-icon class-name="i-header-bug-icon" icon-class="bug" />
                </p>
                <p @click="fullScreen">
                    <svg-icon :icon-class="isFullscreen ? 'onFullScreen' : 'fullScreen'" class="i-fullScreen" />
                </p>
            </div>
            <el-dropdown class="avatar-container right-menu-item hover-effect">
                <div class="avatar-wrapper">
                    <el-avatar size="medium" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="logout">
                        <span>退出登录</span>
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="layoutSettings">
                        <span>布局设置</span>
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="$router.push('/personalCenter')">
                        <span>个人中心</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import Cookies from "js-cookie";
import screenFull from 'screenfull'
import { mapGetters } from 'vuex'

export default {
    name: "navcon",
    computed: {
        ...mapGetters({
            collapsed: 'app/collapsed',
        })
    },
    data() {
        return {
            
            username: "admin",
            imgShow: require("../../assets/img/show.png"),
            imgSq: require("../../assets/img/sq.png"),
            user: {},
            isFullscreen: false
        };
    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
        this.destroy()
    },
    methods: {
        toggle() {
            this.$store.commit("app/COLLAPSE");
        },
        logout() {
            Cookies.remove("token"); // fail!
            this.$router.push("/");
        },
        fullScreen() {
            console.log(1231)
            if (!screenFull.isEnabled) {
                this.$message({ message: '你的浏览器不支持全屏', type: 'warning' })
                return false
            }
            screenFull.toggle()
        },
        change() {
            this.isFullscreen = screenFull.isFullscreen
        },
        init() {
            if (screenFull.isEnabled) {
                screenFull.on('change', this.change)
            }
        },
        destroy() {
            if (screenFull.isEnabled) {
                screenFull.off('change', this.change)
            }
        },
        layoutSettings() {
            this.$store.dispatch('settings/getSettings', true)
        }
    },
};
</script>
<style lang="scss" scoped>
.i-header {
    width: 100%;
    height: 60px;
    padding: 0 24px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    color: #fff;
    font-size: 20px;
    border-bottom: 1px solid #EBEDF0;
    z-index: 2;
    
    .el-icon-s-f {
        font-size: 26px;
        color: #334157;
    }
    
    
    .i-header-right {
        display: flex;
        align-items: center;
        
        .i-header-function {
            display: flex;
            align-items: center;
            
            .i-header-bug {
                width: 24px;
                height: 24px;
                margin-right: 10px;
                
                .i-header-bug-icon {
                    width: 100%;
                    height: 100%;
                    color: #F56C6C;
                    cursor: pointer;
                }
            }
            
            .i-fullScreen {
                color: #333333;
                cursor: pointer;
                margin-right: 24px;
            }
        }
        
        
        .avatar-container {
            margin-right: 24px;
            
            .avatar-wrapper {
                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
    
    
}
</style>
