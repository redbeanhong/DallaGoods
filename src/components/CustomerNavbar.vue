<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-primary align-items-center bg-white"
    >
      <!-- LOGO -->
      <router-link class="navbar-brand order-1 mr-0" to="/"
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
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 nav--line align-items-start">
          <li class="nav-item px-2" @click="navClose">
            <router-link to="/customer_story" class="nav-link" href="#">
              <div class="d-flex align-items-center">
                <i class="fas icon--mid fa-book-open mr-3"></i>
                <p class="mb-0">
                  設計館故事
                </p>
              </div>
            </router-link>
          </li>
          <li class="nav-item px-2" @click="navClose">
            <router-link to="/customer_comment" class="nav-link" href="#">
              <div class="d-flex align-items-center">
                <i class="fas icon--mid fa-comment-dots mr-3"></i>
                <p class="mb-0">
                  購買評價
                </p>
              </div>
            </router-link>
          </li>
          <li class="nav-item px-2" @click="navClose">
            <router-link to="/customer_coupon" class="nav-link" href="#">
              <div class="d-flex align-items-center">
                <i class="fas icon--mid fa-ticket-alt mr-3"></i>
                <p class="mb-0">
                  領取優惠券
                </p>
              </div>
            </router-link>
          </li>
          <li class="nav-item px-2" @click="navClose">
            <router-link to="/customer_notice" class="nav-link" href="#">
              <div class="d-flex align-items-center">
                <i class="fas icon--mid fa-info-circle mr-3"></i>
                <p class="mb-0">
                  注意事項
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- END OF TITLE GROUP -->

      <!-- ICON GROUP -->
      <ul class="navbar-nav ml-auto mt-lg-0 flex-row order-2 order-lg-4">
        <!-- SELLS -->
        <li class="nav-item mr-2">
          <router-link class="nav-link nav-link-icon fa-stack" to="/admin">
            <i class="fas icon--mid fa-user-tie fa-stack-1x xfa-inverse"></i>
          </router-link>
        </li>
        <!-- END OF SELLS -->

        <!-- HEART -->
        <li class="nav-item mr-2">
          <router-link
            class="nav-link nav-link-icon fa-stack"
            to="/customer_orders/stared"
          >
            <i class="fas icon--mid fa-heart fa-stack-1x xfa-inverse"></i>
          </router-link>
        </li>
        <!-- END OF HEART -->

        <!-- MESSAGE -->
        <li
          class="nav-item mr-2 position-relative"
          v-on:mouseover="msgOpen = true"
          v-on:mouseleave="msgOpen = false"
        >
          <a
            class="nav-link nav-link-icon fa-stack"
            :class="{ 'icon--count': iconCount.msg > 0 }"
            href="#"
            :data-count="iconCount.msg"
            ><i class="fas icon--mid fa-bell fa-stack-1x xfa-inverse"></i
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
            :class="{ 'icon--count': iconCount.carts > 0 }"
            to="/customer_cart"
            :data-count="iconCount.carts"
          >
            <i
              class="fas icon--mid fa-shopping-cart fa-stack-1x xfa-inverse"
            ></i>
          </router-link>
        </li>
        <!-- END OF CART -->
      </ul>
      <!-- END OF ICON GROUP -->
    </nav>
  </div>
</template>

<script>
import DropdownMessage from './DropdownMessage.vue'

export default {
  data () {
    return {
      msgOpen: false,
      iconCount: {
        msg: 0,
        carts: 0
      },
      cart: { products: [] }
    }
  },
  methods: {
    iconUpdate (count, type) {
      this.iconCount[type] = count
    },
    getCart () {
      const vm = this
      let count = 0
      if (JSON.parse(localStorage.getItem('personalCart')) !== null) {
        vm.cart = JSON.parse(localStorage.getItem('personalCart'))

        count = vm.cart.products
          .map(item => item.num)
          .reduce((total, e) => {
            return total + e
          }, 0)
      }
      vm.iconUpdate(count, 'carts')
    },
    navClose () {
      const navBar = document.querySelector('#navbarTogglerDemo02')
      if ([...navBar.classList].includes('show')) {
        navBar.classList.remove('show')
      }
    }
  },
  components: {
    DropdownMessage
  },
  created () {
    const vm = this
    vm.$bus.$on('carts:Update', () => vm.getCart())
    vm.getCart()
  }
}
</script>
