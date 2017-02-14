import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'

Vue.use(Router)

const Test = { template: '<div> test </div>' }

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }, {
      path: '/abc',
      name: 'test',
      component: Test
    }
  ]
})
