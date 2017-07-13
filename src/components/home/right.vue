<template>
  <div class="right-wrap">
    <Breadcrumb class="crumbs-wrap">
      <Breadcrumb-item href="home">首页</Breadcrumb-item>
      <Breadcrumb-item :href="secondary.path" v-show="secondary.name">{{secondary.name}}</Breadcrumb-item>
      <Breadcrumb-item :href="thirdClass.path" v-show="thirdClass.name">{{thirdClass.name}}</Breadcrumb-item>
    </Breadcrumb>
    <div class="right-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../assets/style/home/right.scss";
</style>
<script>
  export default{
    data(){
      return {
        secondary: {
          name: null,
          path: null
        },
        thirdClass: {
          name: null,
          path: null
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
          console.log(vm)
      })
    },
    watch: {
      '$route': function (route,asd,ad) {
        console.log(route,asd,ad)
        console.log(route.params)
        this.secondary.name = route.matched[0].name;
        this.secondary.path = route.matched[0].path;
        this.thirdClass.name = route.name;
        this.thirdClass.path = route.path;
      }
    },
    mounted(){
      console.log(this.$route)
      this.secondary.name = this.$route.matched[0].name;
      this.secondary.path = this.$route.matched[0].path;
      this.thirdClass.name = this.$route.name;
      this.thirdClass.path = this.$route.path;
    }
  }
</script>
