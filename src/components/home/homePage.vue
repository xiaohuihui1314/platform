<template>
  <div>
    <Carousel
      v-model="value3"
      :autoplay="setting.autoplay"
      :autoplay-speed="setting.autoplaySpeed"
      :dots="setting.dots"
      :trigger="setting.trigger"
      :arrow="setting.arrow">
      <Carousel-item>
        <div class="demo-carousel">1</div>
      </Carousel-item>
      <Carousel-item>
        <div class="demo-carousel">2</div>

      </Carousel-item>
      <Carousel-item>
        <div class="demo-carousel">3</div>
      </Carousel-item>
      <Carousel-item>
        <div class="demo-carousel">4</div>
      </Carousel-item>
    </Carousel>
  </div>
</template>
<style>
  .demo-carousel {
    height: 350px;
    line-height: 200px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    background: #506b9e;
  }
</style>
<script>
    export default{
        data() {
          return {
            value3: 0,
            setting: {
              autoplay: false,
              autoplaySpeed: 2000,
              dots: 'inside',
              trigger: 'click',
              arrow: 'hover'
            }
          }
        }
    }
</script>
