<template>
  <div class="login-wrap">
    <header class="login-header">
      <h1>登录</h1>
    </header>
    <section class="login-form-wrap">
      <div class="login-form">
        <Form>
          <Input type="password" v-model="login.user"></Input>
          <Input type="password" v-model="login.pwd"></Input>
          <Button type="primary" @click="goLogin" long>提交</Button>
        </Form>
      </div>
    </section>
    <footer class="login-footer">
      <h1>底部</h1>
    </footer>
  </div>
</template>
<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .login-header {
    height: 80px;
  }

  .login-form-wrap {
    position: absolute;
    top: 80px;
    bottom: 100px;
    width: 100%;
    background: url("../../assets/images/login/bg.png") center/cover no-repeat;

  }

  .login-form {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 350px;
    height: 260px;
    margin: auto;
    border: 10px solid rgba(236, 236, 236, 0.4);
  }

  .login-form form {
    height: 100%;
    padding: 36px 40px 20px;
    border: 1px solid #ccc;
    background-color: #fff;
  }

  .ivu-input-wrapper {
    margin-bottom: 15px;
  }

  .ivu-btn {
    margin-top: 25px;
  }

  .login-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
  }
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
        this.$router.push({name: 'index'});
      },
    }
  }
</script>
