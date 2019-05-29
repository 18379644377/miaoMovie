<template>
  <div class="movie">
    <!-- 搜索栏 -->
    <div class="home-box">
      <div class="index-addr">
        广州
        <van-icon name="arrow-down"/>
      </div>
      <van-search placeholder="请输入搜索关键词" v-model="value"/>
    </div>
    <!-- 电影院 -->
    <div class="movie-content">
      <div
        class="movie-box"
        @click="goState({name:'Detaile',params:{id:data.id}})"
        v-for="(data,index) in movieAddre"
        :key="index"
      >
        <div class="movie-name">
          <span class="title">{{data.nm}}</span>
          <span class="money">
            {{data.sellPrice}}
            <span>元起</span>
          </span>
        </div>
        <div class="movie-addr">{{data.addr}}</div>
        <div class="movie-card">
          <span v-if="data.tag.vipTag == 1" class="blue">退</span>
          <span v-if="data.tag.endorse == 1" class="blue">改签</span>
          <span v-if="data.tag.snack == 1 " class="yellow">小吃</span>
          <span v-if="data.tag.vipTag !=''" class="yellow">折扣卡</span>
          <span v-for="(item,index) in data.tag.hallType" :key="index" class="blue">{{item}}</span>
        </div>
        <div class="prefer" v-if="data.promotion.cardPromotionTag != ''">
          <span class="card">
            <img src="../assets/card.png">
          </span>
          <span class="subtract">{{data.promotion.cardPromotionTag}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Search } from "vant";

export default {
  name: "Movie",
  data() {
    return {
      value: "",
      movieAddre: ""
    };
  },
  created() {
    this.axios
      .get(
        "/maoyan/ajax/cinemaList?day=2019-05-21&offset=0&" +
          "limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&" +
          "serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1558440344295&cityId=20"
      )
      .then(
        data => {
          var movieAddr = JSON.stringify(data.data.cinemas);
          localStorage.setItem("movieAddrs", movieAddr);
          this.movieAddre = JSON.parse(localStorage.getItem("movieAddrs"));
          // console.log("data ==> ", this.movieAddre);
        },
        () => {
          window.console.log("请求失败");
        }
      );
  },
  methods: {
    goState(path) {
      this.$router.push(path);
    }
  },
  components: {
    [Search.name]: Search
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.movie {
  padding: 40px 0 50px 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow-x: hidden;
}
// 搜索栏
.movie .home-box {
  position: fixed;
  width: 100%;
  height: 45.0018px;
  color: #888;
  background: #f9f9f9;
  z-index: 9;
  font-size: 14px;

  // 地址栏
  .index-addr {
    width: 60.9988px;
    text-align: center;
    line-height: 45.0018px;
    padding: 0 10.0011px;
  }
  > div {
    float: left;
  }
  .van-search {
    width: 77%;
    background: #f9f9f9 !important;
    height: 45px;
    .van-search__content {
      background: #fff;
      border-radius: 30px;
    }
  }
}

// 电影院最大内容
.movie .movie-content {
  padding-top: 45px;
}
// 电影院样式
.movie .movie-box {
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  // 超出隐藏样式
  .title {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  // 标题盒子
  .movie-name {
    margin: 5px 0;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    // 标题
    .title {
      font-size: 17px;
      max-width: 270px;
      color: #444;
      float: left;
    }
    // 价格
    .money {
      display: block;
      font-size: 15px;
      color: #ff6700;
      float: left;
      // height: 23px;
      margin: 4px 0 0 5px;

      span {
        font-size: 11px;
      }
    }
  }
}
// 地址
.movie .movie-box .movie-addr {
  width: 100%;
  color: #777;
  font-size: 13px;
}
// 展示卡
.movie-card {
  margin: 4px 0;
  width: 100%;
  font-size: 9px;
  span {
    margin-left: 5px;
    padding: 0 3px;
  }
  .yellow {
    border: 1px solid #ff6700;
    color: #ff6700;
  }
  .blue {
    border: 1px solid #07c9fa;
    color: #07c9fa;
  }
}
.movie-card :first-child {
  margin-left: 0;
}
// 优惠介绍
.movie-box .prefer {
  width: 100%;
  padding: 2px 0;

  .subtract {
    color: #999;
    margin-left: 4px;
  }
  .card {
    display: inline-block;
    width: 15px;
    height: 14px;
    vertical-align: bottom; //底部对齐
  }
  .card img {
    width: 100%;
  }
}
</style>