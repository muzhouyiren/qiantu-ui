<template>
	<div>
		<img class="banner" :src="activity.mediaUrl" alt="">
		<div class="weui-loadmore" v-if="!activity">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">正在加载</span>
        </div>
		<div class="activity" v-if="activity">
			<div class="topic-tit">
				<h2 class="border-bottom">活动主题</h2>
				<p>{{activity.activityTitle}}</p>
			</div>
			<div class="topic-con" >
				<h2>{{activity.speaker}}</h2>
				<div v-html="activity.speakerRecommend"></div>
			</div>
			<div class="time">
				<p><span>截止时间：</span>{{activity.startTime | YMDNhm}}</p>
			</div>
			<div class="time">
				<p><span>地点：</span>{{activity.activityAddress}}</p>
			</div>
			<div class="process border-top">
				<h2>活动简介：</h2>
				<div v-html="activity.activityContent"></div>
			</div>
		</div>
		<activity-form  v-if="activity.isOut" :id="id"></activity-form>
	</div>
</template>
<script>
import ActivityForm from './components/form'
import { getActivity } from './apis.js'
import weui from "weui.js"
export default {
	name: "Activity",
	components:{
		ActivityForm
	},
	data(){
		return {
			confData:null,
			activity:"",
			id:null,
			openid:null,
		}
	},
	methods:{
		async getActivity(id,openid){
			try {
				let {data} = await getActivity(id,openid);
				if(data.success){
					this.activity = data.data;
				}else{
					weui.alert(data.msg,()=>{
						this.$router.push("/");
					})
				}
				
			} catch (error) {
				console.log(error)
			}
		},
	},
	watch:{
		'$route' () {
			this.id = this.$route.query.id;
			this.openid = localStorage.getItem("openId") || this.$cookies.get("openId");
			this.getActivity(this.id,this.openid);
		}
	},
	created(){
		this.id = this.$route.query.id;
		this.openid = localStorage.getItem("openId") || this.$cookies.get("openId");
		this.getActivity(this.id,this.openid);
	}
};
</script>
<style lang="stylus" scoped>
.banner{
	width 100%
}
.activity{
	padding 30px;
}
.topic-tit{
	font-size 12px;
	h2{
		padding 10px 0;
		font-size 15px;
		font-weight bold;
		margin-bottom 8px;
		color #303030;
		&:before{ 
			border-color #aaa;
		}
	}
}
.topic-con{ 
	padding 20px 0;
	font-size 12px;
	h2{
		font-size: 15px;
    	font-weight: bold;
    	color: #303030;
		margin-bottom:5px;
	}
}
.time{ 
	padding-bottom 12px;
	p{
		font-size 12px;
	}
	p span{
		font-size 15px;
		color #303030;
		font-weight bold;
	}
}
.process{ 
	margin-top 5px;
	font-size 12px;
	p{
		font-size 12px;
	}
	&:before{ 
		border-color #aaa;
	}
	h2{
		font-size 15px;
		color #303030;
		font-weight bold;
		padding 15px 0 7px;
	}
}
</style>
