<template>
  <div>
    <nav
      class="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow navbar-expand-lg"
    >
      <router-link
        class="navbar-brand--admin col-6 col-sm-3 col-lg-2 mr-0"
        to="/admin"
        ><img src="../assets/img/logo.jpg" width="30" height="30" alt="LOGO" />
        後臺系統</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav px-3">
          <li class="nav-item d-md-none">
            <router-link class="nav-link" to="/admin/products"
              ><i class="fas fa-box-open mr-1"></i>產品列表</router-link
            >
          </li>
          <li class="nav-item d-md-none">
            <router-link class="nav-link" to="/admin/orderlist"
              ><i class="far fa-list-alt mr-1"></i>訂單列表</router-link
            >
          </li>
          <li class="nav-item d-md-none">
            <router-link class="nav-link" to="/admin/coupon"
              ><i class="fas fa-ticket-alt mr-1"></i>優惠券</router-link
            >
          </li>
          <li class="nav-item d-md-none">
            <router-link class="nav-link" to="/customer_orders"
              ><i class="fas fa-shopping-cart mr-1"></i>購物頁面</router-link
            >
          </li>
          <li class="nav-item text-nowrap">
            <a class="nav-link" href="#" @click.prevent="signout">登出</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    signout () {
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      const vm = this
      vm.$http.post(api).then(() => vm.$router.push('/login'))
    }
  }
}
</script>
