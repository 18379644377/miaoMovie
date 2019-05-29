<template>
  <div class="city">
    <div class="city-now">
      <h2>定位城市</h2>
      <div class="nowCity">
        <span>正在定位城市...</span>
      </div>
    </div>
    <div class="city-hot">
      <h2>热门城市</h2>
      <ul>
        <li>上海</li>
        <li>北京</li>
        <li>广州</li>
      </ul>
    </div>

    <div class="city-all">
      <h2>A</h2>
      <ul>
        <li>上海</li>
        <li>北京</li>
        <li>广州</li>
        <li>上海</li>
        <li>北京</li>
        <li>广州</li>
        <li>上海</li>
        <li>北京</li>
        <li>广州</li>
        <li>上海</li>
        <li>北京</li>
        <li>广州</li>
        <li>上海</li>
        <li>北京</li>
        <li>广州</li>
        <li>上海</li>
        <li>北京</li>
        <li id="miao">广州</li>
      </ul>
    </div>
    <div class="city-all">
      <h2>B</h2>
      <ul>
        <li>上海</li>
        <li>北京</li>
        <li>广州</li>
        <li>上海</li>
        <li>北京</li>
        <li>广州</li>
        <li>上海</li>
        <li>北京</li>
        <li>广州</li>
        <li>上海</li>
        <li>北京</li>
        <li>广州</li>
        <li>上海</li>
        <li>北京</li>
        <li>广州</li>
        <li>上海</li>
        <li>北京</li>
        <li id="miao">广州</li>
      </ul>
    </div>
    <div class="city-fixed">
      <ul>
        <li>定位</li>
        <li>热门</li>
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
        <li>E</li>
        <li>F</li>
        <li>G</li>
        <li>H</li>
        <li>A</li>
        <li>A</li>
        <li>A</li>
        <li>A</li>
        <li>A</li>
        <li>A</li>
        <li>A</li>
        <li>A</li>
        <li>A</li>
        <li>A</li>
        <li>A</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "City",
  created(){
    this.axios.get('/api/api_a.php?id=104').then(
      (res) => {
        console.log(res)
      },
      () => {
        console.log('cuowu')
      }
    )
  }
};
</script>

<style lang="less" scoped>
.city {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eee;
  padding-top:10px; 
  color: #666;
  overflow-x: hidden; 
  .city-hot li,
  .city-all li {
    list-style: none;
    font-size: 16px;
    display: inline-block;
    padding: 5px 20px;
    margin: 10px 20px 0 15px;
    text-align: center;
    background: #fff;
    border-radius: 10px;
    color: #666;
  }
  h2 {
    padding-left: 15px;
    background: #ddd;
    margin: 5px 0;
    font-weight: 500;
    color: #333;
  }
  ul {
    padding-bottom: 15px;
    background: #eee;
  }
}
.nowCity {
  font-size: 14px;
  height: 50px;
  background: #eee;
  line-height: 50px;
  span {
    background: #fff;
    padding: 5px 15px;
    margin-left: 15px;
    border-radius: 10px;
  }
}
.city .city-fixed {
  position: fixed;
  top: 120px;
  right: 5px;
  font-size: 14px;
  background: #eaeaea;
  li {
    text-align: center;
    margin-top: 2px;
  }
}
</style>


