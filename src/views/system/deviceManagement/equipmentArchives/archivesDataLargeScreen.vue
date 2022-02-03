<template>
    <div>
        <video autoplay class="fillWidth" loop muted>
            <source src="@/assets/img/common_inventroy.4d0ff86.mp4" type="video/mp4" />
        </video>
    </div>
</template>
<script>
import screenFull from 'screenfull'

export default {
    name: "archivesDataLargeScreen",
    data() {
        return {}
    },
    mounted() {
        this.launchIntoFullscreen();
        document.addEventListener('fullscreenchange', this.fullscreenchangeFunc, false);
    },
    methods: {
        launchIntoFullscreen() {
            if (!screenFull.isEnabled) {
                this.$message({ message: '你的浏览器不支持全屏', type: 'warning' })
                return false
            }
            screenFull.toggle()
            
        },
        fullscreenchangeFunc() {
            const isFull = screenFull.isFullscreen || false;
            if (!isFull) {
                this.$router.back()
            }
        },
    },
    beforeDestroy() {
        //移除事件监听
        document.removeEventListener('fullscreenchange', this.fullscreenchangeFunc);
    },
    
}
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
    display: none !important;
    
}

.fillWidth {
    width: 100%;
    display: block;
    //height: 100%;
}
</style>
