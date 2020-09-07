<template>
	<div>
		<div class="card-box">
			<div class="info">
				<div class="txt">
					<p class="time">{{''| eMD}}</p>
					<h2 class="name">Hi {{userInfo.sysMemberUserName}}！</h2>
				</div>
				<div class="img">
					<img v-if="userInfo.accountFansHead" :src="userInfo.accountFansHead" alt="">
					<img v-else src="@img/card/avatar.png" alt="">
				</div>
			</div>
			<div class="card" @click="flip">
				<div :class="['img',this.isFlip?'cur':'']">
					<img src="@img/card/card.jpg" alt="">
					<p class="cardNo">NO.{{userInfo.sysMemberCard}}</p>
					<p class="cardLevel" >V<span>{{userInfo.sysMember?userInfo.sysMember:1}}</span></p>
					<!-- <p class="cardLevel" v-if="userInfo.sysMember==item.id" v-for="item of level" :key="item.id">V<span>{{item.name}}</span></p> -->
				</div>
				<div :class="['qrcode',this.isFlip?'cur':'']">
					<div id="qrcode"></div>
					<p><span>NO.{{userInfo.sysMemberCard}}</span><span>积分：{{userInfo.sysIntegralNow}}</span></p>
				</div>
			</div>
		</div>
		<div class="panel">
			<div class="point clearfix">
				<p>
					<router-link to="/myPoint">
						<span>可用积分<i>{{userInfo.sysIntegralNow?userInfo.sysIntegralNow:0}}</i></span>
						<span class="space-span"></span>
						<span>累计积分<i>{{userInfo.sysIntegralSum?userInfo.sysIntegralSum:0}}</i></span>
					</router-link>	
				</p>
				<div class="point-name">
					
					<router-link to="/earnPoints" class="earnPoints">积分赚取攻略</router-link>
					<a href="javascript:void(0);" @click="signClick">
						<p v-if="!isSign">
							<img src="@img/card/sign.png" alt="">
							<span>签到</span>
						</p>
						<p v-if="isSign">
							<img src="@img/card/sign-1.png" alt="">
							<span style="color:#d4a667">已签</span>
						</p>
						<div :class="['coin',this.isCur?'cur':'']"><img src="@img/card/coin.png" alt=""></div>
					</a>
				</div>
			</div>			
			<div class="mine">
				<router-link to="/level">
					<img src="@img/card/icon1.jpg" alt="">
					<p>会员权益</p>
				</router-link>
				<router-link to="/myActivity">
					<img src="@img/card/icon2.jpg" alt="">
					<p>我的活动</p>
				</router-link>
				<a @click="goShop">
					<img src="@img/card/icon3.jpg" alt="">
					<p>积分商城</p>
				</a>
				<router-link to="">
					<img src="@img/card/dot.jpg" alt="">
					<p>更多</p>
				</router-link>
			</div>
			<div class="m-store-swiper" v-if="!activityList.length==0">
				<swiper :options='swiperOption'>
					<swiper-slide v-for="(item,index) in activityList" :key="index">
						<router-link class="activity" :to="{path:'/activity',query: { id: item.id }}">
							<img :src="item.mainPicUrl" alt="">
						</router-link>
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
		</div>
	</div>
</template>
<script>
import weui from "weui.js";
import QRCode from "qrcodejs2";
import { getActivityList, getUserInfo, signIn, gettoken } from "../apis.js";
export default {
  name: "Card",
  data() {
    return {
      swiperOption: {
        pagination: ".swiper-pagination",
				autoplay: 5000,
				autoplayDisableOnInteraction : false,
				speed:600
      },
      level: [
        {
          name: "1",
          id: 1
        },
        {
          name: "2",
          id: 2
        },
        {
          name: "3",
          id: 3
        },
        {
          name: "4",
          id: 4
        }
      ],
      activityList: [],
      userInfo: "",
      isFlip: false,
      isSign: false,
      userid: "",
			isCur: false,
			openid:'',
			isClick:true
    };
  },
  methods: {
    showloading() {
      return weui.loading("loading");
    },
    async getActivityList() {
      try {
        let { data } = await getActivityList();
        if (data.success) {
          this.activityList = data.data;
        } else {
          weui.alert(data.msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getUserInfo(params) {
      try {
        let { data } = await getUserInfo(params);
				let loading = this.showloading();
        if (data.success) {
          loading.hide();
          this.userInfo = data.data;
          this.userInfo.sysMemberCard = this.userInfo.sysMemberCard
            ? this.userInfo.sysMemberCard
            : "QT";
          this.qrcode(this.userInfo.sysMemberCard);
          this.userid = this.userInfo.mid;
          this.isSign = this.userInfo.isSign;
        } else {
          loading.hide();
          weui.alert(data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async signIn(params) {
      try {
				let { data, status} = await signIn(params);
				let loading = this.showloading();		
				if(status == 200){
						loading.hide();
						this.isClick = true;
				}
        if (data.success) {
          this.isSign = true;
					this.isCur = true;
					this.userInfo.sysIntegralNow += 1;
					this.userInfo.sysIntegralSum += 1;
        } else {
          weui.alert(data.msg);
        }
      } catch (error) {
        console.log(error);
      }
		},
		async gettoken(params){
			try {
				let loading = this.showloading();
				let { data,status } = await gettoken(params);
				if(status == 200){
					loading.hide();
				}
				if(data.success){
					let token = data.data;
					location.href = `${this.$useConf.mallUrl}${token}&redirectUrl=http://shopping.qiantumotor.com/m/`;
				}else{
					weui.alert(data.msg);
				}
				console.log(data);
			} catch (error) {
				
			}
		},
    flip() {
      this.isFlip = !this.isFlip;
    },
    qrcode(txt) {
      let qrcode = new QRCode("qrcode", {
        width: 100,
        height: 100,
        text: txt
      });
    },
    signClick() {
      if (!this.isSign) {
				if(this.isClick && this.userid){
					// this.signIn({ userid: this.userid });
					this.signIn({ mid: this.userid });//测试修改userid为mid
					this.isClick = false;
				}
				
      }
		},
		goShop(){
			this.gettoken({"openid":this.openid});
		}
  },
  created() {
    this.getActivityList();
    this.openid = localStorage.getItem("openId") || this.$cookies.get("openId");
		this.getUserInfo({ openid: this.openid });
		
	},
	
};
</script>
<style lang="stylus" scoped>
@import '~@styles/varibles.styl';

.card-box {
	transition: all 1s ease;
	position: relative;
	z-index: 1;

	&.cur {
		background: #fff;
	}
}

.card {
	padding: 20px 20px 20px;
	perspective: 760px;
	transform-style: preserve-3d;
	position: relative;
	overflow: hidden;

	.qrcode {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 12px 20px;
		transform: rotateY(-180deg);
		transition: all 1s ease;
		backface-visibility: hidden;
		text-align: center;

		&.cur {
			transform: rotateY(0deg);
		}

		#qrcode {
			display: inline-block;
			margin: 0 auto;
			margin-top: 8%;
		}

		p {
			left: 40px;
			right: 40px;
			bottom 15%;
			text-align: left;
			span~span {
				float: right;
			}
		}
	}

	.img {
		position: relative;
		transition: all 1s ease;
		backface-visibility: hidden;
		transform: rotateY(0);
		max-width: 500px;
		margin: 0 auto;
		border-radius: 3px;
		overflow: hidden;
		&.cur {
			transform: rotateY(180deg);
		}
	}

	img {
		width: 100%;
	}

	p {
		position: absolute;
		bottom: 10%;
		font-family: 'soleil';
	}
	p.cardNo{
		color #fff;
		right: 17px;
	}
	p.cardLevel{
		color #fff;
		left 23px;
		font-size 30px;
		span{
			font-size 24px;
		}
	}
}

.panel {
	background: #fff;
	position: relative;
	z-index: 2;
}

.info {
	padding: 25px 20px 0;
	display: flex;

	&:before {
		border-color: #b1b1b1;
	}

	.img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.txt {
		flex: 1;

		p.time {
			font-size: 12px;
			color: #676262;
		}

		h2.name {
			font-size: 36px;
			color: #383838;
			padding: 5px 0 0;
		}
	}
}

.point-name {
	display flex;
	flex 1;
	justify-content: space-between;
	flex-wrap: wrap;
	&>span {
		font-size: 15px;
		color: #3a3e47;
		padding-top: 2px;
	}

	&>a {
		margin-bottom 10px;
		position: relative;
		p{	
			position: relative;
		}
		p img {
			width: 18px;
			position absolute;
			left 0 ;
			bottom 0;
		}

		span {
			font-size: 10px;
			color: #9295a4;
			vertical-align: middle;
			padding-left 26px;
		}
	}
	.earnPoints{
		margin-right 10px;
		@media(max-width:350px){
			margin-right 5px;
		}
	}

	.coin {
		position: absolute;
		left: 50%;
		margin-left: -8px;
		bottom: 60%;
		opacity: 0;

		&.cur {
			animation: coin 0.8s forwards;
		}

		transition: all 0.5s ease;

		img {
			width: 16px;
		}
	}
}

.point {
	font-size: 10px;
	color: #9295a4;
	padding 0 20px;
	display flex;
	i {
		font-weight: bold;
		color: #676262;
		margin-left: 8px;
		display: inline-block;
		@media(max-width:350px){
			margin-left: 4px;
		}
	}

	&>p {
		padding-right: 10%;
		@media(max-width:350px){
			padding-right: 4%;
		}
		a{
			overflow hidden;
		}
		span{
			float left;
			display block;
		}
		
		.space-span{
			width:20px;
			height:100%;
			@media(max-width:350px){
				width:10px;
			}
		}
	}
}

// .level {
// 	display: flex;

// 	&:before {
// 		border-color: #444853;
// 		z-index: 1;
// 	}

// 	&:after {
// 		border-color: #444853;
// 		z-index: 1;
// 	}

// 	span {
// 		flex: 1;
// 		text-align: center;
// 		padding: 10px 0;
// 		font-size: 12px;
// 		color: #313131;
// 		font-weight: bold;

// 		&.cur {
// 			background-color: #eceff4;
// 		}

// 		&:before {
// 			border-color: rgba(#313131, 0.5);
// 		}

// 		&:first-child {
// 			&:before {
// 				display: none;
// 			}
// 		}
// 	}
// }

.mine {
	display: flex;
	padding: 10px 0;
	margin 15px 0 40px;
	background #f7f7f7;
	a {
		flex: 1;
		text-align: center;

		img {
			width: 33px;
		}

		p {
			padding-top: 8px;
			font-size: 12px;
			color: #9295a4;
		}
	}
}

.activity {
	img {
		width: 100%;
	}
}

.m-store-swiper {
}

.m-store-swiper>>>.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
	width: 6px;
	height: 6px;
	margin: 0 3px;
	background:#bfbfbf;
	opacity 1;
}

.m-store-swiper>>>.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet.swiper-pagination-bullet-active {
	background: #fff;
}

@keyframes coin {
	0 {
		transform: translate(0, 0) rotateY(0) scale(1);
		animation-timing-function: ease;
		opacity: 0;
	}

	50% {
		transform: translate(0, -15px) rotateY(80deg) scale(1.1);
		animation-timing-function: ease-out;
		opacity: 1;
	}

	100% {
		transform: translate(0, 0px) rotateY(120deg) scale(1);
		opacity: 0;
	}
}
</style>