<template>
  <div>
    <div class="container">
      <ShoppingStep class="mb-4"></ShoppingStep>
      <div class="my-5 row justify-content-center">
        <div class="col-10">
          <div class="jumbotron">
            <h1 class="display-4">謝謝您的購買！</h1>
            <p class="lead">
              您已完成購買程序，本公司將盡速出貨，謝謝您！
            </p>
            <hr class="my-4" />
            <p>
              如續繼續賞閱請點擊下方按鈕
            </p>
            <router-link
              to="/customer_orders/all"
              class="btn btn-primary btn-lg"
              role="button"
              >繼續逛逛</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShoppingStep from '@/components/ShoppingStep.vue'
export default {
  data () {
    return {}
  },
  components: {
    ShoppingStep
  }
}
</script>
