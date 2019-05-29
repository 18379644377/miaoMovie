<template>
    <div class="search">
       <form action="/">
        <van-search
            v-model="value"
            placeholder="搜电影、搜影院"
            show-action
        />
        </form>
    </div>
</template>
<script>
import { Search } from 'vant';
export default {
    name:'Search',
    data(){
        return{
            value:''
        }
    },
    components:{
        [Search.name]:Search
    }
}
</script>

<style lang="less" scoped>
.search{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top:90px; 
    .van-search__action{
        color: #ff6700;
    }
}
.search .van-search{
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
}
</style>



