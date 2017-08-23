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
      return {
        testData: {
          a: 100
        },
        url: 'http://localhost:3000/jsonp'
      }
    },
    mounted(){
      this.test();
    },
    methods: {
      async test(){
        let res = await this.jsonp(this.url, this.testData);
        console.log(res)
        console.log(8888)
      }
    },
    components: {
      left, right
    }
  }
</script>
