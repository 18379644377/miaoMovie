<template>
  <div class="search">
    <form action="/">
      <van-search v-model="value"
      @search="goSearch"
       placeholder="搜电影、搜影院" show-action/>
      <h2>{{data}}</h2>
    </form>
  </div>
</template>
<script>
import { Search } from "vant";
export default {
  name: "Search",
  data() {
    return {
      value: "",
      data: ""
    };
  },
  methods: {
    goSearch() {
      /* console.log(this.value)
      this.axios.get("/api/searchList?cityId=10$kw="+ this.value).then(res => {
        console.log(res);
        this.data = res.data;
      }); */
      this.data = '后台api崩溃了。。。';
    }
  },
  created() {},
  components: {
    [Search.name]: Search
  }
};
</script>

<style lang="less" scoped>
.search {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 90px;
  li{list-style: none}
  .van-search__action {
    color: #ff6700;
  }
  h2{
    color:red;
    margin-top:200px;
    text-align: center;
  }
}
.search .van-search {
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
}
</style>



