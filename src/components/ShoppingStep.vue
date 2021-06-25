<template>
  <div>
    <div id="wine-shop">
      <p class="h3 text-center mb-3">結帳流程</p>
      <div class="row justify-content-center">
        <div class="col-md-10">
          <ul
            class="nav nav-arrow row justify-content-between align-items-center"
          >
            <li class="nav-item col-2 p-0">
              <router-link class="nav-link text-center" to="/customer_cart"
                >確認購物車</router-link
              >
            </li>
            <li class="nav-item col-2 p-0">
              <router-link class="nav-link text-center" to="/customer_form"
                >填寫資料</router-link
              >
            </li>
            <li class="nav-item col-2 p-0">
              <a
                class="nav-link text-center"
                href="#"
                :class="{ active: customerCheckout }"
                >確定付款方式</a
              >
            </li>
            <li class="nav-item col-2 p-0">
              <router-link
                class="nav-link text-center last-child"
                to="/customer_finished"
                >完成訂購</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      customerCheckout: false
    }
  },
  methods: {
    checkUrl () {
      const vm = this
      const url = vm.$route.path
      if (url.indexOf('customer_checkout') !== -1) {
        vm.customerCheckout = true
      } else {
        vm.customerCheckout = false
      }
    }
  },
  created () {
    this.checkUrl()
  }
}
</script>

<style lang="scss" scoped>
.nav-arrow {
  .nav-item {
    .nav-link {
      cursor: pointer;
      pointer-events: none;
      border-radius: 5px;
      position: relative;
      background-color: var(--info);
      color: var(--light);

      &.active {
        background-color: var(--primary);

        &:after {
          background-color: var(--primary);
        }
        &:before {
          border-left: 1rem solid var(--primary);
        }
      }

      &:after {
        content: '';
        position: absolute;
        background-color: var(--info);
        width: 25px;
        height: 15px;
        top: calc(50% - 7.5px);
        right: -25px;
        z-index: 1;
      }

      &:before {
        content: '';
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
        border-left: 1rem solid var(--info);
        position: absolute;
        right: -35px;
        top: 50%;
        transform: translate(0, -50%);
      }

      &.last-child {
        &:before,
        &:after {
          display: none;
        }
      }
    }
  }
}
</style>
