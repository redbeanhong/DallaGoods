<template>
  <div class="d-none d-sm-block">
    <p class="h3 text-center mb-3">結帳流程</p>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <ol class="nav nav-pills row align-items-center justify-content-between pe--none">
          <li class="nav-item">
            <router-link class="nav-link text-center" to="/customer_cart"
              >1.確認購物車</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-center" to="/customer_form"
              >2.填寫資料</router-link
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link text-center"
              href="#"
              :class="{ active: customerCheckout }"
              >3.確定付款方式</a
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-center last-child"
              to="/customer_finished"
              >4.完成訂購</router-link
            >
          </li>
        </ol>
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
