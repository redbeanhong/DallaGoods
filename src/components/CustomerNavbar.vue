<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-primary align-items-center">
      <!-- LOGO -->
      <router-link class="navbar-brand order-1" to="/"
        ><img src="../assets/img/logo.jpg" width="50" height="50" alt="LOGO"
      /></router-link>
      <!-- END OF LOGO -->

      <!-- CLOSE -->
      <button
        class="navbar-toggler order-3 order-lg-2 ml-3"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- END OF CLOSE -->

      <!-- TITLE GROUP -->
      <div
        class="collapse navbar-collapse order-4 order-lg-3"
        id="navbarTogglerDemo02"
      >
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 nav-pills">
          <li class="nav-item border-right">
            <router-link class="nav-link" to="/customer_orders/all"
              >全部商品</router-link
            >
          </li>
          <li class="nav-item border-right">
            <router-link class="nav-link" to="/customer_orders/key_ring"
              >療癒配件</router-link
            >
          </li>
          <li class="nav-item border-right">
            <router-link class="nav-link" to="/customer_orders/earring"
              >小巧飾品</router-link
            >
          </li>
          <li class="nav-item border-right">
            <router-link class="nav-link" to="/customer_orders/tray"
              >居家生活</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/customer_orders/technology"
              >創意科技</router-link
            >
          </li>
        </ul>
      </div>
      <!-- END OF TITLE GROUP -->

      <!-- ICON GROUP -->
      <ul class="navbar-nav ml-auto mt-lg-0 flex-row order-2 order-lg-4">
        <!-- SELLS -->
        <li class="nav-item">
          <router-link class="nav-link nav-link-icon fa-stack" to="/admin">
            <i class="fas fa-user-tie fa-stack-1x xfa-inverse"></i>
          </router-link>
        </li>
        <!-- END OF SELLS -->

        <!-- HEART -->
        <li class="nav-item">
          <router-link
            class="nav-link nav-link-icon fa-stack"
            to="/customer_orders/stared"
          >
            <i class="fas fa-heart fa-stack-1x xfa-inverse"></i>
          </router-link>
        </li>
        <!-- END OF HEART -->

        <!-- MESSAGE -->
        <li
          class="nav-item position-relative"
          v-on:mouseover="msgOpen = true"
          v-on:mouseleave="msgOpen = false"
        >
          <a
            class="nav-link nav-link-icon fa-stack"
            :class="{ 'count-icon': iconCount.msg > 0 }"
            href="#"
            :data-count="iconCount.msg"
            ><i class="fas fa-bell fa-stack-1x xfa-inverse"></i
          ></a>
          <DropdownMessage
            :msgOpen="msgOpen"
            @msgCount="iconUpdate"
          ></DropdownMessage>
        </li>
        <!-- END OF MESSAGE -->

        <!-- CART -->
        <li class="nav-item">
          <router-link
            class="nav-link nav-link-icon fa-stack"
            :class="{ 'count-icon': iconCount.carts > 0 }"
            to="/customer_cart"
            :data-count="iconCount.carts"
          >
            <i class="fas fa-shopping-cart fa-stack-1x xfa-inverse"></i>
          </router-link>
        </li>
        <!-- END OF CART -->
      </ul>
      <!-- END OF ICON GROUP -->
    </nav>
  </div>
</template>

<script>
import DropdownMessage from './DropdownMessage'

export default {
  data () {
    return {
      msgOpen: false,
      iconCount: {
        msg: 0,
        carts: 0
      }
    }
  },
  methods: {
    iconUpdate (count, type) {
      this.iconCount[type] = count
    },
    getCart () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      let count = 0

      vm.$http.get(api).then(res => {
        if (res.data.data.carts[0]) {
          count = res.data.data.carts
            .map(item => item.qty)
            .reduce((total, e) => {
              return total + e
            }, 0)
        }
        vm.iconUpdate(count, 'carts')
      })
    }
  },
  components: {
    DropdownMessage
  },
  created () {
    const vm = this
    vm.$bus.$on('carts:Update', count => {
      if (count >= 0) {
        vm.iconUpdate(count, 'carts')
      } else {
        vm.getCart()
      }
    })
    vm.getCart()
  }
}
</script>

<style lang="scss">
.count-icon[data-count]:after {
  position: absolute;
  right: 10%;
  top: 30%;
  content: attr(data-count);
  font-size: 40%;
  padding: 0.4em;
  border-radius: 50%;
  line-height: 1em;
  color: var(--light);
  background: var(--danger);
  text-align: center;
  min-width: 1em;
}
</style>
