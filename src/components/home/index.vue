<template>
  <div class="home-wrap">

      <left/>
      <right/>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../assets/style/home/index.scss";
</style>
<script>
  import left from './left';
  import right from './right';
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {}
    },
    mounted(){
      console.log(this);
    },
    methods: {},
    components: {
      left, right
    }
  }
</script>
