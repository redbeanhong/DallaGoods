<template>
  <div class="form-area">
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">管理員登入</h1>
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
      <p class="mt-5 mb-3 text-muted">&copy; Dalla Goods 2021</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username:"",
        password: ""
      },
      remember:
        false
    };
  },
  methods: {
    signin: function() {
      const api = `${process.env.APIPATH}/admin/signin`;
      const vm = this;
      let personalUserName = {
        userName: vm.user.username,
        remember: vm.remember
      };

      if (!vm.remember) {
        localStorage.setItem("personalUserName", JSON.stringify({}));
      } else if (vm.user.username || vm.remember) {
        localStorage.setItem(
          "personalUserName",
          JSON.stringify(personalUserName)
        );
      }

      this.$http.post(api, vm.user).then(res => {
        // console.log(res);
        if (res.data.success) {
          // console.log(token,expired);
          const token = res.data.token;
          const expired = res.data.expired;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
          vm.$router.push("/admin");
        }
      });
    },
    checkLogin() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/user/check`;
      this.$http.post(api).then(res => {
        // console.log(res);
        if (res.data.success) {
          vm.$bus.$emit("message:push", '您已為登入狀態，即將為您轉跳至管理員頁面...','success');
          vm.$router.push("/admin");
        }
      });
    },checkRemember(){
      const vm = this;
      if (JSON.parse(localStorage.getItem("personalUserName")).remember) {
        vm.remember = JSON.parse(localStorage.getItem("personalUserName")).remember;
        vu.user.username = JSON.parse(localStorage.getItem("personalUserName")).userName;
      }
    }
  },
  created() {
    this.checkLogin();
  }
};
</script>

<style lang="scss" scoped>
.form-area {
  min-height: 100vh;
  display: flex;
  align-content: center;
  justify-content: center;

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
  .form-signin .checkbox {
    font-weight: 400;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}
</style>
