<template>
  <div class="detaile">
    <van-nav-bar :title="moviename.nm" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="detaile-box">
      <div class="detaile-addr">
        <div class="title">{{moviename.nm}}</div>
        <div class="address">{{moviename.addr}}</div>
      </div>
      <div class="dtaile-icon">
        <van-icon name="location-o" size="26px" color="#ff6700"/>
      </div>
    </div>
    <!-- 电影信息 -->
    <div class="futer-box">
      <div class="futer-one">
        <div class="hot-img">
          <img :src="moviesing.img|imgfilter()" alt="加载失败">
        </div>
        <div class="hot-text">
          <h3>
            <span class="title">{{moviesing.nm}}</span>
          </h3>
          <p v-if="moviesing.sc == ''">暂无评分</p>
          <p v-else>
            观众评分
            <i>{{moviesing.sc}}</i>
          </p>
          <p>{{moviesing.desc}}</p>
        </div>
      </div>
    </div>
    <!-- 中间线 -->
    <div class="line"></div>
    <van-tabs>
      <van-tab v-for="(item,index) in shopcard" :title="item.showDate" :key="index">
        <div class="shop-card"
         v-for="(itm,idx) in item.plist" :key="idx">
          <div class="shopcard">
            <p class="time">{{itm.tm}}</p>
            <p>22:58散场</p>
          </div>
          <div class="shop-home">
            <p class="time">
              {{itm.lang}} {{itm.tp}}
            </p>
            <p>{{itm.th}}</p>
          </div>
          <div class="shop-money">
            <p class="money">
              <span class="money-one">￥{{parseInt(itm.vipPrice*1.3)}}</span>
              <span class="money-two">
                折扣卡￥{{itm.vipPrice}}
              </span>
            </p>
            <p class="card">{{itm.vipPriceNameNew}}免单</p>
          </div>
          <div class="shop-btn">
            <button>购票</button>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 中间xian -->
    <div class="line"></div>
    <!-- 爆米花 -->

    <div class="product-box">
      <div class="detaile-title">影院超值套餐</div>
      <div class="detaile-product"  v-for="(items,idx) in product" :key="idx">
        <div class="product-img">
          <img :src="items.imageUrl|imgfilter()" width="92px" height="92px">
        </div>
        <div class="product-text">
          <div class="title">
            <span v-if="items.recommendPersonNum == 2 " class="posnt">双人</span>
            <span v-else class="posnt">单人</span>
            {{items.title}}
          </div>
          <div class="text-money">{{items.price}}</div>
          <div class="text-hot">{{items.curNumberDesc}}</div>
          <div class="text-btn">
            <button>去购买</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from "vant";
import { Tab, Tabs } from "vant";
 import vue from "vue";
vue.filter("imgfilter", function(value) {
  return value.replace("w.h", "64.92");
}); 
export default {
  name: "Detaile",
  data() {
    return {
      shopcard: [],
      product: [],
      movie: null,
      moviename: "",
      moviesing:""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  },
  created() {
    this.axios.get("/maoyan/ajax/cinemaDetail?cinemaId=" + this.$route.params.id).then(
      data => { 
        // window.console.log(data.data);
        this.moviename = data.data.cinemaData;
        this.shopcard = data.data.showData.movies[1].shows;
        this.product = data.data.dealList.dealList;
        this.moviesing = data.data.showData.movies[1]
       
      },
      // cinemaDetail?cinemaId=17404&movieId=1254277
      // filterCinemas?movieId=1254277&day=2019-05-23
      // http://m.maoyan.com/ajax/movie?forceUpdate=1558581374674

      () => {
        window.console("cuowu");
      }
    );
  },
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
};
</script>

<style lang="less" scoped>
.detaile {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  max-width: 640px;
  background: #fff;
  overflow-x: hidden;
  // 顶部返回栏
  .van-hairline--bottom {
    background: #ff6700;
    .van-nav-bar__text,
    .van-icon,
    .van-ellipsis {
      color: #fff;
    }
  }
  
}
// 标题部分
.detaile .detaile-box {
  overflow-x: hidden;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
  .detaile-addr {
    width: 70%;
    float: left;
    .title {
      font-size: 17px;
      font-weight: 600;
      color: #444;
    }
    .address {
      color: #999;
    }
  }
  // 地址图标
  .dtaile-icon {
    float: right;
    width: 20%;
    border-left: 1px solid #ccc;
    text-align: center;
    margin: 4px 0;
  }
}
// 电影介绍
.detaile .futer-one {
  font-size: 14px;
  width: calc(100% - 14.0008px);
  overflow: hidden;
  padding: 9px 14.0008px 8px 0;
  border-bottom: 1px solid #eee;
  .hot-img {
    margin: 0 7.0004px 0 14.9998px;
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
      color: #f1310f;
    }
  }
  img{
    width: 64px;
    height: 92px;
  }
}
.line {
  height: 15px;
  background: #eee;
  width: 100%;
}
// 购票
.detaile .shop-card {
  display: flex;
  color: #888;
  padding: 10px 0 10px 15px;
  background: #fefefe;
  border-bottom: 1px solid #ddd;
  .shopcard {
    margin-right: 7px;
    .time {
      font-size: 18px;
      color: #000;
    }
  }

  p {
    margin: 5px 0;
  }
  // 时间
  .shop-time {
    width: 18%;
    padding: 0 15px;
    .time {
      font-size: 18px;
      color: #000;
    }
  }
  .shop-home {
    width: 25%;
    padding: 0 2px;
    .time {
      font-size: 14px;
      color: #000;
    }
  }
  .shop-money {
    width: 30%;
    padding: 0 2px;
    .money-one {
      display: inline-block;
      font-size: 16px;
      color: rgb(247, 68, 68);
    }
    .money-two {
      font-size: 10px;
      color: #fff;
      background: #ff6700;
      padding: 2px;
    }
  }
  .shop-btn {
    width: 25%;
    button {
      margin: 17px;
      border-radius: 10px;
      background: #ff6700;
      color: #fff;
      font-size: 15px;
      padding: 3px 6px;
      border: 1px solid #ff6700;
    }
  }
}
// 爆米花商品
.detaile .product-box {
  box-sizing: border-box;
  padding-left: 15px;
  width: 100%;
  .detaile-title {
    width: calc(100% - 15px);
    padding: 10px 0;
    margin-bottom: 5px;
    font-size: 14px;
    color: #666;
    border-bottom: 1px solid #ddd;
  }
  .product-img {
    margin-right: 8px;
  }
  .detaile-product {
    width: 100%;
    overflow: hidden;

    > div {
      float: left;
    }
  }
}
// 爆米花商品右边文本
.detaile .product-text {
  position: relative;
  width: 70%;
  height: 95px;
  box-sizing: border-box;
  // 标题
  .title {
    font-size: 14px;
    width: 100%;
    span {
      background: #ff6700;
      color: #fff;
      padding: 1px 5px;
      font-size: 10px;
      margin-right: 5px;
    }
  }
  // 价格
  .text-money {
    position: relative;
    bottom: -25px;
    color: #f1310f;
    font-size: 18px;
    width: 25%;
  }

  .text-hot {
    position: absolute;
    right: 8px;
    bottom: 42px;
    color: #888;
  }
  // 按钮
  .text-btn {
    position: absolute;
    right: 5px;
    bottom: 8px;
    button {
      border-radius: 10px;
      background: #ff6700;
      color: #fff;
      font-size: 15px;
      padding: 3px 6px;
      border: 1px solid #ff6700;
    }
  }
}
</style>


