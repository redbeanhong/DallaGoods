<template>
  <div>
    <p class="h3 text-center mb-5">結帳流程</p>
    <div class="row justify-content-center">
      <div class="nav__container col-9 col-md-6">
        <ul class="nav--dot">
          <li class="nav__line"></li>
          <li>
            <router-link class="nav__item" to="/customer_cart">
              <span class="nav__link text-center">確認購物車</span></router-link
            >
          </li>
          <li>
            <router-link class="nav__item" to="/customer_form"
              ><span class="nav__link text-center">填寫資料</span></router-link
            >
          </li>
          <li>
            <a class="nav__item" href="#" :class="{ active: customerCheckout }"
              ><span class="nav__link text-center">確定付款方式</span></a
            >
          </li>
          <li>
            <router-link class="nav__item" to="/customer_finished"
              ><span class="nav__link text-center">完成訂購</span></router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      customerCheckout: false
    }
  },
  methods: {
    checkUrl () {
      const vm = this
      const url = vm.$route.path
      if (url.indexOf('customer_checkout') !== -1) {
        vm.customerCheckout = true
      } else {
        vm.customerCheckout = false
      }
    }
  },
  created () {
    this.checkUrl()
  }
}
</script>
