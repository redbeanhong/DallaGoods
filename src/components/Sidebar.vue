<template>
  <div>
    <nav
      id="sidebarMenu"
      class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse navbar-light nav-pills"
    >
      <div class="sidebar--sticky pt-3">
        <section class="mb-4" id="administrator">
          <h6
            class="sidebar__heading d-flex justify-content-between align-items-center px-3 mb-1 text-muted"
          >
            <span>管理員</span>
          </h6>
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/products"
                ><i class="fas fa-box-open mr-1"></i>產品列表</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/orderlist"
                ><i class="far fa-list-alt mr-1"></i>訂單列表</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/coupon"
                ><i class="fas fa-ticket-alt mr-1"></i>優惠券</router-link
              >
            </li>
          </ul>
        </section>
        <section id="shop">
          <h6
            class="sidebar__heading d-flex justify-content-between align-items-center px-3 mb-1 text-muted"
          >
            <span>購物頁面</span>
          </h6>
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link class="nav-link" to="/customer_orders"
                ><i class="fas fa-shopping-cart mr-1"></i>購物頁面</router-link
              >
            </li>
          </ul>
        </section>
      </div>
    </nav>
  </div>
</template>
