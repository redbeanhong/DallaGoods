<template>
  <div class="d-flex flex-wrap" style="min-height:100vh;">
    <div class="container">
      <CustomerNavbar></CustomerNavbar>
    </div>

    <AlertMessage></AlertMessage>

    <div class="container">
      <Banner></Banner>
    </div>

    <div class="container">
      <Infobar></Infobar>
    </div>

    <div class="container">
      <main role="main">
        <router-view></router-view>
      </main>
    </div>

    <div class="container">
      <FooterSample></FooterSample>
    </div>
  </div>
</template>

<script>
import CustomerNavbar from '@/components/CustomerNavbar.vue'
import Infobar from '@/components/Infobar.vue'
import Banner from '@/components/Banner.vue'
import AlertMessage from '@/components/AlertMessage.vue'
import FooterSample from '@/components/FooterSample.vue'

export default {
  created () {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = `${token}` // 之後發送的每次請求，預設都會加入此欄位
  },
  components: {
    CustomerNavbar,
    Infobar,
    Banner,
    AlertMessage,
    FooterSample
  }
}
</script>
