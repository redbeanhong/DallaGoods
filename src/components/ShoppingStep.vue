<template>
  <div>
    <div id="wine-shop">
      <p class="h3 text-center mb-3">結帳流程</p>
      <ul class="nav nav-arrow justify-content-around">
        <li class="nav-item">
          <router-link class="nav-link" to="./customer_cart"
            >確認購物車</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="./customer_form"
            >填寫資料</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="./customer_checkout"
            >選擇付款方式</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link last-child" to="./customer_finished"
            >完成訂購</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

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
        content: "";
        position: absolute;
        background-color: var(--info);
        width: 25px;
        height: 15px;
        top: calc(50% - 7.5px);
        right: -25px;
        z-index: 1;
      }

      &:before {
        content: "";
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
        border-left: 1rem solid var(--info);
        position: absolute;
        right: -35px;
        top: 0;
      }

      &.last-child{
        &:before,
        &:after {
          display: none;
        }
      }
    }
  }
}
</style>
