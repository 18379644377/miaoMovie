<template>
  <div class="home">
    <div class="home-top">小喵影院</div>

    <van-tabbar v-model="active" active-color="#ff6700">
      <van-tabbar-item to="/index">
        <span>电影</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon1.active : icon1.normal">
      </van-tabbar-item>
      <van-tabbar-item to="/movie">
        <span>影院</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon2.active : icon2.normal">
      </van-tabbar-item>
      <van-tabbar-item to="/myindex">
        <span>我的</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon3.active : icon3.normal">
      </van-tabbar-item>
    </van-tabbar>
    <router-view/>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";

export default {
  name: "home",
  data() {
    return {
      active: 0,

      icon1: {
        normal: require("../assets/home1.png"),
        active: require("../assets/home2.png"),
        path: { name: "Index" }
      },
      icon2: {
        normal: require("../assets/home3.png"),
        active: require("../assets/home4.png"),
        path: { name: "Movie" }
      },
      icon3: {
        normal: require("../assets/home5.png"),
        active: require("../assets/home6.png"),
        path: { name: "Myindex" }
      }
    };
  },
  methods: {
    goState(path) {
      this.$router.push(path);
    }
  },
  created() {
    /* this.axios.get('/api/v2/movie/subject/26004132?apikey=0b2bdeda43b5688921839c8ecb20399b')
    .then((data) => {
      console.log(data)
    },() => {
      console.log('请求失败')
    })*/
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
};
</script>

<style lang="less" scoped>
.home {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  max-width: 640px;
}
// 顶部呈现栏
.home-top {
  position: fixed;
  width: 100%;
  text-align: center;
  background: rgba(255, 102, 0, 1);
  font-size: 17px;
  color: #fff;
  line-height: 40px;
  height: 40px;
  z-index: 10;
  max-width: 640px;
}
// 底部导航栏
.van-tabbar {
  position: fixed!important;
  width: 100%;
  max-width: 640px;
  border-top: 1px solid #eee;
  box-shadow: 1px 1px 5px #999;
  background: #fafafa;
  margin: 0 auto;
  left:0;
  right: 0;
}
img {
  width: 25px;
  height: 25px;
}
</style>
