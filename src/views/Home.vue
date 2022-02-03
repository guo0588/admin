<template>
    <div class="home">
        <el-button @click="handleFullScreen">点我全屏</el-button>
        我是首页
        <svg-icon icon-class="404" />
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <p>12312</p>
        <p>12312</p>
    </div>
</template>
<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "Home",
    components: {
        HelloWorld,
    },
    data() {
        return {
            fullscreen: false, // 是否全屏
            input: '',
            data: [
                {
                    key: '颜色',
                    list: [
                        { value: '红色' },
                        { value: '黑色' },
                        { value: '绿色' },
                    
                    ]
                },
                {
                    key: '材料',
                    list: [
                        { value: '水泥' },
                        { value: '钢管' },
                    
                    ]
                },
                {
                    key: '属性',
                    list: [
                        { value: '面积' },
                        { value: '长度' },
                    
                    ]
                },
            ],
        }
    },
    mounted() {
        this.sukFunction()
    },
    methods: {
        sukFunction() {
             // let const
            
            const data = this.data
            const res = data.reduce((pre, d) => {
                if (!pre.length) {
                    for (let i = 0; i < d.list.length; i++) {
                        pre.push({
                            sku: {
                                [d.key]: d.list[i].value
                            }
                        })
                    }
                    return pre
                }
                let obj = []
                for (let i = 0; i < pre.length; i++) {
                    for (let j = 0; j < d.list.length; j++) {
                        obj.push({
                            sku: {
                                ...pre[i].sku,
                                [d.key]: d.list[j].value
                            }
                        })
                    }
                }
                return obj
            }, [])
            console.log(res)

              /*let a = []
              let b = []
              let c = []
              a = data.length < 1 ? [] : data[0].list
              b = data.length < 2 ? [] : data[1].list
              c = data.length < 3 ? [] : data[2].list
              const arrA = []
              const arrB = []
              const arrC = []
              
              a.forEach((v) => {
                  arrA.push({
                      sku: { [data[0].key]: v.value },
                  })
                  b.forEach(item => {
                      arrB.push({
                          sku: {
                              [data[0].key]: v.value,
                              [data[1].key]: item.value
                          },
                      })
                      c.forEach(p => {
                          arrC.push({
                              sku: {
                                  [data[0].key]: v.value,
                                  [data[1].key]: item.value,
                                  [data[2].key]: p.value,
                              },
                              
                          })
                      })
                  })
              })
              const arr = data.length === 1 ? arrA : data.length === 2 ? arrB : data.length === 3 ? arrC : []
              console.log(arr)*/
              // this.ProductSkuList = arr
        },
        
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            // 判断是否已经是fullScreen
            // 如果是全屏，退出
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                console.log('已还原！');
            } else {    // 否则，进入全屏
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
                console.log('已全屏！');
            }
            // 改变当前全屏状态
            this.fullscreen = !this.fullscreen;
        }
    }
};
</script>
<style lang="scss" scoped>
.home {
    background-color: #fff;
    //height: 100px;
    //height: 100%;
}
</style>
