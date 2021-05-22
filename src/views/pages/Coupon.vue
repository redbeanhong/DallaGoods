<template>
  <div>
    <!-- LOADING -->
    <loading :active.sync="isLoading"></loading>
    <!-- END OF LOADING -->

    <!-- ADD PRODUCT BTN -->
    <div class="text-right">
      <button
        class="btn btn-primary mt-4"
        @click="openModal('productModal', true)"
      >
        建立新的優惠券
      </button>
    </div>
    <!-- END OF ADD PRODUCT BTN -->

    <!-- TABLE -->
    <table class="table mt-4">
      <thead>
        <td>名稱</td>
        <td width="120">折扣百分比</td>
        <td width="200">到期日</td>
        <td width="100">是否啟用</td>
        <td width="80">編輯</td>
        <td width="80">刪除</td>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_data }}</td>
          <td>
            <span v-if="item.is_enabled == 1" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal('productModal', false, item)"
            >
              編輯
            </button>
          </td>
          <td>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openModal('delCouponModal', false, item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- END OF TABLE -->

    <!-- PAGINATION -->
    <pagination
      :pagination="pagination"
      v-on:getpagination="getCoupons"
    ></pagination>
    <!-- END OF PAGINATION -->

    <!-- MODEL EDIT -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>建立新的優惠券</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    v-model="tempProduct.title"
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                  />
                </div>
                <div class="form-group">
                  <label for="category">優惠碼</label>
                  <input
                    v-model="tempProduct.code"
                    type="text"
                    class="form-control"
                    id="category"
                    placeholder="請輸入優惠碼"
                  />
                </div>
                <div class="form-group">
                  <label for="date">到期日</label>
                  <input
                    v-model="tempProduct.due_data"
                    type="date"
                    class="form-control"
                    id="date"
                    placeholder="請輸入單位"
                  />
                </div>
                <div class="form-group">
                  <label for="price">折扣百分比</label>
                  <input
                    v-model="tempProduct.percent"
                    type="unit"
                    class="form-control"
                    id="unit"
                    placeholder="請輸入折扣百分比"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="closeModal('productModal')"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- END OF MODEL EDIT -->

    <!-- MODEL DELETE -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="closeModal('delCouponModal')"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteProduct()"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- END OF MODEL DELETE -->
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../../components/Pagination.vue";

export default {
  data() {
    return {
      products: [], //呈現在頁面的所有優惠券清單
      tempProduct: {}, //暫存新增或修改的優惠券
      isNew: true, //是否為新增優惠券
      isLoading: false, //讀取中的效果控制
      fullPage: true,
      status: {
        fileUploading: false
      },
      pagination: {}
    };
  },
  components: {
    Pagination
  },
  methods: {
    openModal(modalName, isNew, item) {
      $(`#${modalName}`).modal("show");
      if (isNew) {
        // 如果是新增優惠券，就給空物件
        this.tempProduct = {};
        this.isNew = true;
      } else {
        // 如果是修改優惠券，就傳入被選取的物件內容
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
    },
    closeModal(modalName) {
      $(`#${modalName}`).modal("hide");
    },
    // 取得所有優惠券，並加入到頁面的優惠券清單
    getCoupons(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then(res => {
        // console.log(res);
        vm.products = res.data.coupons;
        vm.pagination = res.data.pagination;
        vm.isLoading = false;
      });
    },
    // 刪除暫存在tempProduct的優惠券
    deleteProduct() {
      const vm = this;
      let itemId = vm.tempProduct.id;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${itemId}`;
      this.$http.delete(api).then(res => {
        // console.log(res);
        if (res.data.success) {
          vm.closeModal("delCouponModal");
          vm.getCoupons();
        } else {
          console.log("刪除失敗");
          console.log(res);
        }
      });
    },
    // 新增或修改優惠券
    updateProduct() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      let httpMethod = "post";

      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempProduct.id}`;
        httpMethod = "put";
      }

      this.$http[httpMethod](api, { data: vm.tempProduct }).then(res => {
        // console.log(res);
        if (res.data.success) {
          vm.closeModal("productModal");
          vm.getCoupons();
        } else {
          console.log("上傳失敗");
          console.log(res);
        }
      });
    },
  },
  created() {
    this.getCoupons();
  }
};
</script>
