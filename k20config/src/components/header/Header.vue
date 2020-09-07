<template>
  <div class="head-con">
    <header class="clearfix">
      <div class="fl">
        <a class="logo-img" href="javascript:;">
          <img src="@img/header-logo-new.png" alt />
        </a>
        <nav>
          <a href="javascript:;">
            <span>品牌</span>
          </a>
          <a href="javascript:;">
            <span>产品</span>
          </a>
          <a href="javascript:;">
            <span>资讯</span>
          </a>
          <a href="javascript:;">
            <span>体验</span>
          </a>
          <a href="javascript:;">
            <span>服务</span>
          </a>
        </nav>
      </div>
      <div class="fr">
        <a href="javascript:;">登录</a>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="stylus" scoped>
a:hover{
	color:red;
}
.head-con {
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);

  header {
    width: 80%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .logo-img {
    display: inline-block;

    img {
      height: 64px;
    }
  }

  nav {
    display: inline-block;

    a {
      display: inline-block;
      position: relative;
      width: 100px;
      text-align:center;
      font-size:14px;  
      span {
        display: block;
        width: 100%;
        border-right: 1px solid #242424;
      }
    }
  }
	.fr{
		a{
			line-height:62px;
			font-size:14px;
		}
	}
}
</style>