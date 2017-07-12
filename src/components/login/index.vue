<template>
  <div class="login-wrap">
    <header class="login-header">
        <div class="login-title">登录</div>
    </header>
    <section class="login-form-wrap">
      <div class="login-form">
        <Form>
          <Input type="password" placeholder="请输入用户名" v-model="login.user"></Input>
          <Input type="password" placeholder="请输入密码" v-model="login.pwd"></Input>
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
          user: "",
          pwd: ""
        }
      }
    },
    methods: {
      goLogin () {
        this.$router.push({path: 'home'});
      },
    }
  }
</script>
