<template>
	<div>
		<div class="banner"><img src="@img/index/banner1.jpg" alt=""></div>
		<div class="txt">
			<h2 class="border-bottom">前途俱乐部</h2>
			<p>前途会员俱乐部，旨在聚集时代进取者及各行精英人士，搭建集智趣沙龙、跑车体验、思享空间、车友活动于一体的社交互动平台，成为会员将拥有多重专享待遇及至尊权益。</p>
		</div>
		<div class="btn">
			<span @click="hanleCard">成为会员</span>
		</div>
		<div class="imgs">
			<div class="up">
				<div class="left">
					<img src="@img/index/pic1.jpg" alt="">
				</div>
				<div class="right">
					<img src="@img/index/pic2.jpg" alt="">
				</div>
			</div>
			<div class="down">
				<div class="left">
					<img src="@img/index/pic3.jpg" alt="">
					<img src="@img/index/pic4.jpg" alt="">
					<img src="@img/index/pic5.jpg" alt="">
				</div>
				<div class="right">
					<img src="@img/index/pic6.jpg" alt="">
					<img src="@img/index/pic7.jpg" alt="">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getJsApiTicket } from "./apis.js";
import wx from 'weixin-js-sdk';
import weui from 'weui.js';
export default {
  name: "Index",
  data() {
    return {
      reswx: "",
			cardId:this.$useConf.cardId,
			cardSign: "",
			openid:'',
			code:"",
    };
  },
  methods: {
    async getJsApiTicket(params) {
      let { data } = await getJsApiTicket(params);
      if (data.success) {
				this.addCard(data.data)
      } else {
        weui.alert(data.msg);
      }
		},
		async findCardIdInfo(params) {
			let { data } = await findCardIdInfo(params);
			if(data.success){
				this.addCard();
			}else{
				weui.alert(data.msg)
			}
		},
		hanleCard(){
    	this.getJsApiTicket({ openid: this.openid, cardId: this.cardId });
		},
    addCard(data) {
      wx.addCard({
        cardList: [
          {
            cardId: this.cardId,
            cardExt: `{"code":"${data.code}","openid":"${this.openid}","nonce_str":"${data.nonceStr}", "timestamp": "${data.timestamp}", "signature":"${data.cardSign}"}`
          }
        ], // 需要添加的卡券列表
        success: function(res) {
          console.log("成功", res);
        },
        fail: function(res) {
          console.log("失败", res);
        },
        error: function(res) {
          console.log(res);
        }
      });
    },
  },
  created() {
		this.openid = localStorage.getItem("openId") || this.$cookies.get("openId");
  }
};
</script>

<style lang="stylus" scoped>
@import '~@styles/varibles.styl';

.banner {
	img {
		width: 100%;
	}
}

.txt {
	padding: 40px 20px 30px;
	text-align: center;
	color: #282828;

	h2 {
		font-size: 18px;
		font-weight: bold;
		padding-bottom: 10px;
		margin-bottom: 15px;

		&.border-bottom::before {
			border-color: #8e8e8e;
			width: 38px;
			left: 50%;
			margin-left: -19px;
		}
	}

	p {
		font-size: 12px;
		line-height: 1.8;
	}
}

.btn {
	text-align: center;
	margin-bottom: 50px;

	span {
		display: inline-block;
		width: 170px;
		height: 35px;
		line-height: 35px;
		border: 1px solid $color;
		border-radius: 3px;
		font-size: 15px;
		font-weight: bold;
		color: $color;
		transition: all 0.5s ease;

		&:active {
			box-shadow: 0px 0px 2px 1px rgba(233, 187, 125, 0.5) inset;
		}
	}
}

.imgs {
	padding: 0 13px 20px 13px;

	.up {
		display: flex;

		img {
			position: absolute;
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: all 0.5s ease;

			&:active {
				transform: scale(1.02);
				box-shadow: 0px 0px 14px -10px rgba(0, 0, 0, 0.2);
			}
		}

		&>div {
			position: relative;
			padding-bottom: 37.3%;
		}

		.left {
			width: 60%;
			margin-right: 4px;
		}

		.right {
			width: 40%;
		}
	}

	.down {
		display: flex;
		margin-top: 4px;

		img {
			width: 100%;
			transition: all 0.5s ease;

			&:active {
				transform: scale(1.02);
				box-shadow: 0px 0px 14px -10px rgba(0, 0, 0, 0.2);
			}
		}

		&>div {
			position: relative;
			width: 50%;
		}

		.left {
			margin-right: 4px;
			display: flex;
			flex-direction: column;

			img:nth-child(2) {
				margin: 4px 0;
			}
		}

		.right {
			img:nth-child(2) {
				margin-top: 4px;
			}
		}
	}
}
</style>