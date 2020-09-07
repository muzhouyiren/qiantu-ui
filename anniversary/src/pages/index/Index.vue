<template>
  <div class="box">
    <img class="banner" src="@img/banner.jpg" alt />
    <div id="appointment">
      <div class="tit">
        <img class="tit-icon" src="@img/icon1.png" alt />
        <img class="tit-txt" src="@img/tit1.jpg" alt />
      </div>
      <appointmentForm></appointmentForm>
    </div>
    <div class="buycar">
      <div class="tit">
        <img class="tit-txt" src="@img/tit2.jpg" alt />
      </div>
      <ul class="policy">
        <li>
          <h2>
            首付￥<i>137,360</i>起
          </h2>
          <p>18期/24期/36期/48期/60期低息政策供你挑选</p>
        </li>
        <li>
          <h2>
            12期<i>0</i>利率
          </h2>
          <p>
            首付￥<i>343,440</i> 每月还款￥<i>28,616</i>
          </p>
        </li>
      </ul>
      <div class="tit">
        <img class="tit-txt" src="@img/tit3.jpg" alt />
      </div>
      <ul>
        <li>
          <h2>
            <i>超长尊享</i>
          </h2>
          <p>8年或者行驶16万公里超长质保服务</p>
        </li>
        <li>
          <h2>
            <i>终身尊享</i>
          </h2>
          <p>终身免费基础保养，终身免流量服务费，终身免费道路救援服务</p>
        </li>
        <li>
          <h2>
            <i>专属尊享</i>
          </h2>
          <p>不仅赠送便携充电器更免费安装一根专属充电桩</p>
        </li>
        <li>
          <h2>
            <i>初见好礼</i>
          </h2>
          <p>购车即送价值20000元隐形车衣和10000会员积分</p>
        </li>
      </ul>
      <div class="tip">
        政策有效期为2019年7月1日至2019年9月30日；
        <br />最终解释权归南京前途汽车销售有限公司所有
      </div>
    </div>
    <div class="dashboard">
      <img class="main" src="@img/img-car.jpg" alt />
      <img class="minor" src="@img/dashboard.png" alt />
    </div>
    <div class="highlight">
    <div class="tit">
      <img class="tit-txt" src="@img/tit4.jpg" alt />
    </div>
    <div class="m-swiper">
      <swiper :options="swiperOption">
        <swiper-slide>
          <img src="@img/img1.jpg" alt />
        </swiper-slide>
        <swiper-slide>
          <img src="@img/img2.jpg" alt />
        </swiper-slide>
        <swiper-slide>
          <img src="@img/img3.jpg" alt />
        </swiper-slide>
        <swiper-slide>
          <img src="@img/img4.jpg" alt />
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
  </div>
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
      swiperOption: {
        pagination: ".swiper-pagination",
        autoplay: 3000,
        autoplayDisableOnInteraction:false,
        loop:true,
      }
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang="stylus" scoped>
@import '~@styles/mixins.styl';

i {
  color: #d22e22;
  font-weight: bold;
}

.banner {
  width: 100%;
  display: block;
}

.tit-txt {
  width: 190px;
  display: block;
  margin: 0 auto 20px;
}

#appointment {
  padding: 20px;
  background: url('~@img/bg-c1.png') no-repeat left top;
  background-size: 30px 91px;

  .tit-icon {
    width: 25px;
    margin: 0 auto 5px;
    display: block;
  }
}

.buycar {
  padding: 25px 20px 60px;
  background: url('~@img/bg-c2.png') no-repeat right 40px;
  background-size:63px 186px;
  li {
    margin-bottom: 12px;
  }

  h2 {
    background: url('~@img/bg-txt2.png') no-repeat left top;
    background-size: 122px 19px;
    height: 19px;
    padding-left: 33px;
    font-weight: bold;
    font-size: 14px;
  }

  p {
    padding-left: 33px;
    font-size: 14px;
  }

  & .policy {
    padding-bottom:25px;
    h2 {
      background-image: url('~@img/bg-txt1.png');
      background-size: 164px 19px;
    }
  }

  .tip {
    font-size: 10px;
    color: #a7a7a7;
    padding-left: 33px;
  }
}

.dashboard {
  padding-bottom: 60px;

  img {
    display: block;
  }

  .main {
    width: 100%;
  }

  .minor {
    width: 80%;
    margin: -22px auto;
  }
}
.m-swiper{
  img{
    width:100%;
  }
  >>> .swiper-wrapper{
    padding-bottom:50px;
  }

  .swiper-container-horizontal > .swiper-pagination-bullets{
    bottom:30px;
  }

  >>> .swiper-pagination-bullet-active{
    background:#afa49b;
  }

}
</style>