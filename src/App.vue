<template>
    <div id="app">
        <router-view />
    </div>
</template>
<style lang="scss">
#app {
    height: 100%;
    background-color: #F2F3F5;
    min-width: 1440px;
    max-width: 1920px;
}

html, body {
    font-size: 14px;
    height: 100%;
    //height: 100%;
    
}

html, body,ul,li, p, h1, h2, h4, h5, h6, h3, ol, dl, td, dd, textarea, option, hr, button, fieldset, legend, figure {
    margin: 0;
    padding: 0;
   
    
    
}


a {
    text-decoration: none;
    color: #666;
}

li {
    list-style: none;
}

body {
    font: 14px "PingFangSC-Regular,PingFang SC";
}

img { /*display:block;*/
    border: none;
}


i, em {
    font-style: normal;
}


/* 滚动条的宽度 */
::-webkit-scrollbar {
    width: 6px;
    height: 10px;
}

/* 滚动条的滑块 */
::-webkit-scrollbar-thumb {
    background-color: #063b5a27;
    border-radius: 5px;
}





</style>
