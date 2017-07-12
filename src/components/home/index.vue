<template>
  <div class="home-wrap">
    <left/>
    <right/>
  </div>
</template>
<style scoped>
  .home-wrap {
    height: 100%;
  }
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
      left,right
    }
  }
</script>
