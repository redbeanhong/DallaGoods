<template>
  <div>
    <!-- TABLE -->
    <table class="table">
      <thead>
        <tr>
          <th scope="col" width="120">刪除</th>
          <th scope="col">品名</th>
          <th scope="col">數量</th>
          <th scope="col">單價</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in carts.carts" :key="item.id">
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="removeCartItem(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id"
              ></i>
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
          <td>
            {{ item.product.title }}
            <div v-if="item.coupon" class="text-success">已套用優惠券</div>
          </td>
          <td>{{ item.qty }}/{{ item.product.unit }}</td>
          <td>{{ item.final_total | Currency }}</td>
        </tr>
        <tr>
          <td colspan="3" class="text-right">總計</td>
          <td>{{ carts.total | Currency }}</td>
        </tr>
        <tr v-if="carts.final_total !== carts.total">
          <td colspan="3" class="text-right text-success">
            折扣價
          </td>
          <td class="text-success">{{ carts.final_total | Currency }}</td>
        </tr>
      </tbody>
    </table>
    <!-- END OF TABLE -->
  </div>
</template>

<script>
// import $ from "jquery";

export default {
  props: {
    carts: {
      type: Object
    },
    status: {
      type: Object
    }
  },
  data() {
    return {
      cartsList: this.carts //呈現在頁面的所有商品清單
    };
  },
  methods: {
    removeCartItem(itemId) {
      this.$emit("removeCartItem", itemId);
    }
  },
  created() {}
};
</script>
