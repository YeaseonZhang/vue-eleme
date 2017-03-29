<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click="decreaseCart"></div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import eventHub from '../../eventHub';

  export default {

    props: {
      food: {
        type: Object
      }
    },
    created () {
    },
    methods: {
      addCart (event) {
        if (!event._constructed) { // 阻止非better-scroll（PC端）派生的点击事件
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        eventHub.$emit('cart-add', event.target);
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }

  };
</script>

<style lang="scss">
  .cartcontrol {
    font-size: 0;
    .cart-decrease {
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
      transition: all .4s linear;
      &.move-transition {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
      &.move-enter, &.move-leave {
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        transform: rotate(180deg);
      }

    }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
    .cart-add {
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
  }
</style>
