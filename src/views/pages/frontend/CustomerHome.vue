<template>
  <div>
    <section class="container mb-3" id="news">
      <div class="row">
        <div class="col-md-4 about2 img mb-3 mb-md-0"></div>
        <div class="col-md-8">
          <h3 class="mb-5">[ Dalla 新訊 ]</h3>
          <p>
            這是來自Dalla Goods 的最新消息。<br />
            首先，先謝謝各位在這一年度對Dalla
            Goods的支持，您的信任讓我們更有勇氣。<br /><br />
            本年度的支持力道已超出我們預計，我們所獲得的已足夠讓我們得以穩定的生活。<br />
            為了感謝支持的大眾，我們決定拿出我們餘裕，在今年度即將舉辦免費的公益活動。<br />
            目前已與陽光閃耀基金會聯繫，將於偏鄉小學舉行免費的手作體驗半日營，預計與100位偏鄉小朋友共度愉快的上午。<br />
            是您的支持讓我們得以實現我們的理念，不斷傳達愛與藝術。<br /><br />
            未來我們將繼續努力，期望您能繼續與我們同行。
          </p>
        </div>
      </div>
    </section>
    <section class="about img py-5 mb-4" id="about">
      <div class="container">
        <h3 class="mb-5">[ Dalla 理念 ]</h3>
        <p>
          您好，我們是Dalla
          Goods。成立於2020年，在世界低潮的這年，把握不放棄的希望之光。<br /><br />
          基於三種信念：<br />
          「藝術 Art 」、「情感 Emotions 」和「手工 Hand made」<br />
          這即是我們品牌的理念，結合藝術家的創意，創作獨一無二的藝術品，代替您遞予最真誠的心。<br /><br />
          希望來到這裡的人，都可以理解自己的獨特，接受自己，並透過我們傳遞情感，建立人與人善意的連結。<br />
          如果能透過我們得到力量，那就是我們最快樂的事情。
        </p>
      </div>
    </section>
    <section class="container mb-4" id="service">
      <h3 class="mb-5">[ Dalla 服務 ]</h3>
      <ul class="row justify-content-between list-unstyled mb-0">
        <li class="card col-md-4 mb-3 mb-md-0 border-0">
          <span class="display-3 mx-auto bg-primary rounded-circle p-4"
            ><i class="fas fa-crown text-light"></i
          ></span>
          <div class="card-body">
            <p class="h4 text-center">獨一無二</p>
            <p class="card-text">
              獨一無二的商品，適合獨一無二的您。全店商品皆為純手工製作，無法複製，再也不用擔心與別人使用相同的飾品。
            </p>
          </div>
        </li>
        <li class="card col-md-4 mb-3 mb-md-0 border-0">
          <span class="display-3 mx-auto bg-primary rounded-circle p-4"
            ><i class="fas fa-shuttle-van text-light"></i
          ></span>
          <div class="card-body">
            <p class="h4 text-center">快速出貨</p>
            <p class="card-text">
              24小時內保證出貨，並提供貨運責任保險，給您快速且安全的運送體驗。
            </p>
          </div>
        </li>
        <li class="card col-md-4 mb-3 mb-md-0 border-0">
          <span class="display-3 mx-auto bg-primary rounded-circle p-4"
            ><i class="fas fa-paint-brush text-light"></i
          ></span>
          <div class="card-body">
            <p class="h4 text-center">手工客製</p>
            <p class="card-text">
              可與本公司洽談，為您規劃專屬於您的客製精品，專業設計師將協助您創造有溫度的作品。
            </p>
          </div>
        </li>
      </ul>
    </section>
    <section id="products">
      <h3 class="mb-5 text-center">[ Dalla 精選 ]</h3>
      <ul class="slider list-unstyled">
        <li class="slider__item" v-for="item in products" :key="item.id">
          <div
            class="img h-100"
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          >
            <div
              class="slider__content h-100 justify-content-center align-items-center p-3"
            >
              <h4 class="mb-3 text-light">{{ item.title }}</h4>
              <button
                type="button"
                class="btn btn-outline-light"
                @click="getDetail(item.id)"
              >
                想了解更多
              </button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import $ from 'jquery'
import 'slick-carousel'

export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    getProducts () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.$http.get(api).then(res => {
        vm.products = res.data.products.filter(e => e.is_enabled === 1)
      })
    },
    setSlider () {
      $('.slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      })
    },
    getDetail (id) {
      this.$router.push({ path: `/product_detail/${id}` })
    }
  },
  created () {
    this.getProducts()
  },
  updated () {
    this.setSlider()
  }
}
</script>

<style lang="scss">
.about {
  background-image: url('../../../assets/img/about.jpg');
}
.about2 {
  background-image: url('../../../assets/img/about2.jpg');
  min-height: 300px;
}
.slider__item {
  height: 200px;
  .slider__content {
    background-color: rgba(88, 88, 88, 0.5);
    display: none;
  }

  &:hover {
    .slider__content {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
