<template>
	<div>
		<Header></Header>
		<div class="page">
			<div class="pr">
				<div :class="['ccfg-hdTab j-headNav',headFiexd?'srollFiexd':'']" ref="headNav">
					<div class="g-center">
						<a v-for="(item,index) in dataJson.cates" :key="index" :class="[index == 0?'active':'', 'j-configItem',item.iconActive?'icon_active':'']" @click="jump(index,$event)">
							{{item.frontName}}
						</a>
					</div>
				</div>
				<div class="m-chooseConfigWrap" style="overflow: hidden;">
					<div class="g-center clearfix">
						<div class="mccw-left">
							<div class="js-config clearfix section" v-for="(item,key) in dataJson.cates" :key="key">
								<!-- <div class="packs-container" style="margin-top: 50px;" v-if="item.id == 5">
									<h2 class="y_title">{{item.frontName}}</h2>
									<div class="pack-card" v-for="(val,index) in dataJson.materials" :key="index" :id="val.id" v-if="val.subClassId == 5">
										<div class="pic-wrapper">
											<figure data-linktracking="packs:Q90P:thumbnail" class="modal-figure">
												<img :src="val.iconPath" alt="" title="">
											</figure>
										</div>
										<div class="header">
											<span class="card-title">{{val.frontName}}</span>
											<button :class="['add_btn fr',val.disabled?'_disabled':'',val.addEvent?'remove':'']" type="button" @click="selectFun(val)">{{val.btn_txt}}</button>
										</div>
										<div class="content">
											<p class="price">¥ {{val.price}}</p>
											<p><span data-key="RECTAB_PACK_CONTAINS" class="features-title">该软件包包含:</span></p>
											<p class="features">
												<ul class="implicits">
													<li><span data-key="Q4WE">碳纤维换挡拨片</span></li>
													<li><span data-key="Q8SM">碳纤维车门门槛</span></li>
												</ul>
												<ul class="explicits">
													<li><span data-key="Q04B">立体编织高光碳纤维内饰</span></li>
												</ul>
												<ul class="sets">
													<li><span>碳纤维质运动型方向盘</span></li>
												</ul>
											</p>
										</div>
									</div>
								</div> -->

								<div class="packs-container clearfix" style="margin-top: 50px;" v-if="item.id == 5">
									<h2 class="y_title">{{item.frontName}}</h2>
									<div class="optional-card" v-for="(val,index) in dataJson.materials" :key="index" :id="val.id" v-if="val.subClassId == 5">
										<figure data-linktracking="optionals:Q4JF:thumbnail" class="modal-figure">
											<img :src="val.iconPath" alt="">
										</figure>
										<div class="header">
											<h3 class="card-title">{{val.frontName}}</h3>
										</div>
										<div class="content clearfix">
											<p class="price fl">¥ {{val.price}}</p>
											<button :class="['add_btn fr',val.disabled?'_disabled':'',val.addEvent?'remove':'']" type="button" @click="selectFun(val)">{{val.btn_txt}}</button>
										</div>
									</div>
								</div>
									
								<div class="packs-container clearfix" v-else-if="item.id == 4">
									<h2 class="y_title">{{item.frontName}}</h2>
									<div class="optional-card" v-for="(val,index) in dataJson.materials" :key="index" :id="val.id" v-if="val.subClassId == 4">
										<figure class="modal-figure">
											<img :src="val.iconPath" alt="">
										</figure>
										<div class="header">
											<h3 class="card-title">{{val.frontName}}</h3>
										</div>
										<div class="content clearfix">
											<p class="price fl">¥ {{val.price}}</p>
											<!-- {{selectArr}} -->
											<button :class="['add_btn fr',val.disabled?'_disabled':'',val.addEvent?'remove':'']" type="button" @click="selectFun(val)">{{val.btn_txt}}</button>
										</div>
									</div>
								</div>
								<div v-else>
									<div class="mccw-banner">
										<swiper :options="swiperOptionImg">
											<swiper-slide v-for="(val,index) in dataJson.images" :key="index" v-if="(key+1) == val.subClassId">
												<img :src="val.path" alt="">
											</swiper-slide>
										</swiper>
									</div>
									<div class="mccw-fd">
										<span class="fl">{{item.frontName}}</span>
										<!-- {{priceArr}} -->
										<ul class="f-cb clearfix">
											<li :class="[val.active?'active':'','j-item']" v-for="(val,index) in dataJson.materials" :key="index" :id="val.id" v-if="(key+1) == val.subClassId" @click="clickFun(val)">
												<i>{{val.frontName}}</i>
												<img :src="val.iconPath">
												<p>￥{{val.price}}</p>
											</li>
										</ul>
									</div>
								</div>
							</div>

						</div>
						<div :class="['mccw-right',srollFiexd?'srollFiexd':'']" :style="{top: srollFiexd?scroll:0}" ref="mccwRight">
							<div class="mccw-gooditem">
								<h3>前途K20</h3>
								<div class="j-price">
									<img :src="dataJson.images[0].path">
								</div>
								<div class="finance-way">
									<div class="finance-hd clearfix">
										<span :class="['fl', item.active?'active':'']" v-for="(item,index) in tabItem" :key="index" @click="spanTab(item,index)">{{item.value}}</span>
									</div>
									<div class="finance-bd">
										<div class="tab-item" v-if="tabItemShow">
											<div class="cash-money" style="text-align: left;padding: 30px 30px;">
												<p style="padding-top: 35px;margin-bottom: 15px;">补贴后总价：￥<span>{{moneyTotal}} </span></p>
											</div>
											<div class="deal-date">*此价格为全国统一补贴后价格 <br>
												<div style="padding: 6px 16px;">
													<p style="margin-bottom: 4px;">官方售价：¥754,300</p>
													<p style="margin-bottom: 4px;">国家补贴：-¥ 45,000</p>
													<p>地方补贴：-¥ 22,500 (最高)</p>
												</div>
												**预计交付时间：具体交付时间以销售反馈为准
											</div>
										</div>
										
										<div class="tab-item f-tac" v-else>
											<div class="loan-money">
												<span v-for="(item,index) in loanMoney" :key="index">
													<span v-for="(item2,index2) in item.date" :key="index2">
														<span :class="[index==0&&index2==0?'':'hide']" >{{item2.note}}</span>
													</span>
												</span>
												<!-- <span class="js-month-0 hide">28,617</span>
												<span class="js-month-1 hide">26,918</span>
												<span class="js-month-2 hide">23,371</span>
												<span class="js-month-3">15,976</span>
												<span class="js-month-4 hide">12,651</span>
												<span class="js-month-5 hide">10,620</span> -->
											</div>
											<div class="loan-way">预估月供</div>
											<div class="loan-tip">以银行现标准为准，目前数值仅为参考</div>
											<div class="loan-year-rate">
												<div class="f-ib f-cb">
                                                    <label v-for="(item,index) in loanMoney" :key="index">
														<span v-for="(item2,index2) in item.date" :key="index2">
															<i :class="[index==0?'active':'','js-year']" >{{item2.resourceName}}</i>
														</span>
													</label>
												</div>
												<p>期限</p>
											</div>
											<div class="loan-year-rate1 f-tac" style="margin-bottom: 20px;">
												<div class="f-ib f-cb">
													<span v-for="(item,index) in loanMoney" :key="index">
														<span v-for="(item2,index2) in item.date" :key="index2">
															<i :class="['f-fl','js-first-pay',index==0&&index2==0?'active':'hide']" >{{item2.paramValueShowName}}</i>
														</span>
													</span>
												</div>
												<p>首付款</p>
											</div>
											<div class="loan-month">
												预计交付时间：具体交付时间以销售反馈为准
											</div>
										</div>
									</div>
								</div>
								<div class="buttons">
									<!-- <a class="button1 j-createOrder" style="line-height: 54px;height: 54px;font-size: 18px;" @click="goK20order()">立即订购</a> -->
								</div>
								<div class="fd f-cb clearfix">
									<a class="js-saveConfig">
										<img src="@img/icon-save.png">
										<span class="" style="display: inline;">保存配置</span>
									</a>
									<a class="ly-pz" @click="goK20order('look')">
										<img src="@img/icon-pz.png">
										查看已选配置
									</a>
								</div>
								<p style="font-size: 14px;color: #878787;">＊价格包含增值税，适用与价格相关的其他免责条款</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<br>
		<br>
		<Modal
			v-model="modal1"
			title="查看已选配置"
			cancel-text=''
			width="800"
			>
			<div class="modal_box">
				<div v-for="(val,key) in dataJson.cates" :key="key" class="modal_item" v-if="val.iconActive">
					<p class="modal_title">{{val.frontName}}</p>
					<div v-for="(item,index) in k20_data1" :key="index" v-if="val.id == item.subClassId" class="modal_info clearfix">
						<span>{{item.frontName}}</span>
						<span>{{item.price}}</span>
					</div>
				</div>
				
			</div>
		</Modal>
		<Footer :style="configDetails.length>0?'margin-bottom: 168px;':''"></Footer>
		<div class="config_details clearfix" v-show="configDetails.length>0">
			<p class="fl" style="width:100px;">选配项：</p>
			<div class="config_list fl clearfix">
				<Icon class="fl icon_move" type="ios-arrow-dropleft" size="40" @click="move('0')"/>
				<div class="fl ul_list">
					<ul class="clearfix" :style="{width: ulWidth}">
						<li :class="['config_li fl',item.subClassId == '4'||item.subClassId == '5'?'width118':'']" v-for="(item,index) in configDetails" :key="index" ref="ulList">
							<img :src="item.iconPath" alt="">
							<p class="front_name" :title="item.frontName">{{item.frontName}}</p>
							<p>¥{{item.price}}</p>
							<!-- <i v-show="item.subClassId == 4 || item.subClassId == 5" @click="configClose(item)"></i> -->
			 				<Icon type="md-close-circle" v-show="item.subClassId == 4 || item.subClassId == 5" @click="configClose(item)"/>
							<img class="icon_add" src="@img/icon-add.png" alt="">
						</li>
					</ul>
				</div>
				<Icon class="fl icon_move" type="ios-arrow-dropright" size="40" @click="move('1')"/>
			</div>
			<div class="config_price fr">
				<p>补贴后总价： <span>¥ {{moneyTotal}}</span></p>
				<a class="button1 j-createOrder" @click="goK20order()">立即订购</a>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from "@components/header/Header"
	import Footer from "@components/footer/Footer"
	import { PageIndex } from "./apis.js";
	const pageIndex = new PageIndex();
	import DataJson from "@json/data.json";
	import LoanMoney from "@json/loan_money.json";
	import $ from 'jquery'
	export default {
		name: "Index",
		components:{
			Header,
			Footer
		},
		data() {
			return {
				configDetails: [],//已选配置清单
				modal1:false,
				k20_columns1: [
					{
					title: "说明",
					slot: "frontName",
					key: "frontName",
					width: '300'
					},
					{
					title: "编号",
					key: "id"
					},
					{
					title: "价格",
					key: "price"
					}
				],
				k20_data1: [],
				carColor: '',//车辆外观颜色
				swiperOptionImg: {
					pagination: ".swiper-pagination",
					autoplay: 3000,
					loop: true,
					autoplayDisableOnInteraction: false,
				},
				// current: 0,
				yearShow: true,
				dataJson: [],
				addEvent: false,
				headFiexd: false,
				srollFiexd: false,
				ids: [],
				btn_txt: '添加',
				loanMoney: [],
				scroll: 0,
				tabItem: [{
					value: "现金全款",
					active: true,
				},{
					value: "贷款方案",
					active: false,
				}],
				tabItemShow: true,
				priceArr: [],
				selectArr: [],
				selectIds: [],//个性化ids
				selectData: 0,
				priceData: 0,
				selectObj:[],
				num1: 0,
				ulWidth: ''
			};
		},
		methods: {
			move(val){
				console.log("val==",val)
				var _width = this.configDetails.length * 198 - 80
				if(_width > 910){
					console.log("sdlkfds")
					if(val == '1') { /* ul往左移动*/
						this.num1++;
						if(this.num1 > Math.ceil(this.configDetails.length/2)) {
							this.num1 = Math.ceil(this.configDetails.length/2);
						}
						$(".ul_list>ul").animate({
							marginLeft: -this.num1 * 127 * 2 + "px"
						});
					} else { /* ul往右移动*/
						this.num1--;
						if(this.num1 < 0) {
							this.num1 = 0
						}
						$(".ul_list>ul").animate({
							marginLeft: -this.num1 * 127 * 2 + "px"
						})
					}
				}else{
					$(".ul_list>ul").animate({
						marginLeft: 0
					})
				}
			},
			configClose(val){//已选配置删除事件
				console.log("id===",val.id);
				var index = this.arrRemove(val.price,this.selectArr); 
				var key = this.arrRemove(val.id,this.selectIds); //所选个性化ids
				var selectObjKey = this.arrObjRemove(val.id,this.selectObj)
				var defaultKey = this.arrObjRemove(val.id,this.dataJson.default)
				var configDetailsKey = this.arrObjRemove(val.id,this.configDetails)//已选配置列表里删除
				if (index > -1) { 
					this.selectArr.splice(index, 1); 
				} 
				if (key > -1) { 
					this.selectIds.splice(key, 1);//所选个性化ids
				} 
				if (selectObjKey > -1) { 
					this.selectObj.splice(selectObjKey, 1);//所选个性化ids
				} 
				if (defaultKey > -1) { 
					this.dataJson.default.splice(defaultKey, 1);//所选个性化ids
				} 
				if (configDetailsKey > -1) { 
					this.configDetails.splice(configDetailsKey, 1);//已选配置列表里删除
				} 

				for(var i in this.dataJson.materials){
					if(val.id == this.dataJson.materials[i].id){
						this.dataJson.materials[i].btn_txt = "添加";
						this.dataJson.materials[i].addEvent = false;
					}
				}
				var arr4 = [],arr5 = [];
					for(var i in this.selectObj){
						if(this.selectObj[i].subClassId == 4){
							arr4.push(this.selectObj[i])
						}
						if(this.selectObj[i].subClassId == 5){
							arr5.push(this.selectObj[i])
						}
					}
					for(var i in this.dataJson.cates){
						// dataJson.cates[i].iconActive = false;
						if(arr4.length>0){
							for(var j in arr4){
								if(this.dataJson.cates[i].id == arr4[j].subClassId){
									this.dataJson.cates[i].iconActive = true;
								}
							}
						}else{
							if(this.dataJson.cates[i].id == 4){
								this.dataJson.cates[i].iconActive = false;
							}
						}
						if(arr5.length>0){
							for(var j in arr5){
								if(this.dataJson.cates[i].id == arr5[j].subClassId){
									this.dataJson.cates[i].iconActive = true;
								}
							}
						}else{
							if(this.dataJson.cates[i].id == 5){
								this.dataJson.cates[i].iconActive = false;
							}
						}
					}
				this.configDetails = this.MergeArray(this.configDetails,this.selectObj);//个性化／套件添加到已选配置列表
				this.configDetails = this.configDetails.sort(this.compare('id'));//已选配置列表排序
				this.ulWidth = this.configDetails.length * 198 + 'px';
				if(this.configDetails.length * 198 - 80 < 910){
					this.move('0')
				}
				this.selectData = 0;
				for(var i in this.selectArr){
					this.selectData += parseInt(this.selectArr[i])
				}
			},
			compare(prop) {
				return function(object1,object2){
					var value1 = object1[prop];
					var value2 = object2[prop];
					if(value1 < value2){
						return -1;
					}else if(value1 > value2){
						return 1;
					}else{
						return 0;
					}
				}
			},
			unique(arr) {//数组去重
				if (!Array.isArray(arr)) {
				console.log('type error!')
					return
				}
				let res = []
				for (let i = 0; i < arr.length; i++) {
					if (res.indexOf(arr[i]) === -1) {
						res.push(arr[i])
					}
				}
				return res
			},
			MergeArray(arr1,arr2){//数组合并
				var _arr = new Array();
				for(var i=0;i<arr1.length;i++){
				_arr.push(arr1[i]);
				}
				for(var i=0;i<arr2.length;i++){
					var flag = true;
					for(var j=0;j<arr1.length;j++){
						if(arr2[i]==arr1[j]){
							flag=false;
							break;
						}
					}
					if(flag){
						_arr.push(arr2[i]);
					}
				}
				return _arr;
			},
			goK20order(data) {
				this.k20_data1 = [];
				console.log("yi--this.dataJson.default前==",this.dataJson.default);
				var _defaultArr = this.dataJson.default;
				for(var i in this.dataJson.images){
					for(var j in _defaultArr){
						if(_defaultArr[j].subClassId == this.dataJson.images[i].subClassId){
							_defaultArr[j].iconPath = this.dataJson.images[i].path
						}
					}
				}
				_defaultArr = this.MergeArray(_defaultArr,this.selectObj)
				if(data == "look"){
					console.log("_defaultArr===",_defaultArr);
					this.k20_data1 = _defaultArr;
					this.modal1 = true;
				}else{
					this.$cookies.set("config_obj",JSON.stringify(this.unique(_defaultArr)));
					this.$cookies.set("moneyTotal",this.moneyTotal);
					this.$router.push({path: '/k20order'})
				}
			},
			spanTab(item,index){
				if(item.active == false){
					for(var i in this.tabItem){
						if(index == i){
							this.tabItem[i].active = true;
							this.tabItemShow = !this.tabItemShow;
						}else{
							this.tabItem[i].active = false;
						}
					}
				}
			},
			jump(index,e) {
				$(e.target).addClass("active").siblings().removeClass("active")
				let jump = document.getElementsByClassName('section');
				let total = jump[index].offsetTop;
				$('html, body').animate({
					'scrollTop': total
				}, 800);
			},
			getChangeData() {
				pageIndex
					.getChangeData({"materialIds": this.ids,"suit":this.selectIds})
					.then(res => {
						var dataJson = res.date;
						this.priceArr = [];
						this.selectArr= [];
						var suit = res.date.suit;
						for(var l in suit){
							for(var j in dataJson.exclusions){
								if(suit[l] == dataJson.exclusions[j].id){
									this.$Modal.info({
										title: '提示',
										content: "<div>您选择的 <span style='font-weight:700;'>" + this.carColor + "</span> 外观颜色同 <span style='font-weight:700;'>" + dataJson.exclusions[0].frontName + "</span> 选装项不能同时选择，点击确认将自动移除已选择的选装项</div>"
									})
									var index = this.arrRemove(dataJson.exclusions[j].price,this.selectArr); 
									var key = this.arrRemove(dataJson.exclusions[j].id,this.selectIds); //所选个性化ids
									var suit_key = this.arrRemove(suit[l],suit); //所选个性化ids
									var selectObjKey = this.arrObjRemove(dataJson.exclusions[j].id,this.selectObj);//清除已选择的配置
									var configDetailsKey = this.arrObjRemove(dataJson.exclusions[j].id,this.configDetails)//已选配置列表里删除
									if (index > -1) { 
										this.selectArr.splice(index, 1); 
									} 
									if (key > -1) { 
										this.selectIds.splice(key, 1);//所选个性化ids
									} 
									if (suit_key > -1) { 
										suit.splice(suit_key, 1);//所选个性化ids
									} 

									if (selectObjKey > -1) { 
										this.selectObj.splice(selectObjKey, 1);//所选个性化ids
									} 
									if (configDetailsKey > -1) { 
										this.configDetails.splice(configDetailsKey, 1);//已选配置列表里删除
									} 
								}
							}
						}
						for(var i in dataJson.materials){
							dataJson.materials[i].btn_txt = "添加";
							dataJson.materials[i].addEvent = false;
							if(suit.length>0){
								for(var l in suit){
									if(dataJson.materials[i].id == suit[l]){
										dataJson.materials[i].addEvent = true;
										dataJson.materials[i].btn_txt = "移除";
										this.selectArr.push(dataJson.materials[i].price);
									}
									for(var j in dataJson.exclusions){
										if(suit[l] == dataJson.exclusions[j].id){
											dataJson.materials[i].btn_txt = "添加";
											dataJson.materials[i].addEvent = false;
										}
									}
								}
							}
							for(var j in dataJson.exclusions){
								if(dataJson.materials[i].id == dataJson.exclusions[j].id){
									dataJson.materials[i].disabled = true;
								}
							}
							for(var k in dataJson.default){
								if(dataJson.default[k].subClassId == dataJson.materials[i].subClassId && dataJson.default[k].id == dataJson.materials[i].id){
									dataJson.materials[i].active = true;
									this.priceArr.push(dataJson.default[k].price);
									if(this.configDetails.length > 0){//添加到已选配置列表
										for(var i in this.configDetails){
											if(this.configDetails[i].subClassId == dataJson.default[k].subClassId){
												this.configDetails[i] = dataJson.default[k];
											}else{
												this.configDetails.push(dataJson.default[k]);
											}
										}
									}else{
										this.configDetails.push(dataJson.default[k]);
									}
								}
							}
							
						}
						this.configDetails = this.unique(this.configDetails);//已选配置列表去重
						this.configDetails = this.configDetails.sort(this.compare('id'))//已选配置列表排序
						this.ulWidth = this.configDetails.length * 198 + 'px';
						for(var i in dataJson.cates){
							dataJson.cates[i].iconActive = false;
							for(var j in this.configDetails){
								if(dataJson.cates[i].id == this.configDetails[j].subClassId){
									dataJson.cates[i].iconActive = true;
								}
							}
						}
						this.priceData = 0;
						this.selectData = 0;
						for(var i in this.priceArr){
							this.priceData += parseInt(this.priceArr[i])
						}
						for(var i in this.selectArr){
							this.selectData += parseInt(this.selectArr[i])
						}
						this.dataJson = dataJson;
					})
					.catch(err => {
						console.log(err);
					});
			},
			selectFun(val){
				console.log("val===", val);
				if(val.disabled != true){
					if(val.addEvent != true){
						val.btn_txt = "移除"
						this.selectArr.push(val.price);
						this.selectIds.push(val.id);//所选个性化ids
						this.selectObj.push(val)//所选的个性化的val
						this.selectObj = this.unique(this.selectObj)
					}else{
						val.btn_txt = "添加";
						var index = this.arrRemove(val.price,this.selectArr); 
						var key = this.arrRemove(val.id,this.selectIds); //所选个性化ids
						var selectObjKey = this.arrObjRemove(val.id,this.selectObj)
						var defaultKey = this.arrObjRemove(val.id,this.dataJson.default)
						var configDetailsKey = this.arrObjRemove(val.id,this.configDetails)
						if (index > -1) { 
							this.selectArr.splice(index, 1); 
						} 
						if (key > -1) { 
							this.selectIds.splice(key, 1);//所选个性化ids
						} 
						if (selectObjKey > -1) { 
							this.selectObj.splice(selectObjKey, 1);//所选个性化ids
						} 
						if (defaultKey > -1) { 
							this.dataJson.default.splice(defaultKey, 1);//所选个性化ids
						} 
						if (configDetailsKey > -1) { 
							this.configDetails.splice(configDetailsKey, 1);//所选个性化ids
						} 
					}
					var arr4 = [],arr5 = [];
					for(var i in this.selectObj){
						if(this.selectObj[i].subClassId == 4){
							arr4.push(this.selectObj[i])
						}
						if(this.selectObj[i].subClassId == 5){
							arr5.push(this.selectObj[i])
						}
					}
					for(var i in this.dataJson.cates){
						if(arr4.length>0){
							for(var j in arr4){
								if(this.dataJson.cates[i].id == arr4[j].subClassId){
									this.dataJson.cates[i].iconActive = true;
								}
							}
						}else{
							if(this.dataJson.cates[i].id == 4){
								this.dataJson.cates[i].iconActive = false;
							}
						}
						if(arr5.length>0){
							for(var j in arr5){
								if(this.dataJson.cates[i].id == arr5[j].subClassId){
									this.dataJson.cates[i].iconActive = true;
								}
							}
						}else{
							if(this.dataJson.cates[i].id == 5){
								this.dataJson.cates[i].iconActive = false;
							}
						}
					}

					val.addEvent = !val.addEvent;
					this.configDetails = this.MergeArray(this.configDetails,this.selectObj);//个性化／套件添加到已选配置列表
					this.configDetails = this.configDetails.sort(this.compare('id'));//已选配置列表排序
					this.ulWidth = this.configDetails.length * 198 - 80 + 'px';
					this.selectData = 0;
					for(var i in this.selectArr){
						this.selectData += parseInt(this.selectArr[i])
					}
				}
			},
			arrRemove(val,arr) { 
				for (var i = 0; i < arr.length; i++) { 
					if (arr[i] == val) return i; 
				} 
				return -1; 
			},
			arrObjRemove(val,arr) { 
				for (var i = 0; i < arr.length; i++) { 
					if (val == arr[i].id) return i; 
				} 
				return -1; 
			},
			clickFun(val) {
				this.carColor = val.frontName;
				this.ids = [];
				var _default = this.dataJson.default;
				for(var i in _default){
					if(_default[i].subClassId == val.subClassId){
						_default[i].id = val.id;
					}
					this.ids.push(_default[i].id);
				}
				this.getChangeData();
				// this.staticFun();
			},
			handleScroll() {
				// var a = this.$refs.headNav;
				var headNavTop = this.$refs.headNav.offsetTop;
				var mccwRightTop = this.$refs.mccwRight.offsetTop;
				// console.log("a==",a)
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				this.scroll = scrollTop - 70 + "px";
				if(headNavTop-scrollTop < 0) {
					this.headFiexd = true;
				} else{
					this.headFiexd = false;
				}
				if(mccwRightTop-scrollTop < 0) {
					this.srollFiexd = true;
				} else {
					this.srollFiexd = false;
				}
			},
			dataScroll: function () {
				this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
			},
			loadSroll: function () {
				var self = this;
				var $navs = $(".j-configItem");
				var sections = document.getElementsByClassName('section');
				for (var i = sections.length - 1; i >= 0; i--) {
					if (self.scroll >= sections[i].offsetTop - 100) {
						$navs.eq(i).addClass("active").siblings().removeClass("active")
						break;
					}
				}
			},
			staticFun(){//本地数据模拟
				var dataJson = DataJson.date;
				this.priceArr = [];
				var suit = DataJson.date.suit;
				for(var i in dataJson.materials){
					dataJson.materials[i].btn_txt = "添加";
					dataJson.materials[i].addEvent = false;
					if(suit.length>0){	
						for(var l in suit){
							if(dataJson.materials[i].id == suit[l]){
								dataJson.materials[i].addEvent = true;
								dataJson.materials[i].btn_txt = "移除";
								this.selectArr.push(dataJson.materials[i].price);
							}
						}
					}
				}
				for(var i in dataJson.materials){
					for(var j in dataJson.exclusions){
						if(dataJson.materials[i].id == dataJson.exclusions[j].id){
							dataJson.materials[i].disabled = true;
						}
					}
					for(var k in dataJson.default){
						if(dataJson.default[k].subClassId == dataJson.materials[i].subClassId && dataJson.default[k].id == dataJson.materials[i].id){
							dataJson.materials[i].active = true;
							this.priceArr.push(dataJson.default[k].price);
						}
					}
				}
				this.priceData = 0;
				this.selectData = 0;
				for(var i in this.priceArr){
					this.priceData += parseInt(this.priceArr[i])
				}
				for(var i in this.selectArr){
					this.selectData += parseInt(this.selectArr[i])
				}
				this.dataJson = dataJson;
				console.log("dataJson===", dataJson);
			}
		},
		computed: {
			moneyTotal: function () {
				return this.selectData + this.priceData + 686800
			}
		},
		watch: {
			scroll: function () {
				this.loadSroll()
			}
		},
		mounted() {
			window.addEventListener('scroll', this.dataScroll);
			window.addEventListener('scroll', this.handleScroll);
			//  this.dataJson = DataJson.date;
			this.loanMoney = LoanMoney;
			// console.log("LoanMoney===",LoanMoney);
			this.getChangeData();
			// this.staticFun();//本地数据模拟
		},
		destroyed() {
			window.removeEventListener('scroll', this.dataScroll)
			window.removeEventListener('scroll', this.handleScroll)
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@styles/mixins.styl';
	.config_price{
		width: 15%;
		min-width: 200px;
		margin-top: 16px;
    	text-align: center;
		p{
			font-size: 14px;
			span{
				font-weight: 700;
				font-size: 20px;
			}
		}
		.button1 {
			display: block;
			text-align: center;
			width: 20%;
			min-width: 200px;
			line-height: 54px;
			height: 54px;
			font-size: 18px;
			opacity: 0.9;
			margin: 14px auto 20px;
			color: #fff;
			background: #f00;
		}
	}
	
	.width118{
		width: 118px!important;
		img{
			width: 100%!important;
			height: 74px;
		}
		.icon_add{
			width: 18px!important;
		}
	}
	.config_li:last-child{
		.icon_add{
			display:none!important;
		}
	}
	.config_details{
		position: fixed;
		bottom:0;
		width: 100%;
		height:168px;
		border: 1px solid #ccc;
		background: #fff;
		z-index: 999;
		font-size: 20px;
		padding: 20px 10px;
		.config_list{
			width: 75%;
		}
		.icon_move {
			margin: 40px 0;
			cursor: pointer;
		}
		.icon_move:hover {
			opacity: .8;
		}
		.ul_list{
			width: 80%;
			height: 124px;
			overflow:hidden;
			margin: 0 40px;
		}
		.config_li{
			position: relative;
			width: 74px;
			height: auto;
    		text-align: center;
			font-size: 14px;
			margin-right: 80px;
			.front_name{
				margin: 6px 0px 2px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			img{
				width: 74px;
				height: 74px;
			}
			i{
				position: absolute;
				top: 0;
				right: -26px;
				width: 20px;
				height: 20px;
				font-size: 20px;
				// background: url(../../assets/images/close.png) no-repeat;
				background-size: 18px 18px;
				cursor:pointer;
			}
			i:hover{
				opacity: .7;
			}
			.icon_add{
				position: absolute;
				top: 24px;
				right: -50px;
				width: 18px;
				height: 19px;
			}
		}
	}


	.modal_box{
		padding: 20px 30px;
		.modal_item{
			margin-bottom: 20px;
			padding-bottom: 20px;
			border-bottom: 1px solid #ccc;
		}
	}
	.modal_title{
		font-weight: 700;
		font-size: 20px;
		margin-bottom: 10px;
	}
	.modal_info{
		line-height: 30px;
    	font-size: 16px;
		span{
			display:inline-block;
			float:left;
			width: 70%;
		}
		span:last-child{
			width: 30%;
		}
		// border-bottom:1px solid #ccc;
	}
	.g-center {
		position: relative;
		width: 1440px;
		margin: auto;
	}
	.swiper-button-next, .swiper-button-prev {
		width: 44px;
		border-radius: 50%;
		background-image: url(../../assets/images/right.png);
		background-size: inherit;
	}
	.swiper-button-prev {
		background-image: url(../../assets/images/left.png);
	}
	._disabled{
		background: #ddd!important;
    	border: none!important;
	}
	.remove {
		background: #fff!important;
		border: 1px solid #404040!important;
		color: #404040!important;
		transition: background .3s cubic-bezier(.37,.32,.16,.94);
	}
	.hide{
		display: none!important;
	}
	.srollFiexd{
		position: fixed;
		z-index: 50;
		top: 0;
	}
	.ccfg-hdTab {
		height: 64px;
		line-height: 64px;
		background: #fff;
		width: 100%;
		a {
			font-size: 16px;
			color: #242424;
			padding: 20px 10px 0;
			margin: 0 15px;
		}
		.icon_active:before {
			display: inline-block;
			margin-right: 4px;
			content: "";
			width: 18px;
			height: 18px;
			background: url(../../assets/images/icon_active.png) no-repeat;
		}
		.active {
			border-top: 3px solid #de0000;
		}
	}
	
	.mccw-left {
		width: 1070px;
		float: left;
		.y_title {
			letter-spacing: 0;
			// line-height: 96px;
			font-size: 24px;
			background: #f5f5f5;
			padding: 20px 20px;
		}
		.packs-container {
			// padding-top: 50px;
			width: 100%;
			.pack-card {
				width: 100%;
				min-height: 360px;
				background: #fff;
				padding: 20px;
				.pic-wrapper {
					box-sizing: border-box;
					width: 50%;
					padding-left: .83333%;
					padding-right: .83333%;
					padding: 0;
					margin: 0;
					float: left;
					margin-right: 24px;
					img {
						width: 100%;
					}
				}
				.header {
					zoom: 1;
					overflow: hidden;
					position: relative;
					min-height: 50px;
					font-size: 16px;
					.card-title {
						display: block;
						margin-top: 10px;
					}
					.add_btn {
						position: absolute;
						top: 5px;
						right: 10px;
						display: block;
						width: 78px;
						height: 38px;
						line-height: 38px;
						text-align: center;
						font-size: 14px;
						background: #0b2749;
						border: 1px solid #0b2749;
						color: #fff;
					}
				}
				.content {
					font-size: 14px;
					.price {
						padding-bottom: 36px;
						font-weight: 500;
					}
					.features-title {
						letter-spacing: 0;
						font-size: 16px;
						display: block;
						margin-bottom: 12px;
					}
					.features ul li {
						letter-spacing: .02em;
						line-height: 22px;
					}
				}
			}
			.optional-card {
				zoom: 1;
				box-sizing: border-box;
				width: 33.33333%;
				float: left;
				padding-left: .83333%;
				padding-right: .83333%;
				padding: 24px 20px;
				background: #fff;
				img{
					width:100%;
				}
				.header {
					padding-top: 15px;
					width: 100%;
					height: 67.2px;
					font-size: 16px;
					line-height: 1.4em;
					overflow: hidden;
					text-overflow: ellipsis;
					position: relative;
				}
				.content{
					.price {
						font-size: 18px;
    					margin-top: 6px;
					}
					.add_btn{
						background: #0b2749;
						border: 1px solid #0b2749;
						color: #fff;
						width: 78px;
						height: 38px;
						font-size: 16px;
						cursor: pointer;
					}
				}
			}
		}
		.mccw-banner {
			width: 100%;
			//      height: 600px;
			position: relative;
			.bannerImg {
				width: 100%;
				//          height: 600px;
				img {
					width: 100%;
					//              height: 600px;
				}
			}
		}
		.mccw-fd {
			padding: 10px;
			background: #fff;
			margin-bottom: 10px;
			span {
				font-size: 14px;
				padding: 10px;
			}
			li {
				float: left;
				height: 85px;
				position: relative;
				margin: 15px;
				text-align: center;
				transition: all 0.3s ease;
				img {
					width: 48px;
					height: 48px;
					margin: auto;
					border: 1px solid #eee;
				}
				p {
					margin-top: 6px;
					font-size: 14px;
				}
				i {
					position: absolute;
					top: -60px;
					width: 180px;
					height: 48px;
					line-height: 48px;
					z-index: 1;
					left: -55px;
					font-size: 14px;
					background: #fff;
					border: 1px solid #ddd;
					clip: rect(60px 180px 60px 0px);
					&:after {
						content: "";
						display: block;
						width: 20px;
						height: 11px;
						position: absolute;
						top: 45px;
						left: 77px;
						// /*background: url('../../assets/images/carConfig/icon-jt.png');*/
					}
				}
				&:hover {
					i {
						clip: rect(0px 180px 60px 0px);
						transition: all .2s ease;
					}
				}
			}
			.active {
				color: #f00;
				img {
					border: 1px solid #000;
					padding: 2px;
					transform: scale(1.2);
				}
				&:before {
					content: "";
					display: block;
					width: 25px;
					height: 25px;
					position: absolute;
					top: -10px;
					right: -4px;
					z-index: 1;
					background: url("../../assets/images/icon-check.png") no-repeat;
				}
			}
		}
	}
	.mccw-right{
		width: 350px;
		float: left;
		right: 330px;
	//  padding: 16px 0 16px 20px;
		padding-left: 20px;
		color: #878787;
		font-size: 14px;
		top: 0;
		transition: top .3s ease;
		background: #fff;
		&.srollFiexd{
			position: absolute;
			left: 50%;
			margin-left: 352px;
			top: 40px;
			// transition: top 2s ;
		}
		.mccw-gooditem{
			h3{
				font-size: 18px;
				color: #111;
				height: 60px;
				line-height: 60px;
			}
			img{
				width: 100%;
				height: 190px; 
			}
			
			.bd{
				font-size: 12px;
				color: #555;
				line-height: 1.8;
				padding: 15px 0;
				~ .bd{
					border-top: 1px solid #ccc;
				}
				.f-fl{
					width: 50%;
				}
				span{
					font-size: 14px;
					color: #de0000;
				}
			}
			.j-price{
				font-size: 15px;
			}
			.fd{
				padding: 10px 0 15px 0;
				a{
					width: 50%;
					text-align: center;
					font-size: 14px;
					color: #111;
					float: left;
				}
				img{
					width: 20px;
					height: 20px;
					display: inline-block;
					margin-right: 10px;
				}
			}
			.buttons{
				a{
					display: block;
					text-align: center;
					height: 40px;
					line-height: 40px;
					font-size: 14px;
					color: #111;
					opacity: 0.9;
					margin-bottom: 10px;
					&:hover{
						position: relative;
						left: 1px;
						top: 1px;
						box-shadow: 0 0 10px 0 #ccc;
						opacity: 1;
					}
				}
				.button1{
					color: #fff;
					background: #f00;
				}
				.button2{
					color: #242424;
					background: #f0f0f0;
					border: 1px solid #ccc;
				}
			}
		}
	}
	//金融方案
	.finance-hd {
		border: 1px solid #cccccc;
		span {
			display: inline-block;
			width: 164px;
			text-align: center;
			line-height: 52px;
			font-size: 16px;
			cursor: pointer;
			background-color: #f2f2f2;
			&.active {
				border-top: 4px solid #de0000;
				background-color: #fff;
				line-height: 48px;
				color: #000;
				border-right: 1px solid #cccccc;
			}
		}
	}
	.finance-bd {
		border: 1px solid #cccccc;
		border-top: none;
		margin-bottom: 15px;
		color: #282828;
		.f-tac{
			text-align: center;
		}
	}
	.cash-money {
		margin: 0px 10px;
		line-height: 30px;
		border-bottom: 1px solid #dfdfdf;
		text-align: center;
		color: #282828;
		span {

			font-size: 22px;
		}
	}
	.deal-date {
		line-height: 30px;
		font-size: 14px;
		color: #282828;
		text-align: left;
		padding: 10px 0 10px 20px;
	}
	// 贷款方案
	.loan-money {
		color: #282828;
		padding-top: 35px;
		margin-bottom: 15px;
		span {
			font-size: 22px;
		}
	}
	.loan-way {
		font-size: 14px;
		margin-bottom: 8px;
	}

	.loan-tip {
		margin: 0px 10px;
		padding-bottom: 25px;
		border-bottom: 1px solid #dfdfdf;
		margin-bottom: 28px;
	}
	.loan-year-rate1{
		span span i{
			display: inline-block;
			cursor: pointer;
			margin-bottom: 20px;
			&.active{
				color: #de0000;
			}
		}
	}
	.loan-year-rate {
		margin-bottom: 20px;
		label {
			border-right: 1px solid #ccc;
			margin-bottom: 18px;
			display: inline-block;
			span{
				display: inline-block;
				width: 80px;
				cursor: pointer;
				line-height: 14px;
				i{
					display: inline-block;
					width: 80px;
					cursor: pointer;
					text-align: center;
					&.active{
						color: #de0000;
					}
				}
			}
			&:last-child {
				border: none;
			}
		}
		
		.f-ib {
			text-align:left;
			.js-first-pay {
				border: none;
				margin-bottom: 0;
			}
		}
		p {
			margin-top: 12px;
		}
	}
	.loan-month{
		margin:0px 10px;
		border-top: 1px solid #dfdfdf;
		line-height: 58px;
	}
	// .loan-year-rate {
	// 	margin-bottom: 20px;
	// }
	// .loan-year-rate span {
	// 	display: inline-block;
	// 	width: 80px;
	// 	cursor: pointer;
	// 	line-height: 15px;
	// 	border-right: 1px solid #ccc;
	// 	margin-bottom: 18px;
	// }
	// .loan-year-rate .f-ib .js-first-pay {
	// 	border: none;
	// 	margin-bottom: 0;
	// }
</style>