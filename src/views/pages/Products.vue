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
        建立新的產品
      </button>
    </div>
    <!-- END OF ADD PRODUCT BTN -->

    <!-- TABLE -->
    <table class="table mt-4">
      <thead>
        <td width="120">分類</td>
        <td>產品名稱</td>
        <td width="120">原價</td>
        <td width="120">售價</td>
        <td width="100">是否啟用</td>
        <td width="80">編輯</td>
        <td width="80">刪除</td>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | Currency }}</td>
          <td class="text-right">{{ item.price | Currency }}</td>
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
              @click="openModal('delProductModal', false, item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- END OF TABLE -->

    <!-- PAGINATION -->
    <pagination :pagination="pagination" v-on:getpagination="getProducts"></pagination>
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
              <span>新增產品</span>
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
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile"
                    >或 上傳圖片
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.fileUploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile()"
                  />
                </div>
                <img
                  v-if="tempProduct.imageUrl"
                  :src="tempProduct.imageUrl"
                  class="img-fluid"
                  alt="productImg"
                />
              </div>
              <div class="col-sm-8">
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

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      v-model="tempProduct.category"
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      v-model="tempProduct.unit"
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      v-model="tempProduct.origin_price"
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      v-model="tempProduct.price"
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    v-model="tempProduct.description"
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    v-model="tempProduct.content"
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
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
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
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
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="closeModal('delProductModal')"
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
      products: [], //呈現在頁面的所有商品清單
      tempProduct: {}, //暫存新增或修改的商品
      isNew: true, //是否為新增商品
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
        // 如果是新增商品，就給空物件
        this.tempProduct = {};
        this.isNew = true;
      } else {
        // 如果是修改商品，就傳入被選取的物件內容
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
    },
    closeModal(modalName) {
      $(`#${modalName}`).modal("hide");
    },
    // 取得所有商品，並加入到頁面的商品清單
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then(res => {
        // console.log(res);
        vm.products = res.data.products;
        vm.pagination = res.data.pagination;
        vm.isLoading = false;
      });
    },
    // 刪除暫存在tempProduct的商品
    deleteProduct() {
      const vm = this;
      let itemId = vm.tempProduct.id;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${itemId}`;
      this.$http.delete(api).then(res => {
        // console.log(res);
        if (res.data.success) {
          vm.closeModal("delProductModal");
          vm.getProducts();
        } else {
          console.log("刪除失敗");
          console.log(res);
        }
      });
    },
    // 新增商品或修改商品
    updateProduct() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let httpMethod = "post";

      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }

      this.$http[httpMethod](api, { data: vm.tempProduct }).then(res => {
        // console.log(res);
        if (res.data.success) {
          vm.closeModal("productModal");
          vm.getProducts();
          this.tempProduct = {};
        } else {
          console.log("上傳失敗");
          console.log(res);
        }
      });
    },
    uploadFile() {
      const uploaedFile = this.$refs.files.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", uploaedFile);
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      const vm = this;
      vm.status.fileUploading = true;
      this.$http
        .post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          vm.status.fileUploading = false;
          if (res.data.success) {
            console.log(res.data.imageUrl);
            vm.$set(vm.tempProduct, "imageUrl", res.data.imageUrl);
          } else {
            vm.$bus.$emit("message:push", res.data.message);
          }
        });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
