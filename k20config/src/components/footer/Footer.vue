<template>
  <div class="foot-con">
    <footer>
      <nav class="clearfix">
        <div class="fl">
          <a href>法律声明</a>
          <span class="line"></span>
          <a href>联系我们</a>
          <span class="line"></span>
          <a href>关注官方微信</a>
          <span class="line"></span>
          <a href>关注官方微博</a>
          <span class="line"></span>
          <a href>前途会员</a>
          <span class="line"></span>
          <a href>中文</a>
        </div>
        <div class="fr">
          <Icon type="ios-call" />
          <span>
            热线电话：
            <i>400-151-6600</i>
          </span>
        </div>
      </nav>
      <div class="qrcode">
        <Row>
          <Col span="12">
            <img src="@img/android-pop.png" alt />
            <Icon type="logo-android" />
            <span>安卓车主App</span>
          </Col>
          <Col span="12">
            <img src="@img/ios-pop.png" alt />
            <Icon type="logo-apple" />
            <span>IOS车主App</span>
          </Col>
        </Row>
      </div>
      <div class="copy">
        <span>Copyright © 2019 前途汽车(苏州)有限公司 版权所有</span>
        <a target="_blank" href="http://www.beian.miit.gov.cn/state/outPortal/loginPortal.action">
          苏ICP备17008683号-1
          <img src="@img/ba.png" alt />
          苏公网安备 32050502000382号
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="stylus" scoped>
a:hover {
  color: red;
}

.foot-con {
  background-color: #242424;
}

footer {
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
}

nav {
  color: #fff;

  .fl {
    a {
      display: inline-block;
      line-height: 56px;
      font-size: 16px;
    }

    .line {
      display: inline-block;
      margin-top: 23px;
      margin-right: 24px;
      margin-left: 24px;
      background-color: #fff;
      height: 10px;
      width: 1px;
    }
  }

  .fr {
    line-height: 56px;

    i {
      font-size: 16px;
    }
  }
}

.qrcode {
  text-align: center;
  padding: 10px 0 20px;
  color: #fff;
  font-size: 16px;
  img {
    width: 122px;
    margin-right: 30px;
  }
  span{
    vertical-align:middle;
  }
}
.copy{
  text-align:center;
  height: 36px;
  line-height: 36px;
  color: #939393;
  img{
    width:15px;
    margin-top: -3px;
  }
  span{
    margin-right:20px;
  }
}
</style>