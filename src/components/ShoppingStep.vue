<template>
  <div>
    <div id="wine-shop">
      <p class="h3 text-center mb-3">結帳流程</p>
      <div class="row justify-content-center">
        <div class="col-md-10">
          <ol class="nav nav--arrow row align-items-center flex-wrap">
            <li class="nav-item col-6 col-xl-3 p-0 mb-3 mb-xl-0">
              <router-link class="nav-link text-center" to="/customer_cart"
                >確認購物車</router-link
              >
            </li>
            <li class="nav-item col-6 col-xl-3 p-0 mb-3 mb-xl-0">
              <router-link class="nav-link text-center" to="/customer_form"
                >填寫資料</router-link
              >
            </li>
            <li class="nav-item col-6 col-xl-3 p-0">
              <a
                class="nav-link text-center"
                href="#"
                :class="{ active: customerCheckout }"
                >確定付款方式</a
              >
            </li>
            <li class="nav-item col-6 col-xl-3 p-0">
              <router-link
                class="nav-link text-center last-child"
                to="/customer_finished"
                >完成訂購</router-link
              >
            </li>
          </ol>
        </div>
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
