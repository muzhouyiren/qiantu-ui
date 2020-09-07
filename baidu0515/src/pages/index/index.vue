<template>
  <div class="box">
    <div class="swiper-1">
      <img class="k50-img" src="@img/banner.jpg" alt>
      <img class="tit-img" src="@img/tit1.jpg" alt>
      <div class="video">
        <video
          v-show="isShowVideo"
          ref="myVideo"
          style="width:100%;"
          controls
          src="@img/k50.mp4"
          webkit-playsinline="true"
          playsinline="true"
          loop
        >
        </video>
        <img v-show="!isShowVideo" class="video-bg" src="@img/video-img.jpg" alt>
        <img
          v-show="!isShowVideo"
          class="video-bg-btn"
          @click="playVideo"
          src="@img/video-btn.png"
          alt
        >
      </div>
    </div>
    <div id="appointment">
      <img class="tit-img" src="@img/tit2.jpg" alt>
      <AppointmentForm></AppointmentForm>
    </div>
    <img class="k50-img" src="@img/img1.jpg" alt>
    <div class="swiper-3">
      <swiper :options="swiperOptionImg">
        <swiper-slide>
          <img src="@img/simg1.jpg" alt>
        </swiper-slide>
        <swiper-slide>
          <img src="@img/simg2.jpg" alt>
        </swiper-slide>
        <swiper-slide>
          <img src="@img/simg3.jpg" alt>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="swiper-4">
      <img class="img-1" src="@img/k50-tit_05.png" alt="">
      <img class="img-2" src="@img/img5.jpg" alt="">
    </div>
    <img class="k50-img" src="@img/img6.jpg" alt>
  </div>
</template>

<script>
import AppointmentForm from "./components/form.vue";
export default {
  name: "Index",
  components: {
    AppointmentForm
  },
  data() {
    return {
      isShowVideo: false,
      swiperOptionImg: {
        pagination: ".swiper-pagination",
        autoplay: 3000,
        autoplayDisableOnInteraction:false
      }
    };
  },
  computed: {
    myVideo() {
      return this.$refs.myVideo;
    }
  },
  methods: {
    playVideo: function() {
      this.isShowVideo = true;
      this.myVideo.play();
    }
  },
  created() {},
  mounted() {}
};
</script>


<style lang="stylus" scoped>
@import '~@styles/mixins.styl';

.box {
  height: 100%;
  position: relative;
}

.k50-img {
  width: 100%;
}

.tit-img {
  width: 100%;
  padding: 20px 0 5px;
}

.swiper-1 {
  background: #000;
}

.video {
  width: 100%;
  height: px2vw(422);
  position: relative;

  video {
    width: 100%;
    height: 100%;
  }

  .video-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  .video-bg-btn {
    position: absolute;
    width: 60px;
    height: 60px;
    left: 50%;
    top: 50%;
    margin-left: -30px;
    margin-top: -30px;
    z-index: 20;
  }
}

.swiper-1-flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

#appointment {
  padding-top: 10px;
}

.swiper-3 {
  text-align: center;
  position:relative;
  &:before{
    content:'';
    display:block;
    height:4px;
    background:#cfa972;
    position:absolute;
    top:-4px;
    right:0;
    width:70%;
  }
  &:after{
    content:'';
    display:block;
    height:4px;
    background:#cfa972;
    position:absolute;
    bottom:-4px;
    left:0;
    width:70%;
  }
  img{
    width:100%;
  }
  >>> .swiper-pagination-bullet.swiper-pagination-bullet-active{
    background:#cfa972;
  }
}
.swiper-4{
  text-align:center;
  img{
    width:100%;
  }
  .img-1{
    width:150px;
    padding-top:16%;
    padding-bottom:7%;
  }
}
</style>