<template>
  <div>
    <div class="container">
      <navbar></navbar>
    </div>

    <alert></alert>

    <div class="container">
      <banner></banner>
    </div>

    <div class="container">
      <infobar></infobar>
    </div>

    <main role="main">
      <div class="container">
        <router-view></router-view>
      </div>
    </main>

    <div class="container">
      <footerinfo></footerinfo>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/CustomerNavbar";
import Infobar from "../components/Infobar";
import Banner from "../components/Banner";
import Alert from "../components/AlertMessage";
import Footerinfo from "../components/Footer.vue";

export default {
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.$http.defaults.headers.common.Authorization = `${token}`; //之後發送的每次請求，預設都會加入此欄位
  },
  components: {
    Navbar,
    Infobar,
    Banner,
    Alert,
    Footerinfo
  }
};
</script>
