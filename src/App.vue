<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
 body{
  font-size: 12px!important;
} 
#app{
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0; 
  max-width: 640px;
  margin:0 auto;
}
.van-loading{
  margin: 200px auto;
  span{
    color: #ff6700;
  }
}
</style>
