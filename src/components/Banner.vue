<template>
  <div>
    <div
      id="carouselExampleControls"
      class="carousel slide position-relative"
      data-ride="carousel"
    >
      <ul class="carousel-inner list-unstyled">
        <li class="carousel-item active">
          <img
            src="../assets/img/banner.jpg"
            class="w-100 d-none d-sm-block"
            alt="banner"
          />
          <img
            src="../assets/img/banner-sm.jpg"
            class="w-100 d-block d-sm-none"
            alt="banner"
          />
        </li>
        <li class="carousel-item">
          <img
            src="../assets/img/banner2.jpg"
            class="w-100 d-none d-sm-block"
            alt="banner"
          />
          <img
            src="../assets/img/banner-sm2.jpg"
            class="w-100 d-block d-sm-none"
            alt="banner"
          />
        </li>
        <li class="carousel-item">
          <img
            src="../assets/img/banner3.jpg"
            class="w-100 d-none d-sm-block"
            alt="banner"
          />
          <img
            src="../assets/img/banner-sm3.jpg"
            class="w-100 d-block d-sm-none"
            alt="banner"
          />
        </li>
      </ul>
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
      <div class="banner__scroll">
        <a href="#infobar"><span></span></a>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.banner__scroll {
  display: flex;
  justify-content: center;
  a {
    position: absolute;
    bottom: 10px;
    z-index: 2;
    display: inline-block;
    color: var(--primary);
    font: normal 400 20px/1 sans-serif;
    letter-spacing: 0.1em;
    text-decoration: none;
    transition: opacity 0.3s;
    padding-top: 60px;
    &:hover {
      opacity: 0.5;
    }
  }
  a span {
    position: absolute;
    top: 0;
    left: 50%;
    width: 30px;
    height: 50px;
    margin-left: -15px;
    border: 2px solid var(--primary);
    border-radius: 50px;

    &::before {
      position: absolute;
      top: 10px;
      left: 50%;
      content: '';
      width: 6px;
      height: 6px;
      margin-left: -3px;
      background-color: var(--primary);
      border-radius: 100%;
      animation: sdb10 2s infinite;
    }
  }
}

@keyframes sdb10 {
  0% {
    transform: translate(0, 0);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  80% {
    transform: translate(0, 20px);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
