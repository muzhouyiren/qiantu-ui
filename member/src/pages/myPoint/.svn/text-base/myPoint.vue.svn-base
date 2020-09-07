<template>
    <div class="box">
        <h2 class="tit">我的积分</h2>
        <div class="showPoint">
            <div class="flex">
                <span>{{nowIntegral}}</span>
                <p>可用积分</p>
            </div>
        </div>
        <p class="total-point">累计积分：<span>{{sumIntegral}}</span></p>
        <div class="list">
            <p class="tit border-bottom"><span>明细</span></p>
            <ul v-if="pointList">
                <li class="border-bottom" v-for="(item,index) of pointList" :key="index">
                    <div class="name">
                        <span>{{item.sourceName}}</span>
                        <i v-if="item.type == 0">-{{item.integral}}</i>
												<i v-if="item.type == 1">+{{item.integral}}</i>
                    </div>
                    <div class="time">{{item.ctime | YMDHms}}</div>
                </li>
            </ul>
						<div class="weui-loadmore" v-if="!flag">
								<i class="weui-loading"></i>
								<span class="weui-loadmore__tips">正在加载</span>
						</div>
						<div class="weui-loadmore" v-if="!flag">
								<span class="weui-loadmore__tips">上拉加载</span>
						</div>
        </div>
        
    </div>
</template>
<script>
import weui from "weui.js";
import { getPoint } from "./apis.js";
export default {
  name: "MyPoint",
  data() {
    return {
      pointList: [],
      nowIntegral: "",
      sumIntegral: "",
      flag: true
    };
  },
  methods: {
	showloading(){
		return weui.loading("loading");	
	},
    async getPoint(params) {
      try {
		let { data,status} = await getPoint(params);
		let loading = this.showloading();
		if(status == 200){
			loading.hide();
		}
        if (data.success) {
          this.pointList = data.data.userIntegraList;
          if (data.data.sysIntegral) {
            this.nowIntegral = data.data.sysIntegral.nowIntegral;
            this.sumIntegral = data.data.sysIntegral.sumIntegral;
          }
        } else {
          weui.alert(data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var distanceTop = document.body.scrollHeight - window.innerHeight;
      let lock = true;
      //判断是否到底部
      if (scrollTop + 5 > distanceTop && lock) {
        lock = false;
        this.flag = false;
        setTimeout(() => {
          lock = true;
          this.flag = true;
        }, 2000);
      }
    }
  },
  created() {
    let openId = localStorage.getItem("openId") || this.$cookies.get("openId");
    this.getPoint({ openid: openId });
    // this.pointList = new Array(10).fill({sourceName:'积分',integral:'10',ctime:1537840503000});
  },
  mounted() {
    // window.addEventListener('scroll',this.handleScroll);
  }
};
</script>
<style lang="stylus" scoped>
@import '~@styles/varibles.styl';
@import '~@styles/mixins.styl';

.box {
	padding: 30px;
}

h2.tit {
	font-size: 18px;
	color: #282828;
	text-align: center;
	padding: 0 0 20px;
	font-weight: bold;
}

.showPoint {
	width: 95px;
	height: 95px;
	background: $color;
	border-radius: 50%;
	margin: 0 auto;
	text-align: center;
	color: #fff;
	font-size: 15px;
	display: flex;
	align-items: center;

	.flex {
		flex: 1;
	}
}

.total-point {
	text-align: right;
	font-size: 13px;
	color: #878787;
	padding-right: 10px;

	span {
		color: $color;
	}
}

.list {
	padding-top: 25px;

	p.tit {
		position: relative;
		height: 1px;

		&:before {
			border-color: #919191;
		}

		span {
			position: absolute;
			width: 56px;
			height: 20px;
			line-height: 20px;
			font-size: 12px;
			color: #343434;
			text-align: center;
			background: #fff;
			margin: 0 auto;
			left: 50%;
			margin-left: -28px;
			top: -10px;
		}
	}
}

.list {
	li {
		font-size: 12px;
		padding: 10px 10px 15px;

		&:before {
			border-color: #919191;
		}

		.name {
			display: flex;
			justify-content: space-between;
			margin-bottom: 3px;

			i {
				color: $color;
			}
		}

		.time {
			color: #929292;
		}
	}
}
</style>

