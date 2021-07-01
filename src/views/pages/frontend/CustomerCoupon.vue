<template>
  <div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div
            class="row mb-2 justify-content-center"
            v-for="item in coupons"
            :key="item.code"
          >
            <div
              class="col-4 coupon d-flex align-items-center justify-content-center h3 m-0 text-center"
            >
              爆殺優惠券
            </div>
            <div class="col-8 border border-primary text-primary">
              <div class="row align-items-center justify-content-between p-3">
                <div>
                  <p class="h3">
                    <i class="fas fa-tag mr-2"></i>{{ item.title }}
                  </p>
                  <p class="text-danger border border-danger rounded p-2 my-3">
                    全部商品折扣 -{{ item.percent }}%
                  </p>
                  <p class="mb-0">{{ item.due_date }}為止</p>
                </div>
                <div>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="copy(item.code)"
                  >
                    點擊領取<i class="ml-2 fas fa-mouse-pointer"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      coupons: [
        {
          title: '從街頭殺到街尾',
          percent: 50,
          due_date: '2021-11-30',
          code: 'kill2021'
        },
        {
          title: '台股崩盤殺到見血',
          percent: 80,
          due_date: '2021-12-31',
          code: 'blood0511'
        }
      ]
    }
  },
  methods: {
    copy (code) {
      const vm = this
      const dummy = document.createElement('input')
      document.body.appendChild(dummy)
      dummy.value = code
      dummy.select()
      document.execCommand('copy')
      document.body.removeChild(dummy)
      vm.$bus.$emit(
        'message:push',
        `優惠碼${code}已複製到剪貼簿，祝您購物愉快！`,
        'success'
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.coupon {
  background-image: radial-gradient(
      circle at 1px 8px,
      transparent 6px,
      var(--primary) 6px,
      var(--primary) 0px
    ),
    radial-gradient(
      circle at 199px 8px,
      transparent 6px,
      var(--primary) 6px,
      var(--primary) 0px
    );
  background-size: 200px 18px;
  background-position: 0 0, 200px 0;
  background-repeat-x: no-repeat;
  color: var(--light);

  &::before {
    position: absolute;
    content: '';
    left: 240px;
    top: 0;
    bottom: 0;
    width: 0;
  }
}
</style>
