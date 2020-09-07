<template>
  <div class="box">
    <div :class="['logo',isShowLogoBg?'':'no-bg']">
      <img src="@img/logo.png" alt>
    </div>
    <swiper :options="swiperOption" ref="mySwiper" class="global-swiper">
      <swiper-slide class="swiper-1-flex">
        <div class="swiper-1">
          <img class="k50-img" src="@img/k50-txt.png" alt>
          <div class="video">
            <video
              v-show="isShowVideo"
              ref="myVideo"
              style="width:100%;"
              src="@img/k50.mp4"
              controls
              
            ></video>
            <img v-show="!isShowVideo" class="video-bg" src="@img/video-bg-1.jpg" alt>
            <img
              v-show="!isShowVideo"
              class="video-bg-btn"
              @click="playVideo"
              src="@img/video-btn.png"
              alt
            >
          </div>

          <div id="appointment">
            <p>填写信息即可享受驾趣</p>
            <AppointmentForm></AppointmentForm>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-2">
          <img class="img-qiantu" src="@img/qiantu-txt.png" alt>
          <p class="swiper-2-txt">即刻启程</p>
          <p class="swiper-2-txt1">
            于繁华城市之中，感受纯粹驾驶乐趣。
            <br>邀您莅临体验
          </p>
          <div class="map">
            <div class="map-icon1">
              <img
                class="ani"
                swiper-animate-effect="bounceIn"
                swiper-animate-duration="1.0s"
                swiper-animate-delay="0.3s"
                src="@img/map-icon1.png"
                alt
              >
              <p>
                <span>4/18-4/25</span>
                <br>
                <span>上海国际车展8.1馆</span>
              </p>
            </div>
            <div class="map-icon2">
              <p>
                <span>4/19-4/21</span>
                <br>
                <span>中信泰富广场</span>
                <br>
                <span>前途K50城市巡展</span>
              </p>
              <img
                class="ani"
                swiper-animate-effect="bounceIn"
                swiper-animate-duration="1.0s"
                swiper-animate-delay="0.5s"
                src="@img/map-icon5.png"
                alt
              >
            </div>
            <div class="map-icon3">
              <p>
                <span>前途驿品牌体验中心</span>
              </p>
              <img
                class="ani"
                swiper-animate-effect="bounceIn"
                swiper-animate-duration="1.0s"
                swiper-animate-delay="0.7s"
                src="@img/map-icon5.png"
                alt
              >
            </div>
            <!-- <div class="map-icon4">
              <img class="ani" swiper-animate-effect="bounceIn" swiper-animate-duration="1.0s" swiper-animate-delay="0.2s"  src="@img/map-icon4.png" alt="">
              <p>
                <span>东方明珠</span>
              </p>
            </div>-->
            <div class="map-icon5">
              <img
                class="ani"
                swiper-animate-effect="bounceIn"
                swiper-animate-duration="0.8s"
                swiper-animate-delay="0.2s"
                src="@img/map-icon6.png"
                alt
              >
              <p>
                <span>新天地商圈</span>
              </p>
            </div>
            <img class="img-map" src="@img/map.jpg" alt>
          </div>
          <img class="img-bottom" src="@img/img2.jpg" alt>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-3-flex">
        <div class="swiper-3">
          <div class="swiper-3-h">开启纯电驾趣</div>
          <div class="swiper-3-ctnr">
            <img
              class="ani"
              swiper-animate-effect="flipInX"
              swiper-animate-duration="1.0s"
              swiper-animate-delay="0.3s"
              src="@img/page3-msg.png"
              alt
            >
          </div>
          <swiper class="swiper-3-con" :options="swiperOptionImg">
            <swiper-slide>
              <img src="@img/swiper1.jpg" alt>
            </swiper-slide>
            <swiper-slide>
              <img src="@img/swiper2.jpg" alt>
            </swiper-slide>
            <swiper-slide>
              <img src="@img/swiper3.jpg" alt>
            </swiper-slide>
            <swiper-slide>
              <img src="@img/swiper4.jpg" alt>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div v-show="isLeftArrow" class="swiper-button-prev" slot="button-prev"></div>
            <div v-show="isRightArrow" class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-4">
        <div class="swiper-4-flex">
          <h1 class="title-txt">智趣沙龙 驾趣体验</h1>
          <div class="cn-txt">
            <p>微信搜索“前途驿”或识别二维码</p>
            <p>加入前途会员俱乐部 享专属特权</p>
            <img
              class="xian-txt ani"
              swiper-animate-effect="bounceIn"
              swiper-animate-duration="1.0s"
              swiper-animate-delay="0.3s"
              src="@img/qr-code.png"
              alt
            >
          </div>
          <div>
            <ul class="tab-tit">
              <li
                v-for="(title,index) in tabTitle"
                @click="cur=index"
                :class="[title.name,{active:cur==index}]"
                :key="index"
              >{{title.txt}}</li>
            </ul>
            <div class="tab-content">
              <div class="tab-cont clearfix" v-show="cur==0">
                <a
                  href="http://apis.map.qq.com/uri/v1/marker?marker=coord:39.936180,116.455260;title:前途体验店;addr: 北京市朝阳区三里屯北街81号1幢1层C106"
                >
                  <img src="@img/store1.jpg" alt>
                  <div class="tab-txt">
                    <p class="tab-txt-name">北京市</p>
                    <p>
                      朝阳区三里屯路
                      <br>甲81号那里花园
                    </p>
                  </div>
                </a>
              </div>
              <div class="tab-cont clearfix" v-show="cur==1">
                <a
                  href="http://apis.map.qq.com/uri/v1/marker?marker=coord:31.219170,121.474230;title:前途体验店;addr: 黄浦区马当路220号"
                >
                  <img src="@img/store2.jpg" alt>
                  <div class="tab-txt">
                    <p class="tab-txt-name">上海市</p>
                    <p>黄浦区马当路220号</p>
                  </div>
                </a>
              </div>
              <div class="tab-cont clearfix" v-show="cur==2">
                <a
                  href="http://apis.map.qq.com/uri/v1/marker?marker=coord:30.651760,104.081090;title:前途体验店;addr: 锦江区晶融汇购物中心109"
                >
                  <img src="@img/store3.jpg" alt>
                  <div class="tab-txt">
                    <p class="tab-txt-name">成都市</p>
                    <p>晶融汇广场</p>
                  </div>
                </a>
              </div>
              <div class="tab-cont clearfix" v-show="cur==3">
                <a
                  href="http://apis.map.qq.com/uri/v1/marker?marker=coord:31.365380,120.443050;title:前途体验店;addr:苏州市高新区松花江路368号"
                >
                  <img src="@img/store4.jpg" alt>
                  <div class="tab-txt">
                    <p class="tab-txt-name">苏州市</p>
                    <p>高新区松花江路368号</p>
                  </div>
                </a>
              </div>
              <div class="tab-cont clearfix" v-show="cur==4">
                <a
                  href="http://apis.map.qq.com/uri/v1/marker?marker=coord:23.119990,113.326890;title:前途体验店;addr: 珠江新城"
                >
                  <img src="@img/store5.jpg" alt>
                  <div class="tab-txt">
                    <p class="tab-txt-name">广州市</p>
                    <p>高德置地秋广场1F06号</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div v-show="isShowPop" class="right-btn" @click="goForm">预约试驾</div>
    <img v-show="isShowArrow" class="arrow-up" src="@img/arrow.png" alt>
  </div>
</template>

<script>
import AppointmentForm from "./components/form.vue";
import { PageIndex } from "./apis.js";
const pageIndex = new PageIndex();
require("swiper-animate-cn/animate.min.css");
let swiperAnimateCache = require("swiper-animate-cn").swiperAnimateCache;
let swiperAnimate = require("swiper-animate-cn").swiperAnimate;
let clearSwiperAnimate = require("swiper-animate-cn").clearSwiperAnimate;
export default {
  name: "Index",
  components: {
    AppointmentForm
  },
  data() {
    return {
      tabTitle: [
        {
          name: "bj",
          txt: "北京"
        },
        {
          name: "sh",
          txt: "上海"
        },
        {
          name: "cd",
          txt: "成都"
        },
        {
          name: "sz",
          txt: "苏州"
        },
        {
          name: "gz",
          txt: "广州"
        }
      ],
      cur: 0,
      isShowArrow: true,
      isLeftArrow: false,
      isRightArrow: true,
      isShowLogoBg: true,
      isShowVideo: false,
      isShowPop: false,
      swiperOptionImg: {
        pagination: ".swiper-pagination",
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        onSlideChangeStart: swiper => {
          this.imgSlieChangeStart(swiper);
        }
      },
      swiperOption: {
        autoplay: 0,
        direction: "vertical",
        nextButton: ".arrow-up",
        onSlideChangeStart: swiper => {
          this.slideChangeStart(swiper);
          swiperAnimate(swiper);
        },
        onInit: swiper => {
          swiperAnimateCache(swiper); //隐藏动画元素
          swiperAnimate(swiper);
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    goForm: function() {
      this.swiper.slideTo(0, 1000, false);
      this.isShowArrow = true;
      this.isShowPop = false;
    },
    slideChangeStart: function(swiper) {
      if (swiper.activeIndex == swiper.slides.length - 1) {
        this.isShowArrow = false;
        this.isShowLogoBg = false;
      } else {
        this.isShowArrow = true;
        this.isShowLogoBg = true;
      }
      if (swiper.activeIndex == 0) {
        this.isShowPop = false;
      } else {
        this.isShowPop = true;
      }
    },
    imgSlieChangeStart: function(swiper) {
      this.isLeftArrow = swiper.activeIndex == 0 ? false : true;
      this.isRightArrow =
        swiper.activeIndex == swiper.slides.length - 1 ? false : true;
    },
    playVideo: function() {
      this.isShowVideo = true;
      this.$refs.myVideo.play();
    }
  },
  created() {},
  mounted() {
    this.$refs.myVideo.onended = function(e) {
      var elem = e.target || document;
      if (elem.cancelFullScreen) {
        elem.cancelFullScreen();
      } else if (elem.mozCancelFullScreen) {
        elem.mozCancelFullScreen();
      } else if (elem.webkitCancelFullScreen) {
        elem.webkitCancelFullScreen();
      } else if (elem.webkitExitFullScreen) {
        elem.webkitExitFullScreen();
      }
    };
  }
};
</script>



<style lang="stylus" scoped>
@import '~@styles/mixins.styl';

.box {
  height: 100%;
  position: relative;
}

.right-btn {
  background: #d2c19a;
  color: #fff;
  font-size: 12px;
  position: absolute;
  z-index: 10;
  padding: 7px;
  bottom: 20%;
  right: 14px;
  letter-spacing: 3px;
  text-align: center;
  writing-mode: tb-rl;
}

.arrow-up {
  position: absolute;
  z-index: 10;
  width: 24px;
  bottom: 20px;
  left: 50%;
  margin-left: -12px;
  animation: start 2s infinite ease-out;
}

@keyframes start {
  0% {
    opacity: 0.2;
    transform: translate(0, 0px);
  }

  50% {
    opacity: 1;
    transform: translate(0, 10px);
  }

  100% {
    opacity: 0.2;
    transform: translate(0, 0px);
  }
}

.global-swiper.swiper-container {
  width: 100%;
  height: 100%;
}

.global-swiper>.swiper-wrapper>.swiper-slide {
  width: 100%;
  height: 100%;
  padding-top: 65px;
}

.logo {
  text-align: left;
  padding: 10px 40px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background: #1c1d21;
  z-index: 10;

  img {
    width: 46px;
  }

  &.no-bg {
    background: transparent;
  }
}

.k50-img {
  width: 250px;
  margin-bottom: 20px;
  position: absolute;
  z-index: 10;
  left: 0;
  right: 0;
  top: 65px;
  margin: 0 auto;
}

.banner {
  width: 100%;
}

.swiper-1 {
  text-align: center;
  padding-bottom: 5%;

  @media (max-height: 700px) {
    padding-bottom: 0;
  }
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
  padding-top: 40px;

  @media (max-height: 710px) {
    padding-top: 25px;
  }

  @media (max-height: 600px) {
    padding-top: 10px;
  }

  p {
    font-size: 12px;
    color: #a2a1a1;
    text-align: center;
  }
}

.swiper-2 {
  text-align: center;
  position: relative;
  height: 100%;

  .img-bottom {
    width: 100%;
    margin: 0 auto;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    @media (max-height: 660px) {
      width: 80%;
    }
  }
}

.img-qiantu {
  width: 64px;
}

.swiper-2-txt {
  font-size: 13px;
  color: #fff;
  margin-top: 5px;
  letter-spacing: 2px;
  padding-bottom: 3%;

  @media (max-width: 320px) {
    font-size: 16px;
    padding-bottom: 4%;
  }
}

.swiper-2-txt1 {
  font-size: 12px;
  color: #fff;
  margin-bottom: 5px;
}

.img-map {
  width: 100%;
  padding-top: 0;
  margin-top: 10px;
}

.swiper-3 {
  text-align: center;
  padding-bottom: 25%;

  @media (max-height: 600px) {
    padding-bottom: 10%;
  }

  @media (max-height: 500px) {
    padding-bottom: 5%;
  }

  .swiper-button-next {
    background-image: url('../../assets/images/arrow-right.png');
  }

  .swiper-button-prev {
    background-image: url('../../assets/images/arrow-left.png');
  }

  .swiper-button-next, .swiper-button-prev {
    width: 10px;
    height: 17px;
    background-size: 10px 17px;
  }

  .swiper-container {
    padding-bottom: 13px;
  }

  .swiper-pagination {
    background: #d2c19a;
    height: 13px;
  }

  >>> .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
    width: 5px;
    height: 5px;
    background: #000;
    margin-bottom: 6px;
    margin-left: 10px;
    margin-right: 10px;
  }
}

.swiper-3-con {
  img {
    width: 100%;
  }
}

.swiper-3-h {
  font-size: 14px;
  color: #fff;
  letter-spacing: 2px;
}

.swiper-3-ctnr {
  margin-top: 12%;
  margin-bottom: 10%;

  @media (max-width: 320px) {
    margin-top: 8%;
    margin-bottom: 8%;
  }

  @media (max-height: 600px) {
    margin-top: 8%;
    margin-bottom: 8%;
  }

  @media (max-height: 450px) {
    margin-top: 4%;
    margin-bottom: 4%;
  }

  img {
    width: 68%;
    max-width: 300px;
  }
}

.swiper-4-flex {
  width: 100%;
  padding-bottom: 70px;
  @media(max-height:500px){
    padding-bottom: 50px;
  }
}

.swiper-4 {
  text-align: center;
  height: 100%;
  display: flex;
  padding-left: 35px;
  padding-right: 35px;
  align-items: center;
  justify-content: center;
  background-image: url('../../assets/images/bg4.jpg');
  background-size: cover;

  .xian-txt {
    width: 35%;
    margin-top: 3%;
    max-width: 150px;
  }

  .title-txt {
    font-size: 14px;
    color: #fff;
  }

  .cn-txt {
    padding-top: 6%;

    p {
      font-size: 13px;
      color: #fff;
      line-height: 1.8;
    }
  }

  .tab-tit {
    font-size: 0;
    display: flex;
    justify-content: space-between;
    margin-top: 22%;

    @media (max-height: 630px) {
      margin-top: 16%;
    }

    @media (max-height: 568px) {
      margin-top: 12%;
    }

    li {
      text-align: center;
      display: inline-block;
      width: 17%;
      height: 29px;
      line-height: 29px;
      font-size: 10px;
      color: #fff;
      border: 1px solid #d2c19a;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 7px;
        height: 2px;
        background: url('../../assets/images/city-icon1.png') no-repeat;
        background-size: 7px 2px;
      }

      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 7px;
        height: 2px;
        background: url('../../assets/images/city-icon2.png') no-repeat;
        background-size: 7px 2px;
      }

      &.active {
        background: #d2c19a;
        color: #1c1d21;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    // li.bj{
    // background: url('../../assets/images/beijing.png') no-repeat 100% 100%;
    // background-size:100% 100%;
    // }
    // li.bj.active{
    // background: url('../../assets/images/beijing-hover.png') no-repeat 100% 100%;
    // background-size:100% 100%;
    // }
    // li.cd{
    // background: url('../../assets/images/chengdu.png') no-repeat 100% 100%;
    // background-size:100% 100%;
    // }
    // li.cd.active{
    // background: url('../../assets/images/chengdu-hover.jpg') no-repeat 100% 100%;
    // background-size:100% 100%;
    // }
    // li.gz{
    // background: url('../../assets/images/guangzhou.png') no-repeat 100% 100%;
    // background-size:100% 100%;
    // }
    // li.gz.active{
    // background: url('../../assets/images/guangzhou-hover.jpg') no-repeat 100% 100%;
    // background-size:100% 100%;
    // }
    // li.sh{
    // background: url('../../assets/images/shanghai.png') no-repeat 100% 100%;
    // background-size:100% 100%;
    // }
    // li.sh.active{
    // background: url('../../assets/images/shanghai-hover.jpg') no-repeat 100% 100%;
    // background-size:100% 100%;
    // }
    // li.sz{
    // background: url('../../assets/images/suzhou.png') no-repeat 100% 100%;
    // background-size:100% 100%;
    // }
    // li.sz.active{
    // background: url('../../assets/images/suzhou-hover.jpg') no-repeat 100% 100%;
    // background-size:100% 100%;
    // }
    li:last-child {
      margin-right: 0;
    }
  }

  .tab-content {
    margin-top: 6%;

    .tab-cont {
      width: 100%;
      margin: 0 auto;
      background: #1c1d21;

      a {
        display: block;
        width: 100%;
      }
    }

    img {
      float: left;
      width: 49%;
      border: 2px solid #d2c19a;
    }

    .tab-txt {
      float: right;
      width: 50%;
      padding-top: 7%;
      color: #d2c19a;
      font-size: 10px;

      .tab-txt-name {
        font-weight: bold;
        margin-bottom: 10px;
      }
    }
  }
}

.map {
  position: relative;
}

.map-icon1 {
  display: flex;
  position: absolute;
  z-index: 10;
  left: 16%;
  top: 45%;

  img {
    width: 16px;
    height: 21px;
  }

  p {
    text-align: left;
    color: #ff9b6e;
    font-size: 10px;
    margin-top: 10px;
  }
}

.map-icon2 {
  display: flex;
  position: absolute;
  z-index: 10;
  right: 27%;
  top: 8%;

  img {
    width: 16px;
    height: 21px;
    margin-top: 16px;
    margin-left: 3px;
  }

  p {
    text-align: right;
    color: #b3401a;
    font-size: 10px;
  }
}

.map-icon3 {
  display: flex;
  position: absolute;
  z-index: 10;
  right: 17.6%;
  top: 32%;

  img {
    width: 16px;
    height: 21px;
  }

  p {
    text-align: right;
    color: #b3401a;
    font-size: 10px;
    margin-top: 10px;
  }
}

.map-icon4 {
  position: absolute;
  z-index: 10;
  top: 15%;
  right: 5.6%;

  img {
    width: 17px;
    height: 15px;
  }

  p {
    font-size: 10px;
    color: #fff100;
  }
}

.map-icon5 {
  position: absolute;
  z-index: 10;
  top: 38%;
  right: 8%;

  img {
    width: 17px;
    height: 15px;
  }

  p {
    font-size: 10px;
    color: #ff9b6e;
  }
}

.swiper-3-flex {
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>