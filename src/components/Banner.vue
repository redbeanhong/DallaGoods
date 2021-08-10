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
      <div class="item--scroll">
        <a href="#infobar"><span></span></a>
      </div>
    </div>
  </div>
</template>
