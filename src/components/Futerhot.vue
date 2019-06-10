<template>
  <div class="futerhot">
    <div class="futer-box">
      <div class="futer-one" @click="goState({name:'Moviedeta',params:{mid:data.id}})"
       v-for="(data,index) in nearMovie" :key="index">
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
          <p>
            <i>{{data.wish}}</i> 人想看
          </p>
          <p>主演：{{data.star}}</p>
          <p>{{data.rt}}上映</p>
        </div>
        <div class="hot-btn">
          <button class="btn">预售</button>
        </div>
      </div>
    </div>
    <van-loading v-show="isshow" type="spinner"/>
  </div>
</template>

<script>
export default {
  name: "Futerhot",
  data() {
    return {
      nearMovie: "",
      isshow:true
    };
  },
  methods: {
    goState(path) {
      this.$router.push(path);
    }
  },
  created() {
    // this.touchImg()
    this.axios
      .get(
        "/maoyan/ajax/moreComingList?ci="+ this.$store.state.city.id+"&token=&limit=20&movieIds=1251411%2C1208258%2C1212449%2C246061%2C1238885%2C1225975%2C1215829%2C1281596%2C1226516%2C1279730"
      )
      .then(
        data => {
          this.isshow = false;
          var nearMovies = JSON.stringify(data.data.coming);
          localStorage.setItem("nearmovie", nearMovies);
          this.nearMovie = JSON.parse(localStorage.getItem("nearmovie"));
          // console.log('data ==> ',this.nearMovie)
        },
        () => {
          console.log("请求失败");
        }
      );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.futerhot {
  padding: 89.9988px 0 55px 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow-x: hidden;
}
.futer-one {
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
  // 照片部分
  img {
    height: 89.9988px;
    width: 63.9989px;
  }
  // 按钮部分
  .hot-btn {
    float: right;
    margin: 29.9996px 0;
    .btn {
      font-size: 14.0008px;
      width: 51.9998px;
      height: 32.0013px;
      color: #fff;
      background: #03a7da;
      border-radius: 14.9998px;
      border: 0.999px solid #03a7da;
    }
  }
}
</style>