import Vue from 'vue'
import Vuex from 'vuex'
// import city from './city'

Vue.use(Vuex)

export default  new Vuex.Store({
    state: {
        // 登录切换
        islogin: false,
        // 城市管理
        city:{
            nm:'北京',
            id:1
        }
    },
    mutations: {
        changelo:state => {
            state.islogin = true;
        }
    },
    actions: {
       
    }
  })
  