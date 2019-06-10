<template>
  <div class="nowhot">
    <div @click="goState({name:'Moviedeta',params:{mid:data.id}})"
      class="nowhot-box"
      v-for="(data,index) in hotMovie"
      :key="index"
    >
      <div class="hot-img">
        <img :src="data.img|imgfilter()">
      </div>
      <div class="hot-text">
        <h3>
          <span class="title">{{data.nm}}</span>
          <span v-if="data.version != ''">
            <img src="../assets/3d.png">
          </span>
        </h3>
        <p v-if="data.sc == 0">暂无评分</p>
        <p v-else>
          观众评分
          <i>{{data.sc}}</i>
        </p>
        <p>主演：{{data.star}}</p>
        <!-- <p v-if="data.rating.details[1] == 0">暂无影片数据</p> -->
        <p>{{data.showInfo}}</p>
      </div>
      <div class="hot-btn">
        <button v-if="data.sc == 0" class="btn1">预售</button>
        <button v-else class="btn">购票</button>
      </div>
    </div>
    <van-loading v-show="isshow" type="spinner"/>
  </div>
</template>

<script>
import { Button } from "vant";
export default {
  name: "Nowhot",
  data() {
    return {
      hotMovie: "",
      isshow:true
    };
  },
  methods: {
    goState(path) {
      this.$router.push(path);
    }
  },
  created() {
      
      this.axios
        .get("/maoyan/ajax/movieOnInfoList?token=&limit=20&cityId=" + this.$store.state.city.id)
        .then(
          data => {
            this.isshow = false;
            var hotMovies = JSON.stringify(data.data.movieList);
            localStorage.setItem("hotmovie", hotMovies);
            this.hotMovie = JSON.parse(localStorage.getItem("hotmovie"));
            // console.log('data ==> ',this.hotMovie)
          },
          () => {
            window.console.log("请求失败");
          }
        );
      
  },
  components: {
    [Button.name]: Button
  }
};
</script>

<style scoped lang="less">
.nowhot {
  padding: 89.9988px 0 55px 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow-x: hidden;
}
// 盒子部分
.nowhot-box {
  font-size: 14px;
  width: calc(100% - 14.0008px);
  overflow: hidden;
  padding: 9px 14.0008px 8px 0;
  border-bottom: 1px solid #eee;
  // 图片部分
  .hot-img {
    margin: 0 7.0004px 0 14.9998px;
    img{
      width: 64px;
      height: 94px;
    }
  }
  div {
    float: left;
  }
  // 标题部分
  h3 {
    margin: 6px 0;
    font-size: 15px;
    .title {
      display: inline-block;
      max-width: 175px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    img {
      margin-left: 4px;
      width: 43px;
      height: 13px;
    }
  }
  // 文本部分
  p {
    font-size: 11.9991px;
    margin: 2px 0;
    max-width: 199.9998px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    i {
      font-size: 15.0008px;
      font-weight: bold;
      color: #f0ba08;
    }
  }

  // 按钮部分
  .hot-btn {
    float: right;
    margin: 29.9996px 0;
    button {
      font-size: 14.0008px;
      width: 51.9998px;
      height: 32.0013px;
      color: #fff;
      background: #ff6700;
      border-radius: 14.9998px;
      border: 0.999px solid #ff6700;
    }
    .btn1 {
      background: #0cbcf1;
      border: 0.999px solid #0cbcf1;
    }
  }
}
</style>