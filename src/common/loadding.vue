<template>
  <section id="_loadding" v-show="fullscreenLoading">
    <h2 >Loadding~~~</h2>
    <h1>{{message}}</h1>
  </section>
</template>
<style scope>
  #_loadding{
    position: absolute;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.59);
    color: #fff;
    z-index: 9999;
  }
  #_loadding h2{
    position: absolute;
    width: 160px;
    height: 40px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
</style>
<script>
  export default {
    data() {
      return {
        fullscreenLoading: false,
        message:null
      }
    }
  }
</script>
