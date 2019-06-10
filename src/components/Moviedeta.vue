<template>
  <div class="moviedeta">
    <van-nav-bar :title="movies.nm" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="deta-box">
      <div class="deta-one">
        <!--v-for="(data,index) in nearMovie" :key="index" -->
        <div class="hot-img">
          <img :src="movies.img|imgfilter">
        </div>
        <div class="hot-text">
          <h2>
            <span class="title">{{movies.nm}}</span>
          </h2>
          <p class="enm">{{movies.enm}}</p>
          <div class="deta-number">
            <van-rate v-model="value" allow-half void-icon="star"  readonly void-color="#eee"/>
            <span>{{movies.sc}}</span>
          </div>
          <p>({{movies.wish}}评价)</p>
          <p>{{movies.cat}}</p>
          <p>{{movies.src}}/{{movies.dur}}分钟</p>
          <p>{{movies.pubDesc}}</p>
        </div>
      </div>
    </div>
    <div class="deta-text">{{movies.dra}}</div>
    <div class="line"></div>
    <van-swipe :autoplay="2000">
      <van-swipe-item v-for="(image, index) in movies.photos" :key="index">
        <img :src="image|imgfilter">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from "vant";
import { NavBar } from "vant";
import { Rate } from "vant";
export default {
  name: "Search",
  data() {
    return {
      value: 4.5,
      movies: {
        photos: "",
        img:''
      }
    };
  },
  methods: {
    goSearch() {
      this.axios.get("/api/detailmovie?movieId=" + this.$route.params.mid).then(res => {
        // console.log(res.data.data.detailMovie);
        this.movies = res.data.data.detailMovie;
        this.value = res.data.data.detailMovie.sc / 2
      });
    },
    onClickLeft() {
      this.$router.back();
    }
  },
  created() {
    this.goSearch();
  },
  components: {
    [NavBar.name]: NavBar,
    [Rate.name]: Rate,
    [SwipeItem.name]: SwipeItem,
    [Swipe.name]: Swipe 
  }
};
</script>
<style lang="less" scoped>
.moviedeta {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  overflow-x: hidden;
  background: #fff;
  .van-hairline--bottom {
    background: #ff6700;
    .van-nav-bar__text,
    .van-icon,
    .van-ellipsis {
      color: #fff;
    }
  }
}
.moviedeta .deta-box {
  width: 100%;
  color: #eee;
  background-size: 700px;
  // filter: blur(7px);
  .deta-one {
    background-color: rgba(123, 131, 139, 0.9);
    height: 100%;
    display: flex;
    padding: 10px 0;
    h2 {
      color: #fff;
      margin: 0;
    }
    p {
      margin: 5px 0;
    }
    .enm{
      margin:0;
    }
    .deta-number {
      color: rgb(255, 210, 30);
      display: flex;
      font-size: 20px;
      span {
        margin-left: 5px;
      }
    }
  }
  .hot-img {
    width: 30%;
    margin: 0 10px;
    border: 1px solid #fff;
    img {
      width: 100%;
    }
  }
}
.moviedeta .deta-text {
  color: #666;
  font-size: 16px;
  padding: 0 15px;
  margin: 20px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.moviedeta .line {
  width: 100%;
  height: 15px;
  background: #eee;
}
.moviedeta .deta-img {
  img {
    width: 64px;
    height: 90px;
  }
}
.moviedeta .van-swipe img{
  width:100%;
  height: 200px;
}
</style>


