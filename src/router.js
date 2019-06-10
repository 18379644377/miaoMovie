import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import { Loading } from 'vant';
import { Icon } from 'vant'
Vue.use(Router).use(Icon) .use(Loading)
Vue.filter("imgfilter", function(value) {
  return value.replace("w.h", "1000.1000");
});

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
       children:[
        {
          path: '/index',
          name: 'Index',
          component: () => import('./components/Index'),
           children:[
            
            {
              path: '/index/nowhot',
              name: 'Nowhot',
              component: () => import('./components/Nowhot.vue')
            },
            { 
              path: '/index',
              redirect:{name:'Nowhot'}
            },
            {
              path: '/index/futerhot',
              name: 'Futerhot',
              component: () => import('./components/Futerhot.vue'),
            },
            {
              path: '/city',
              name: 'City',
              component: () => import('./components/City')
            },
            {
              path: '/search',
              name: 'Search',
              component: () => import('./components/Search.vue')
            }
          ] 
        },
        {
          path:'/',
          redirect:{path:'/index'}
        },
        {
          path: '/movie',
          name: 'Movie',
          component: () => import('./components/Movie')
        },
        {
          path: '/myindex',
          name: 'Myindex',
          component: () => import('./components/Myindex')
        },
        {
          path: '/detaile/:id',
          name: 'Detaile',
          component: () => import('./components/Detaile')
        },
        {
          path: '/moviedeta/:mid',
          name: 'Moviedeta',
          component: () => import('./components/Moviedeta')
        }
      ]

    }
  ]
})
