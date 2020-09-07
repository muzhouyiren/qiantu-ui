<template>
  <div class="exchange">
		<div class="title">
			<h2>前途周边</h2>
			<!-- <router-link to="">查看更多</router-link> -->
		</div>
		<div class="coffee">
			<router-link to="/coffee">
				<div class="pic">
							<div class="img"><img src="@img/card/coffee.jpg" alt=""></div>
							<div class="txt">
								<small></small><span>50</span><em></em><span>5.0</span><i class="fa fa-star"></i>
							</div>
						</div>
						<div class="name">Coffee</div>
			</router-link>
		</div>
		<ul class="clearfix">
			<li>
				<a @click="goshop(0)">
					<div class="pic">
						<div class="img"><img src="@img/card/img1.jpg" alt=""></div>
						<div class="txt">
							<small></small><span>98</span><em></em><span>5.0</span><i class="fa fa-star"></i>
						</div>
					</div>
					<div class="name">平衡竹蜻蜓</div>
				</a>
			</li>
			<li>
				<a @click="goshop(1)">
					<div class="pic">
						<div class="img"><img src="@img/card/img2.jpg" alt=""></div>
						<div class="txt">
							<small></small><span>1500</span><em></em><span>5.0</span><i class="fa fa-star"></i>
						</div>
					</div>
					<div class="name">前途车模</div>
				</a>
			</li>
			<li>
				<a @click="goshop(2)">
					<div class="pic">
						<div class="img"><img src="@img/card/img3.jpg" alt=""></div>
						<div class="txt">
							<small></small><span>298</span><em></em><span>5.0</span><i class="fa fa-star"></i>
						</div>
					</div>
					<div class="name">智能保温杯</div>
				</a>
			</li>
			<li>
				<a @click="goshop(3)">
					<div class="pic">
						<div class="img"><img src="@img/card/img4.jpg" alt=""></div>
						<div class="txt">
							<small></small><span>598</span><em></em><span>5.0</span><i class="fa fa-star"></i>
						</div>
					</div>
					<div class="name">防盗背包</div>
				</a>
			</li>
		</ul>
	</div>
</template>
<script>
import weui from "weui.js";
import { gettoken } from "../apis.js";
export default {
  name: "Exchange",
  data() {
    return {
      openid: "",
      imgArr: [
        this.$useConf.shopUrl+"1797",
        this.$useConf.shopUrl+"1794",
        this.$useConf.shopUrl+"1796",
        this.$useConf.shopUrl+"1795"
      ]
    };
  },
  methods: {
	showloading() {
      return weui.loading("loading");
    },
    async gettoken(params, index) {
      try {
        let loading = this.showloading();
        let { data, status } = await gettoken(params);
        if (status == 200) {
          loading.hide();
				}
        if (data.success) {
						let token = data.data;
						location.href = `${this.$useConf.mallUrl}${token}&redirectUrl=${this.imgArr[index]}`;
        } else {
          weui.alert(data.msg);
        }
      } catch (error) {}
    },
    goshop(index) {
      this.gettoken({ openid: this.openid }, index);
    }
  },
  created() {
    this.openid = localStorage.getItem("openId") || this.$cookies.get("openId");
  }
};
</script>
<style lang="stylus" scoped>
@import '~@styles/varibles.styl';
@import '~@styles/mixins.styl';

.exchange {
	padding: 20px;
}

.title {
	margin: 20px 0 20px;
	position: relative;

	h2 {
		font-size: 15px;
		font-weight: bold;
		color: #313131;
	}

	a {
		position: absolute;
		right: 0;
		top: 0;
		font-size: 10px;
		color: $color;
		margin-top: 4px;
	}
}


	.exchange ul li,.coffee {
		float: left;
		width: 50%;
		padding-bottom: 15px;

		.pic {
			overflow: hidden;
			border-radius: 3px;
		}

		a {
			display: block;
		}

		img {
			width: 100%;
			// height px2vw(250);
			height: 50%;
			object-fit: cover;
			background: #e9eaf1;
		}

		&:nth-child(odd) {
			padding-right: 12.5px;
		}

		&:nth-child(even) {
			padding-left: 12.5px;
		}

		.txt {
			background: #f7f7f7;
			padding: 5px 10px;
			color: #292929;
			font-size: 11px;

			small {
				display: inline-block;
				vertical-align: middle;
				width: 10px;
				height: 13px;
				margin-right: 5px;
				background: url('~@img/card/icon-point.jpg') no-repeat center;
				background-size: 10px 13px;
			}

			span {
				font-size: 11px;
				font-weight: bold;
				display: inline-block;
				vertical-align: middle;
			}

			i {
				color: #d4ccb4;
				margin-left: 5px;
				display: inline-block;
				vertical-align: middle;
			}

			em {
				display: inline-block;
				vertical-align: middle;
				width: 10px;
				height: 18px;
				margin: 0 8px;
				background: url('~@img/card/line.png') no-repeat center;
				background-size: 8px 18px;
			}
		}

		.name {
			font-size: 12px;
			font-weight: bold;
			color: #383838;
			ellipsis(auto);
			padding: 8px 0;
		}
	}
	.coffee{
		width 100%;
		float none;
		padding-left 0 !important;
	}

</style>

