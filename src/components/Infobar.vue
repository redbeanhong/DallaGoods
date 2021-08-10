<template>
  <div class="position-relative">
    <div id="infobar"></div>
    <ul class="nav my-4 nav--line justify-content-center flex-nowrap">
      <li class="nav-item">
        <router-link class="nav-link" to="/customer_orders/key_ring"
          ><span class="d-none d-sm-inline">療癒</span>配件</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/customer_orders/earring"
          ><span class="d-none d-sm-inline">小巧</span>耳飾</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/customer_orders/tray"
          >居家<span class="d-none d-sm-inline">生活</span></router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/customer_orders/technology"
          ><span class="d-none d-sm-inline">創意</span>科技</router-link
        >
      </li>
    </ul>
  </div>
</template>
