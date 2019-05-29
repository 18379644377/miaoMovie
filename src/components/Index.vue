<template>
  <div class="index">
    <div class="home-box">
      <div v-for="(item,index) in menus" :key="index" @click="goState(item,index)">
        <span :class="{active:item.isCheck}">{{item.title}}</span>
      </div>
      <van-icon name="search" @click="goRouter({name:'Search'})" class="search"/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";

export default {
  name: "Index",
  data() {
    return {
      active: 0,
      menus: [
        { title: "地区：广州", path: { name: "City" }, isCheck: false },
        { title: "正在热映", path: { name: "Nowhot" }, isCheck: true },
        { title: "即将上映", path: { name: "Futerhot" }, isCheck: false }
      ]
    };
  },
  methods: {
    goState(item, index) {
      if (this.active == index) {
        return;
      }
      this.menus[index].isCheck = true;
      this.menus[this.active].isCheck = false;
      this.active = index;
      this.$router.push(item.path);
    },
    goRouter(path) {
      this.$router.push(path);
    }
  },
  created() {},
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab
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
  color: #666;
  background: #fff;
  box-shadow: 0px 2.0017px 3.0007px #ddd;
  box-sizing: border-box;
  z-index: 9;
  font-size: 14px;
  > div {
    width:20%;
    display: inline-block;
    text-align: center;
    line-height: 50.0018px;
    padding: 0 10.0011px;
  }
  .van-icon-arrow-down {
    top: 2px;
  }
  span {
    display: inline-block;
  }
  .active {
    color: #ff6700;
    border-bottom: 2.0017px solid #ff6700;
  }
  .search {
    position: relative;
    top: 10.0011px;
    right: -29.9996px;
    width: 40.0007px;
    font-size: 25.0009px;
    color: #ff6700;
  }
}
</style>
