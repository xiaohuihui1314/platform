<template>
  <div class="right-wrap">
    <Breadcrumb class="crumbs-wrap">
      <Breadcrumb-item href="home">首页</Breadcrumb-item>
      <Breadcrumb-item v-show="SubMenuName">{{SubMenuName}}</Breadcrumb-item>
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
  import  {mapGetters} from 'vuex';
  export default{
    data(){
      return {
        thirdClass: {
          name: null,
          path: null
        }
      }
    },
    computed: {
      ...mapGetters({
        SubMenuName: 'SubMenuName',
      })
    },
    watch: {
      '$route': function (route) {
        console.log(route)
        this.thirdClass.name = route.name;
        this.thirdClass.path = route.path;
        this.checkRouter();
      }
    },
    mounted(){
      this.thirdClass.name = this.$route.name;
      this.thirdClass.path = this.$route.path;
      this.checkRouter();
    },
    methods: {
      checkRouter(){
        if (!this.thirdClass.name) {
          this.$store.dispatch('Action_Menu_Name', null);
        }
      }
    }
  }
</script>
