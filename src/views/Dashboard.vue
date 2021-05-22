<template>
  <div>
    <navbar></navbar>
    <alert></alert>
    <div class="container-fluid">
      <div class="row">
        <sidebar></sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import Alert from "../components/AlertMessage.vue";

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
    Sidebar,
    Alert
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/helpers/dashboard";
</style>
