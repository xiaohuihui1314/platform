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
    <section>
      <p>{{numberData}}</p>
      <p>{{numberData|filterNum}}</p>
    </section>
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
        },
        numberData: 1234567
      }
    },
    filters: {
      filterNum: function (val) {
          console.log(typeof val)
        const ss = String(val).split("").reverse();
        let str = "";
        for (let i = 1; i <= ss.length; i++) {
          str += ss[i - 1];
          if (i % 3 === 0 && i !== ss.length) {
            str += ",";
          }
        }
        let aa = str.split("").reverse().join("");
        return aa
      }
    }
  }
</script>
