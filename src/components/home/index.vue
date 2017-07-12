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
  export default {
    data () {
      return {}
    },
    methods: {},
    components: {
      left, right
    }
  }
</script>
