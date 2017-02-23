<template>
  <div id="app">
    <v-header :seller="seller"></v-header>

    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/sell">商家</router-link>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  import axios from 'axios';
  import header from 'components/header/header';

  const ERR_OK = 0;
  
  export default {
    data: () => {
      return {
        seller: {}
      };
    },

    created () {
      var self = this;
      axios.get('/api/seller').then((res) => {
        if (res.data.errno === ERR_OK) { // success
          self.seller = res.data.data;
          console.log(self.seller);
        };
      });
    },

    components: {
      'v-header': header
    }
  };

</script>

<style lang="scss">
  @import "common/css/mixin.scss";

  #app {
    .tab {
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      // border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      @include border-1px(rgba(7, 17, 27, 0.1));
      .tab-item {
        flex: 1;
        text-align: center;
        a {
          /* 使得a标签，撑满整个元素，方便点击 */
          display: block;
          font-size: 14px;
          color: rgb(77, 85, 93);
          &.active {
            color: rgb(240, 20, 20)
          }
        }
      }
    }
  }

</style>
