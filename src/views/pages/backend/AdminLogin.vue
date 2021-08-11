<template>
  <div class="login">
    <AlertMessage></AlertMessage>
    <form class="login__singin" @submit.prevent="signin">
      <p class="h3 mb-3 font-weight-normal">管理員登入</p>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        v-model="user.username"
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="請輸入Email"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        v-model="user.password"
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="請輸入密碼"
        required
      />
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" v-model="remember" />
          記住我
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        登入
      </button>
      <p class="mt-5 mb-3 text-muted text-center">&copy; Dalla Goods 2021</p>
    </form>
  </div>
</template>

<script>
import AlertMessage from '@/components/AlertMessage.vue'

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      remember: false
    }
  },
  components: {
    AlertMessage
  },
  methods: {
    signin () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      const personalUserName = {
        userName: vm.user.username,
        remember: vm.remember
      }

      vm.$http.post(api, vm.user).then(res => {
        if (res.data.success) {
          if (!vm.remember) {
            localStorage.setItem('personalUserName', JSON.stringify({}))
          } else {
            localStorage.setItem(
              'personalUserName',
              JSON.stringify(personalUserName)
            )
          }
          const token = res.data.token
          const expired = res.data.expired
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
          vm.$router.push('/admin')
        } else {
          vm.$bus.$emit('message:push', res.data.message)
          vm.$bus.$emit('message:push', res.data.error.message)
        }
      })
    },
    checkLogin () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
      vm.$http.post(api).then(res => {
        if (res.data.success) {
          vm.$bus.$emit(
            'message:push',
            '您已為登入狀態，即將為您轉跳至管理員頁面...',
            'success'
          )
          vm.$router.push('/admin')
        }
        vm.checkRemember()
      })
    },
    checkRemember () {
      const vm = this
      if (JSON.parse(localStorage.getItem('personalUserName')) !== null) {
        if (JSON.parse(localStorage.getItem('personalUserName')).remember) {
          vm.remember = JSON.parse(
            localStorage.getItem('personalUserName')
          ).remember
          vm.user.username = JSON.parse(
            localStorage.getItem('personalUserName')
          ).userName
        }
      }
    }
  },
  created () {
    this.checkLogin()
  }
}
</script>
