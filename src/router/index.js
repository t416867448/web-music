import Vue from 'vue'
import Router from 'vue-router'
import rank from 'components/rank/rank'
import recommend from 'components/recommend/recommend'
import search from 'components/search/search'
import singer from 'components/singer/singer'
import singersong from 'components/singersong/singersong'
Vue.use(Router)

export default new Router({
   mode: 'history',
   routes: [
      // redirect设置默认首次进入的页面
      {
         path: '/',
         redirect: 'recommend'
      },
      {
         path: '/rank',
         component: rank
      },
      {
         path: '/recommend',
         component: recommend
      },
      {
         path: '/search',
         component: search
      },
      {
         path: '/singer',
         component: singer,
         children: [{
            path: ':id',
            component: singersong
         }]
      }
   ]
})
