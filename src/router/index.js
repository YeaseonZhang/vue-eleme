import Vue from 'vue';
import Router from 'vue-router';
import Goods from 'components/goods/goods';
import Ratings from 'components/ratings/ratings';
import Sell from 'components/sell/sell';

Vue.use(Router);

export default new Router({
  // 修改激活路由的默认css
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/sell',
      name: 'Sell',
      component: Sell
    }
  ]
});
