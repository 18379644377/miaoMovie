<template>
  <div class="index">
    <div class="home-box">
        <router-link class="div" to="/city"><van-icon class="down" name="location-o" />
        {{getCity.nm}}</router-link>
        <router-link class="div" to="/index/nowhot">正在热映</router-link>
        <router-link class="div" to="/index/futerhot">即将上映</router-link>
        <router-link class="div" to="/search">
        搜索
            <van-icon name="search" class="search"/>
        </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "Index",
  computed:{
    getCity:function  (){
      return this.$store.state.city
    } 
  }
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.index {
  padding-top: 40.0007px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
}
// 导航栏
.home-box {
  position: sticky;
  width: 100%;
  height: 50.0018px;
  background: #fff;
  box-shadow: 2px 2.0017px 3.0007px #ddd;
  display: flex;
  box-sizing: border-box;
  z-index: 9;
  font-size: 14px;
  >.div  {
    width:20%;
    text-align: center;
    line-height: 50.0018px;
    padding: 0 10.0011px;
    color: #666;
    overflow: hidden;
    white-space: nowrap;
  }
  
  .down,.search {
    position: relative;
    top: 5px;
    font-size: 23.0009px;
    color: #ff6700;
  }
  .router-link-active{
   color: #ff6700;
   border-bottom:2px solid #ff6700;
 }
}
</style>
