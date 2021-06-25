import Vue from 'vue'
Vue.prototype.$bus = new Vue()

// 元件-警告(AlertMessage)
// 自定義名稱 'messsage:push'
// message: 傳入內容
// status: 樣式，預設值為 danger

// 元件-通知(DropdownMessage)
// 自定義名稱 'message:dropdown'
// message: 傳入內容

// 元件-NAV(CustomerNavbar)
// 自定義名稱 'carts:Update'
// count: 購物車內容數量
