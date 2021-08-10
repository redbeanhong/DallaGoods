<template>
  <div>
    <AdminNavbar></AdminNavbar>
    <AlertMessage></AlertMessage>
    <div class="container-fluid">
      <div class="row">
        <Sidebar></Sidebar>
        <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4 pt-5">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import AlertMessage from '@/components/AlertMessage.vue'

export default {
  created () {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = `${token}` // 之後發送的每次請求，預設都會加入此欄位
  },
  components: {
    AdminNavbar,
    Sidebar,
    AlertMessage
  }
}
</script>
