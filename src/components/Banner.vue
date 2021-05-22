<template>
  <div>
    <div
      id="carouselExampleControls"
      class="carousel slide"
      data-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/banner.jpg" class="d-block w-100" alt="banner" />
        </div>
        <div class="carousel-item">
          <img src="../assets/banner2.jpg" class="d-block w-100" alt="banner" />
        </div>
        <div class="carousel-item">
          <img src="../assets/banner3.jpg" class="d-block w-100" alt="banner" />
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
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
