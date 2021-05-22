<template>
  <div>
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="#">
        <img src="../assets/logo.jpg" width="50" height="50" alt="LOGO" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active border-right">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
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

        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="#"><i class="fas fa-heart"></i></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><i class="fas fa-bell"></i></a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="cart"
              ><i class="fas fa-shopping-cart"></i></router-link>
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
