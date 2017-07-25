<template>
  <div>
    <h1>直播</h1>
    <video-player :options="videoOptions"></video-player>
  </div>
</template>
<script>
  require('videojs-contrib-hls/dist/videojs-contrib-hls')
  export default{
    data() {
      return {
        videoOptions: {
          // videojs and plugin options
          sources: [{
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "http://localhost/checkout/ts1/output.m3u8"
          }],
          controlBar: {
            timeDivider: false,
            durationDisplay: false
          },
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
          //poster: "/static/images/author-5.jpg"
        }
      }
    }
  }
</script>
