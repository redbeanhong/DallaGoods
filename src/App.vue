<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
    this.$http.get(api).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style lang="scss">
  @import '~bootstrap/scss/bootstrap'
</style>
