<template>
  <div class="city">
    <div class="city-now" id="miao">
      <h2>定位城市</h2>
      <div class="nowCity">
        <span @click="bindCity(nowcity.nm,nowcity.id)">{{nowcity.nm}}</span>
      </div>
    </div>
    
      <div class="city-hot">
        <h2>热门城市</h2>
        <ul>
          <li v-for="(item,index) in hotLists" @click="bindCity(item.nm,item.id)" :key="index">{{item.nm}}</li>
        </ul>
      </div>
    
    <div ref="city_sort">
      <div v-for="(item,index) in cityList" :key="index" class="city-all">
        <h2>{{item.index}}</h2>
        <ul>
          <li v-for="(itm,idx) in item.list" @click="bindCity(itm.nm,itm.id)"  :key="idx">{{itm.nm}}</li>
        </ul>
      </div>
    </div>
    <div class="city-fixed">
      <ul>
        <a>
          <li>定位</li>
        </a>
        <a>
          <li>热门</li>
        </a>
        <li
          @touchstart="handleToIndex(index)"
          v-for="(item,index) in cityList"
          :key="index"
        >{{item.index}}</li>
      </ul>
    </div>
    <van-loading v-show="isshow" type="spinner"/>
  </div>
</template>

<script>
export default {
  name: "City",
  data() {
    return {
      cityList: "",
      hotLists: "",
      nowcity: "正在定位城市...",
      isshow:true
    };
  },
  methods: {
    // 城市传送
    bindCity(nm,id) {
      this.$store.state.city.nm = nm;
      this.$store.state.city.id = id; 
      this.$router.back()
    },
    // 城市排序分类
    formatCityList(cities) {
      var cityList = [];
      var hotLists = [];
      // 热门城市检索
      for (var i = 0; i < cities.length; i++) {
        if (cities[i].isHot == 1) {
          hotLists.push(cities[i]);
        }
      }
      this.hotLists = hotLists;
      for (var y = 0; y < cities.length; y++) {
        var firstLetter = cities[y].py.substring(0, 1).toUpperCase();
        if (toCom(firstLetter)) {
          cityList.push({
            index: firstLetter,
            list: [{ nm: cities[y].nm, id: cities[y].id }]
          });
        } else {
          for (var j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({ nm: cities[y].nm, id: cities[y].id });
            }
          }
        }
      }
      // 城市排序
      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1;
        } else if (n1.index < n2.index) {
          return -1;
        } else {
          return 0;
        }
      });
      // 城市分类
      function toCom(firstLetter) {
        // console.log(typeof cityList.index)
        for (var j = 0; j < cityList.length; j++) {
          if (cityList[j].index === firstLetter) {
            return false;
          }
        }
        return true;
      }
      this.cityList = cityList;
      console.log(hotLists);
    },
    handleToIndex(index) {
      var h2 = this.$refs.city_sort.getElementsByTagName("h2");
      this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
    },
    getCity() {
      this.axios.get("/api/getLocation").then(
        res => {
          //  console.log(res)
          var msg = res.data.msg;
          if (msg == "ok") {
            if(res.data.data.nm != null){
              this.nowcity = res.data.data;
              localStorage.setItem("city",JSON.stringify(this.nowcity));
              
            }
          }
        },
        () => {
          console.log("cuowu");
        }
      );
    }
  },
  created() {

    var cityList = localStorage.getItem('cityList');
    var hotLists = localStorage.getItem('hotLists');
    if(cityList && hotLists){
      this.isshow = false;
      this.cityList = JSON.parse(cityList) ;
      this.hotLists = JSON.parse(hotLists);
      
    }else{
      this.axios.get("/api/cityList").then(
        res => {
          this.isshow = false;
          var msg = res.data.msg;
          if (msg == "ok") {
            var cities = res.data.data.cities;
            this.formatCityList(cities);
              localStorage.setItem("cityList",JSON.stringify(this.cityList));
                localStorage.setItem("hotLists",JSON.stringify(this.hotLists));
          }
        },
        () => {
          console.log("cuowu");
        }
      );
    }
    
    this.getCity();
  },
  computed:{
    
  }
};
</script>

<style lang="less" scoped>
.city {
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eee;
  // padding-top: 90px;
  color: #666;
  overflow-x: hidden;

  .city-all li,
  .city-hot li {
    list-style: none;
    font-size: 16px;
    color: #666;
  }
  // 热门城市
  .city-hot li {
    display: inline-block;
    margin: 10px 20px 0 15px;
    padding: 5px 15px;
    text-align: center;
    background: #fff;
    border-radius: 10px;
  }
  // 所有城市
  .city-all li {
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    background: #f3f3f3;
    margin-left: 15px;
  }
  // 标题
  h2 {
    padding-left: 15px;
    background: #ddd;
    margin: 5px 0;
    font-weight: 500;
    color: #333;
  }
  .city-all ul,
  .city-fixed ul {
    padding-bottom: 15px;
    background: #eee;
  }
  .city-hot ul {
    padding-bottom: 15px;
    background: #f3f3f3;
  }
}
// 定位城市
.nowCity {
  font-size: 14px;
  height: 50px;
  background: #f3f3f3;
  line-height: 50px;
  span {
    background: #fff;
    padding: 5px 15px;
    margin-left: 15px;
    border-radius: 10px;
  }
}
// 浮动开头字母
.city .city-fixed {
  position: fixed;
  top: 120px;
  right: 5px;
  font-size: 12px;
  background: #eaeaea;
  li {
    text-align: center;
    margin-top: 1px;
  }
}
 
</style>


