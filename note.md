## Vuejs 核心思想

### 数据驱动

MVVM: M 是 数据， V 是 DOM ,VM 即 VUE实例。

### 组件化

扩展HTML元素，封装可重用代码

#### 组件设计原则

+ 页面上每个独立的可视/可交互区域视为一个组件
+ 每个组件对应一个工程目录，组件所需的各种资源在目录下**就近维护**
+ 页面是组件的容器，组件可以嵌套自由组合形成完整的页面

## Vue-cli

Vue-cli脚手架工具的功能：
+ 目录结构
+ 本地调试
+ 代码部署
+ 热加载
+ 单元测试

## 准备工作

+ 将svg矢量图标制作成字体文件

    使用**icomoon**工具，生成一个包

+ reset.css
    [Download](meyerweb.com/eric/tools/css/reset/)

## 项目实战

### 安装**SASS**
```
npm install sass-loader node-sass --save-dev
```

### Vue Router

https://router.vuejs.org/zh-cn/essentials/getting-started.html

#### 安装
`npm install vue-router`

#### 使用
```
// router.js
import Vue from 'vue';
import router from 'vue-router';

Vue.use(router);
export default new Router({
  routes: [
    // "/"根目录自动重定向到“/goods”
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    }
  ]
});
```
```
// HTML
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/goods">Go to Goods</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```
挂载到Vue实例上
```
import Vue from 'vue';
import App from './App';
import router from './router';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
```

### 移动端访问开发项目

将localhost,替换成`ifconfig/ipconfig`的本机IP,通过草料网将我们的链接生成二维码，微信扫码访问即可。

### 移动端1px边框

```
// 定义一个代码块
@mixin border-1px($color){
    position: relative;
    &:after {
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid $color;
        content: ' '
    }
}

// 媒体查询
@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5) {
    .border-1px {
        &::after {
            -webkit-transform: scaleY(0.7);
            transform: scaleY(0.7);
        }
    }
}

@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
    .border-1px {
        &::after {
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
        }
    }
}

// 使用
@include border-1px(rgba(7, 17, 27, 0.1));
```

### axios

组件中使用axios过程中偶遇bug
```
// error, can't set data
created: () => {
    var self = this;
    axios.get('/api/seller').then((res) => {
        if (res.data.errno === ERR_OK) { // success
            self.seller = res.data.data;
            console.log(self.seller);
        };
    });
}

// correct
created () {
    var self = this;
    axios.get('/api/seller').then((res) => {
        if (res.data.errno === ERR_OK) { // success
            self.seller = res.data.data;
            console.log(self.seller);
        };
    });
}
```

### 组件

#### 父子组件通信
```
<div class="parent">
    <v-header :seller="seller"></header>
    <!-- something -->
</div>

var parent = new Vue({
    el: '.parent',
    data: {
        seller: '...'
    }
})

<div class="child">
    <p>{{ seller.title }}</p>
</div>

var child = new Vue({
    el: '.child',
    // props 属性用于接收来自父组件的数据
    props: {
        seller: Object
    }
})
```
**注**：chrome最小`font-size`: 12px;

#### CSS -- 超出显示区域部分文字隐藏
```
{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```
+ `white-space`: 设置如何处理元素中的空白

**值**

normal: 连续的空白符会被合并，换行符会被当作空白符来处理。填充line盒子时，必要的话会换行。

pre: 连续的空白符会被保留。在遇到换行符或者`<br>`元素时才会换行。

nowrap: 和 normal 一样，连续的空白符会被合并。但文本内的换行无效。

pre-wrap: 连续的空白符会被保留。在遇到换行符或者`<br>`元素，或者需要为了填充line盒子时才会换行。

pre-line: 连续的空白符会被合并。在遇到换行符或者`<br>`元素，或者需要为了填充line盒子时会换行。

column0 | column1 | column2 | column3
------- | ------- | ------- | -------
 | 换行符 | 空格和制表符 | 文字转行
normal   | 合并 | 合并 | 转行
nowrap   | 合并 | 合并 | 不转行
pre      | 保留 | 保留 | 不转行
pre-wrap | 保留 | 保留 | 转行
pre-line | 保留 | 合并 | 转行

#### CSS Sticky footer布局

+ HTML
```
<div class="detail-wrapper clearfix">
  <div class="detail-main">
    // content
  </div>
</div>
<div class="detail-close">
  // close btn
  <i class="icon-close"></i>
</div>
```
+ SASS
```
.clearfix {
  display: inline-block;
  &:after {
    display: block;
    content: ".";
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
}

.detail-wrapper {
  min-height: 100%;
  .detail-main {
    padding-bottom: 64px;
  }
}

.detail-close {
  position: relative;
  width: 32px;
  height: 32px;
  margin: -64px auto 0 auto;
  clear: both;
  font-size: 32px;
}
```
#### 组件的使用

先引入，后注册
```
import star from 'components/star/star';

export default {
  data () {
    ...
  },

  methods: {
    ...
  },

  created () {
    ...
  }
  components: {
    star
  }
};
```
