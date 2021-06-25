<template>
  <div>
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

    <main role="main">
      <div class="container">
        <router-view></router-view>
      </div>
    </main>

    <div class="container">
      <FooterSample></FooterSample>
    </div>
  </div>
</template>

<script>
import CustomerNavbar from '@/components/CustomerNavbar'
import Infobar from '@/components/Infobar'
import Banner from '@/components/Banner'
import AlertMessage from '@/components/AlertMessage'
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
