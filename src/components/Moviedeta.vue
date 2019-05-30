<template>
  <div class="moviedeta">
      <h1>movieId</h1>
  </div>
</template>
<script>
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
      console.log(this.value);
      this.axios.get("/api/detailmovie?movieId=345808").then(res => {
        console.log(res);
        this.data = res.data;
      });
    }
  },
  created() {
      this. goSearch()
  }
};
</script>
<style lang="less" scoped>
.moviedeta {
  padding-top: 89.9988px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  overflow-x: hidden;
  background: #fff;
}
</style>


