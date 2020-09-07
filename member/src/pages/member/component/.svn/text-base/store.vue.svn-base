<template>
	<div class="store">
		<div class="title">
			<h2>我的前途驿</h2>
		</div>
		<div class="m-store-swiper">
			<swiper :options='swiperOption'>
				<swiper-slide>
					<div class="left fl">
						<div class="img">
								<img src="@img/card/city-img3.jpg" alt="">
								<p>北京</p>
						</div>
					</div>
					<div class="right fl">
						<div class="flex-box">
							<div class="flex1">
									<p>三里屯北街那里花园</p>
									<a href="http://apis.map.qq.com/uri/v1/marker?marker=coord:39.936180,116.455260;title:前途体验店;addr: 北京市朝阳区三里屯北街81号1幢1层C106">
											<img src="@img/card/go.png" alt="">
									</a>
							</div>
							<div class="flex1">
									<p>金港汽车公园</p>
									<a href="javascript:void(0);">
											<img src="@img/card/wait.png" alt="">
									</a>
							</div>
							</div>
					</div>
				</swiper-slide>
    		<swiper-slide>
					<div class="left fl">
						<div class="img">
								<img src="@img/card/city-img4.jpg" alt="">
								<p>上海</p>
						</div>
          </div>
					<div class="right fl">
						<div class="flex-box">
							<div class="flex1">
									<p>华府天地广场</p>
									<a href="http://apis.map.qq.com/uri/v1/marker?marker=coord:31.219170,121.474230;title:前途体验店;addr: 黄浦区马当路220号">
											<img src="@img/card/go.png" alt="">
									</a>
							</div>
							<div class="flex1">
									<p>闵行区吴中路</p>
									<a href="javascript:void(0);">
											<img src="@img/card/wait.png" alt="">
									</a>
							</div>
						</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="left fl">
						<div class="img">
								<img src="@img/card/city-img2.jpg" alt="">
								<p>广州</p>
						</div>
          </div>
					<div class="right fl">
						<div class="flex-box">
								<div class="flex1">
									<p>珠江新城</p>
									<a href="http://apis.map.qq.com/uri/v1/marker?marker=coord:23.119990,113.326890;title:前途体验店;addr: 珠江新城">
										<img src="@img/card/go.png" alt="">
									</a>
								</div>
								<div class="flex1">
									<p>海珠区新港中路</p>
									<a href="javascript:void(0);">
										<img src="@img/card/wait.png" alt="">
									</a>
								</div>
						</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="left fl">
						<div class="img">
							<img src="@img/card/city-img5.jpg" alt="">
							<p>成都</p>
						</div>
					</div>
					<div class="right fl">
						<div class="flex-box">
							<div class="flex1">
									<p>晶融汇广场</p>
									<a href="http://apis.map.qq.com/uri/v1/marker?marker=coord:30.651760,104.081090;title:前途体验店;addr: 锦江区晶融汇购物中心109">
											<img src="@img/card/go.png" alt="">
									</a>
							</div>
							<div class="flex1">
									<p>高新区</p>
									<a href="javascript:void(0);">
											<img src="@img/card/wait.png" alt="">
									</a>
							</div>
						</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="left fl">
						<div class="img">
							<img src="@img/card/city-img1.jpg" alt="">
							<p>苏州</p>
						</div>
          </div>
					<div class="right fl">
						<div class="flex-box">
							<div class="flex1">
								<p>高新区松花江路</p>
								<a href="javascript:void(0);">
									<img src="@img/card/wait.png" alt="">
								</a>
							</div>
						</div>
					</div>
				</swiper-slide>
				<!-- Optional controls -->
				<div class="swiper-pagination"  slot="pagination"></div>
			</swiper>
		</div>
	</div>
</template>
<script>
export default {
  name: "Store",
  data() {
    return {
      swiperOption: {
        pagination: ".swiper-pagination",
        autoplay: 0
      }
    };
  }
};
</script>
<style lang="stylus" scoped>
@import '~@styles/varibles.styl';
@import '~@styles/mixins.styl';

.store {
	padding: 0 20px 35px;
}

.title {
	text-align: center;
	position: relative;
	padding-bottom: 25px;

	h2 {
		font-size: 15px;
		font-weight: bold;
		color: #313131;
	}
}

.m-store-swiper .fl {
	width: 50%;
	float: left;
}

.swiper-slide {
	height: px2vw(300);
}

.m-store-swiper>>>.swiper-wrapper {
	padding-bottom: 28px;
}

.m-store-swiper>>>.swiper-container-horizontal > .swiper-pagination-bullets {
	bottom: -5px;
}

.m-store-swiper>>>.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
	width: 6px;
	height: 6px;
	margin: 0 2px;
}

.m-store-swiper>>>.swiper-pagination-bullet-active {
	background: #8e8e8e;
}

.m-store-swiper .left {
	position: relative;
	height: 100%;
}

.m-store-swiper .left .img {
	height: 100%;
}

.m-store-swiper .left img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.m-store-swiper .left p {
	position: absolute;
	font-size: 18px;
	color: #fff;
	bottom: 5px;
	right: 10px;
}

.m-store-swiper .right {
	height: 100%;
}

.m-store-swiper .right .flex-box {
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	text-align: center;
	background: #f5f5f5;
	position: relative;
	padding: 10px 0;
}

.m-store-swiper .right .flex-box:after {
	content: '';
	display: block;
	position: absolute;
	left: -19px;
	top: 50%;
	margin-top: -10px;
	border-width: 10px;
	border-style: solid;
	border-color: transparent #f5f5f5 transparent transparent;
}

.m-store-swiper .right .flex-box .flex1 {
	flex: 1;
	-webkit-flex: 1;
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.m-store-swiper .right .flex-box .flex1 p {
	color: #525253;
	font-size: 12px;
	margin-bottom: 10px;
}

.m-store-swiper .right .flex-box .flex1 img {
	width: 100px;
	margin: 0 auto;
}
</style>

