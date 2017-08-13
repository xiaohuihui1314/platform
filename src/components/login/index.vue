<template>
  <div class="login-wrap">
    <header class="login-header">
      <div class="login-title">登录</div>
    </header>
    <section class="login-form-wrap">
      <div class="login-form">
        <Form>
          <Input type="password" placeholder="请输入用户名" v-model="login.userName"></Input>
          <Input type="password" placeholder="请输入密码" v-model="login.passWord"></Input>
          <p class="login-message">{{message}}</p>
          <Button type="primary" @click="goLogin" long>提交</Button>
        </Form>
      </div>
    </section>
    <footer class="login-footer">
      <div class="company-code">
        2017.7.12-2017 © HUIHUI
      </div>
    </footer>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../assets/style/login/login.scss";
</style>
<script>
  export default {
    data () {
      return {
        login: {
          userName: "",
          passWord: ""
        },
        message:null
      }
    },
    mounted(){
//        this.register();
    },
    methods: {
      async  goLogin () {
        const checkLogin = (dataObj) => this.fetch('POST', '/login', dataObj);
        let res = await  checkLogin(this.login);
        console.log(res);
        if (res.id) {
          localStorage.setItem("token", JSON.stringify(res));
          this.$router.push({path: 'home'});
        }else {
            this.message=res.message
        }
      },
      async  register () {
        const checkRegister = (dataObj) => this.fetch('POST', '/register', dataObj);
        let res = await  checkRegister({
          userName:11,
          passWord: 11
        });
        console.log(res);

      },
    }
  }
</script>
