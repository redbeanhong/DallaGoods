<template>
  <div>
    <nav
      class="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow navbar-expand-lg"
    >
      <a class="navbar-brand col-6 col-sm-3 col-lg-2 mr-0" href="#"
        ><img src="../assets/logo.jpg" width="30" height="30" alt="LOGO" />
        後臺系統</a
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
            <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    signout: function() {
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then(res => {
        vm.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar-brand {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

@media (min-width: 756px) {
  .navbar-brand {
    background-color: rgba(0, 0, 0, 0.25);
  }
}
.navbar .form-control {
  padding: 0.75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
</style>
