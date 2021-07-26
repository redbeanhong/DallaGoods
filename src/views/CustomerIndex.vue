<template>
  <div class="d-flex flex-wrap" style="min-height:100vh;">
    <CustomerNavbar
      class="w-100 position-fixed top-0"
      style="z-index: 99;"
    ></CustomerNavbar>

    <AlertMessage></AlertMessage>

    <Banner class="pt-5"></Banner>

    <div class="container-fluid border-bottom border-top mb-4">
      <Infobar></Infobar>
    </div>

    <div class="w-100">
      <main role="main">
        <router-view></router-view>
      </main>
    </div>

    <FooterSample class="w-100"></FooterSample>
  </div>
</template>

<script>
import CustomerNavbar from '@/components/CustomerNavbar.vue'
import Infobar from '@/components/Infobar.vue'
import Banner from '@/components/Banner.vue'
import AlertMessage from '@/components/AlertMessage.vue'
import FooterSample from '@/components/FooterSample.vue'

export default {
  components: {
    CustomerNavbar,
    Infobar,
    Banner,
    AlertMessage,
    FooterSample
  }
}
</script>
