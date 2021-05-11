<template>
  <div>
    <a href="#" @click.prevent="signout">送出</a>
  </div>
</template>

<script>
export default {
  created(){
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    this.$http.defaults.headers.common.Authorization = `${token}`//之後發送的每次請求，預設都會加入此欄位
  },
  methods: {
    signout:function() {
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then(res => {
        vm.$router.push("/login")
      });
    },
  }
};
</script>