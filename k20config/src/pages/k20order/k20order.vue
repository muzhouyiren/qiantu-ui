<template>
  <div>
    <Header></Header>
    <div class="order-container">
      <h2 class="order-tit">订单确认</h2>
      <div class="clearfix">
      <!-- <Row :gutter="16"> -->
        <!-- <Col span="12"> -->
          <div class="img-info fl" style="width: 49%;">
            <Carousel v-model="img_carousel_value1" loop>
              <CarouselItem v-for="(item,index) in k20_data1" :key="index">
                <div class="img-carousel">
                  <img :src="item.iconPath" alt />
                </div>
              </CarouselItem>
            </Carousel>
            <div class="img-info-tip">
              <p>总价 ￥{{total}}</p>
              <Button type="error" @click="goIndex()">重新配置</Button>
            </div>
          </div>
        <!-- </Col> -->
        <!-- <Col span="12"> -->
          <div class="fr" style="width: 50%;height: 334px;overflow: auto;border-bottom: 1px solid #e8eaec;">
            <Table :columns="k20_columns1" :data="k20_data1">
              <template slot-scope="{ row, index }" slot="frontName">
                <p class="table-info-column" v-if="row.subClassId == 1">外观颜色</p>
                <p class="table-info-column" v-if="row.subClassId == 2">轮辋颜色</p>
                <p class="table-info-column" v-if="row.subClassId == 3">内饰</p>
                <p class="table-info-column" v-if="row.subClassId == 4">个性化</p>
                <p class="table-info-column" v-if="row.subClassId == 5">套件</p>
                <p :class="[index ==3?'table-info-column':'']">{{row.frontName}}</p>
              </template>
            </Table>
          </div>
        <!-- </Col> -->
      <!-- </Row> -->
      </div>
      <Form :label-width="100">
        <div class="address-info">
          <h6 class="u-tit">地址</h6>
          <Row :gutter="80">
            <Col span="12">
              <FormItem label="省市区">
                <Cascader :data="address_data" v-model="address_value"></Cascader>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="详细地址">
                <Input placeholder="详细地址"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="邮政编码">
                <Input placeholder="邮政编码"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="提车店">
                <Select>
                  <Option value>前途驿上海吴中路店</Option>
                  <Option value>前途驿上海新天地店</Option>
                  <Option value>前途驿北京三里屯店</Option>
                  <Option value>前途驿北京金港店</Option>
                  <Option value>前途驿广州广州大道店</Option>
                  <Option value>前途驿广州珠江新城店</Option>
                  <Option value>前途驿成都晶融汇店</Option>
                  <Option value>前途驿成都晶融汇店</Option>
                  <Option value>前途驿苏州凯马广场店</Option>
                  <Option value>前途驿苏州科技城店</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <p class="address-text-style">请填写正确的联系地址并选择提车地点，我们会根据您提供的信息安排车辆交付和充电桩安装。</p>
        </div>
        <div class="buyer-info">
          <h6 class="u-tit">购车人信息</h6>
          <Row :gutter="80">
            <Col span="12">
              <FormItem label="姓名">
                <Input placeholder="姓名"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="称谓">
                <RadioGroup v-model="gender">
                  <Radio label="male">男士</Radio>
                  <Radio label="female">女士</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="身份证号码">
                <Input placeholder="身份证号码"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="图片验证码">
                <Input placeholder="图片验证码"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="手机号码">
                <Input placeholder="手机号码"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="手机验证码">
                <Input placeholder="手机验证码"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="上牌省份">
                <Select>
                  <Option value>北京</Option>
                  <Option value>上海</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <p class="address-text-style">*温馨提示：首次使用手机号+短信验证码登录时，我们将默认您已同意《网络服务条款》，并为您注册本站账号。</p>
        </div>
        <div class="invoice-info">
          <h6 class="u-tit">发票信息</h6>
          <RadioGroup v-model="invoice_type" class="invoice-type">
            <Radio label="person">个人</Radio>
            <Radio label="ent">公司</Radio>
          </RadioGroup>
          <Row :gutter="80" v-show="invoice_type== 'ent'">
            <Col span="12">
              <FormItem label="公司名称">
                <Input placeholder="公司名称"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="税号">
                <Input placeholder="税号"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="开户银行">
                <Input placeholder="开户银行"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="开户银行账号">
                <Input placeholder="开户银行账号"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="注册地址">
                <Input placeholder="注册地址"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="注册电话">
                <Input placeholder="注册电话"></Input>
              </FormItem>
            </Col>
          </Row>
        </div>
        <div class="pay-info">
          <h6 class="u-tit">支付信息</h6>
          <div class="pay-tip">
            您选的车辆总价为
            <span>￥{{total}}</span>&nbsp;&nbsp;&nbsp;&nbsp;提交订单后您需要支付第一笔付款定金
            <span>￥10000</span> 。
          </div>
          <div>
            <FormItem label="付款方式">
              <Radio v-model="pay_type">全款</Radio>
            </FormItem>
          </div>
        </div>
        <div class="price-info">
          <h6 class="u-tit">款项信息</h6>
          <div>
            <FormItem label="定金金额">
              <p>￥10000</p>
            </FormItem>
          </div>
        </div>
        <div class="submit-info">
          <Button type="primary" @click="modal1 = true">提交订单</Button>
        </div>
      </Form>
    </div>
    <Footer></Footer>
    <Modal
        v-model="modal1"
        title="车辆预定通用条款与条件"
        @on-ok="ok"
        >
        <div v-html="protocol_data"></div>
    </Modal>
  </div>
</template>

<script>
import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
const protocolData = require("@json/protocol.json");
export default {
  name: "K20order",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      total: 0,
      protocol_data:'',
      modal1:false,
      gender: "male",
      invoice_type: "ent",
      pay_type: true,
      img_carousel_value1: 0,
      k20_columns1: [
        {
          title: "说明",
          slot: "frontName",
          key: "frontName"
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
      address_value: [],
      address_data: [
        {
          value: "beijing",
          label: "北京市",
          children: [
            {
              value: "beijing",
              label: "北京市",
              children: [
                {
                  value: "dongcheng",
                  label: "东城区"
                },
                {
                  value: "xicheng",
                  label: "西城区"
                }
              ]
            }
          ]
        },
        {
          value: "shanghai",
          label: "上海市",
          children: [
            {
              value: "shanghai",
              label: "上海市",
              children: [
                {
                  value: "dongcheng",
                  label: "静安区"
                },
                {
                  value: "xicheng",
                  label: "长宁区"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    goIndex(){
      this.$router.push({path:"/"})
    },
    ok() {
      this.$router.push({path:"/payment"})
    }
  },
  created () {
      this.total = this.$cookies.get("moneyTotal"); 
      this.protocol_data = protocolData.data
      var config_obj = this.$cookies.get("config_obj");
      console.log("config_obj===",config_obj);
      this.k20_data1 = JSON.parse(config_obj);
      console.log("this.k20_data1 ===",this.k20_data1);
    }
};
</script>

<style lang="stylus" scoped>
.order-container {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
}

.order-tit {
  color: #232323;
  font-size: 32px;
  margin: 30px 0;
}

.img-carousel {
  img {
    width: 100%;
  }
}

>>> .ivu-carousel-dots li button {
  background: red;
}

>>> .ivu-table-overflowX {
  overflow-x: hidden;
}

.img-info-tip {
  text-align: center;

  p {
    margin: 20px 0;
  }
}

>>> .ivu-table .table-info-cell-price {
  color: #dd1d1d;
}

>>> .ivu-table .table-info-column {
  font-weight: bold;
}

>>> .ivu-form .ivu-form-item-label {
  text-align: left;
}

>>> .ivu-table td {
  height: 60px;
}

.u-tit {
  font-size: 18px;
  padding: 10px 20px;
  margin: 45px 0 35px;
  border-bottom: 1px solid #eee;
}

.address-text-style {
  color: #898989;
  margin: 20px 0 5px 0px;
}

>>> .ivu-input {
  height: 40px;
}

>>> .ivu-select-single .ivu-select-selection {
  height: 40px;
}

>>> .ivu-select-single .ivu-select-selection .ivu-select-placeholder, >>> .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  height: 40px;
  line-height: 40px;
}

>>> .ivu-form-item {
  margin-bottom: 30px;
}

>>> .ivu-form .ivu-form-item-label {
  padding-top: 14px;
  padding-bottom: 14px;
}

.invoice-type {
  margin-bottom: 35px;
}

.pay-tip {
  font-size: 18px;
  margin-bottom: 30px;

  span {
    color: red;
  }
}

>>> .ivu-form-item-content {
  line-height: 36px;
}

.price-info {
  p {
    font-size: 18px;
    color: red;
  }
}

.submit-info {
  text-align: center;
  margin: 30px 0 100px;

  button {
    width: 260px;
    height: 45px;
    font-size: 16px;
    color: #fefefe;
    background: #dd1d1d;
    border-color: transparent;
  }
}
</style>