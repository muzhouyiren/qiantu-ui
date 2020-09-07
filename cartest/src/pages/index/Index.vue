<template>
  <div class="box">
    <div>
      <Row :gutter="16">
        <Col span="12" class="left">
          <Form :model="baseItem" :label-width="120">
            <FormItem label="车辆凭证apiid">
              <Input v-model="baseItem.apiid" placeholder="apiid"></Input>
            </FormItem>
            <FormItem label="车辆编号carno">
              <Input v-model="baseItem.carno" placeholder="carno"></Input>
            </FormItem>
          </Form>

          <Card>
            <p slot="title">车机控制</p>
            <Form :model="openDoorForm" class="box-inline">
              <FormItem label="指定车门锁">
                <Select v-model="openDoorForm.doors" clearable>
                  <Option
                    v-for="item in doorsList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem>
                <Button type="success" @click="openDoor">车锁开启</Button>
                <Button type="error" @click="closeDoor">车锁关闭</Button>
              </FormItem>
            </Form>
            <div class="flex-box">
              <Form>
                <FormItem label="寻车">
                  <Button type="success" @click="seekcar">寻车</Button>
                </FormItem>
              </Form>
              <Form>
                <FormItem label="唤醒">
                  <Button type="success" @click="awake">唤醒</Button>
                </FormItem>
              </Form>
            </div>

            <div class="flex-box">
              <Form>
                <FormItem label="车辆闪灯">
                  <Button type="success" @click="flashlight">双闪开启</Button>
                </FormItem>
              </Form>
              <Form>
                <FormItem label="车辆鸣笛">
                  <Button type="success" @click="whistle">鸣笛开启</Button>
                </FormItem>
              </Form>
            </div>

            <Form :model="headlightForm" class="box-inline">
              <FormItem label="近光灯时长(秒)">
                <Input
                  v-model="headlightForm.duration"
                  type="number"
                  placeholder="默认10"
                  clearable
                  style="width:70px;"
                />
              </FormItem>
              <FormItem>
                <Button type="success" @click="openheadlight">近光灯开启</Button>
                <Button type="error" @click="closeheadlight">近光灯关闭</Button>
              </FormItem>
            </Form>
            <Form :model="windowForm" class="box-inline">
              <FormItem label="车窗控制">
                <Select v-model="windowForm.windows" clearable>
                  <Option
                    v-for="item in windowsList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem>
                <Button type="success" @click="risewindow">车窗开启</Button>
                <Button type="error" @click="dropwindow">车窗关闭</Button>
              </FormItem>
            </Form>
            <Form>
                <FormItem label="车辆状态">
                  <Button type="success" @click="carinfo">车辆状态</Button>
                </FormItem>
              </Form>
          </Card>
        </Col>
        <Col span="12">
          <Card>
            <p slot="title">执行结果</p>
            <Form>
              <FormItem>
                <Input
                  v-model="codeRes"
                  type="textarea"
                  :autosize="{minRows:10,maxRows:20}"
                  placeholder="执行结果"
                />
              </FormItem>
            </Form>
          </Card>
        </Col>
      </Row>
      <Card>
        <p slot="title">空调控制</p>
        <div class="air-inline">
          <Form :model="airForm" class="box-inline">
            <FormItem label="空调模式">
              <Select v-model="airForm.mode" clearable>
                <Option
                  v-for="item in airmodeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="温度(℃)">
              <Select v-model="airForm.temperature" clearable>
                <Option v-for="item in 15" :value="item + 15" :key="item + 15">{{ item + 15 }}</Option>
              </Select>
            </FormItem>
            <FormItem label="风量(1最小5最大)">
              <Select v-model="airForm.wind" clearable>
                <Option v-for="item in 5" :value="item" :key="item">{{ item }}</Option>
              </Select>
            </FormItem>
            <FormItem label="预约时间">
              <DatePicker type="datetime" v-model="airForm.startTime " style="width:160px;"></DatePicker>
            </FormItem>
            <FormItem label="预约时长(分钟)">
              <Select v-model="airForm.duration" clearable>
                <Option v-for="item in 30" :value="item" :key="item">{{ item }}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="success" @click="openair">空调开启</Button>
              <Button type="error" @click="closeair">空调关闭</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
      <Card>
        <p slot="title">充电控制</p>
        <div class="air-inline">
          <Form :model="chargeForm" class="box-inline">
            <FormItem label="SOC目标值">
              <Select v-model="chargeForm.tsoc" clearable>
                <Option v-for="item in 100" :value="item" :key="item">{{ item }}</Option>
              </Select>
            </FormItem>
            <FormItem label="预约时间">
              <DatePicker type="datetime" v-model="chargeForm.startTime" style="width:160px;"></DatePicker>
            </FormItem>
            <FormItem>
              <Button type="success" @click="charge">开始充电</Button>
              <Button type="error" @click="uncharge">结束充电</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
      <Card>
        <p slot="title">设置电池热管理任务</p>
        <div class="air-inline">
          <Form :model="batterytemperatureForm" class="box-inline">
            <FormItem label="星期(开，关)">
              <div class="ivu-table ivu-table-default">
                <table border>
                  <thead>
                    <th v-for="item in weekTitle">
                      <div class="ivu-table-cell">{{item}}</div>
                    </th>
                  </thead>
                  <tbody>
                    <tr>
                      <td v-for="item in weekData">
                        <div class="ivu-table-cell">
                          <i-switch v-model="item.flag" size="small" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </FormItem>
            <FormItem label="时间">
              <TimePicker
                format="HH:mm"
                v-model="batterytemperatureForm.startTime"
                style="width:100px;"
              ></TimePicker>
            </FormItem>
            <FormItem label="时长(分钟)">
              <Input
                v-model="batterytemperatureForm.duration"
                type="number"
                clearable
                style="width:70px;"
              />
            </FormItem>
            <FormItem>
              <Button type="success" @click="setBatterytemp">设置</Button>
              <Button type="warning" @click="seeBatterytemp">查询</Button>
              <Button type="error" @click="delBatterytemp">取消</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { PageIndex } from "./apis.js";
let pageIndex = new PageIndex();
export default {
  name: "Index",
  data() {
    return {
      weekTitle: ["一", "二", "三", "四", "五", "六", "日"],
      weekData: [
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        }
      ],
      doorsList: [
        {
          value: 255,
          label: "全部"
        },
        {
          value: 1,
          label: "左前"
        },
        {
          value: 2,
          label: "右前"
        }
      ],
      windowsList: [
        {
          value: 255,
          label: "全部"
        },
        {
          value: 1,
          label: "左前"
        },
        {
          value: 2,
          label: "右前"
        },
        {
          value: 5,
          label: "天窗"
        }
      ],
      airmodeList: [
        {
          value: 1,
          label: "制冷"
        },
        {
          value: 2,
          label: "制热"
        },
        {
          value: 3,
          label: "auto模式"
        },
        {
          value: 4,
          label: "除霜模式"
        }
      ],

      codeRes: null,
      baseItem: {
        apiid: 123333,
        carno: 456666
      },
      openDoorForm: {
        doors: null
      },
      headlightForm: {
        duration: null
      },
      windowForm: {
        windows: null
      },
      airForm: {
        mode: null,
        temperature: null,
        wind: null,
        startTime: null,
        duration: null
      },
      chargeForm: {
        tsoc: null,
        startTime: null
      },
      batterytemperatureForm: {
        week: [],
        startTime: null,
        duration: null
      }
    };
  },
  methods: {
    mixBaseItem: function(obj) {
      return Object.assign({}, this.baseItem, obj);
    },
    openDoor: function() {
      this.openDoorForm.doors = !this.openDoorForm.doors
        ? "255"
        : this.openDoorForm.doors;
      let obj = Object.assign({}, this.baseItem, this.openDoorForm);
      pageIndex.openDoor(obj);
    },
    closeDoor: function() {
      this.openDoorForm.doors = !this.openDoorForm.doors
        ? "255"
        : this.openDoorForm.doors;
      let obj = Object.assign({}, this.baseItem, this.openDoorForm);
      pageIndex.closeDoor(obj);
    },
    seekcar: function() {
      pageIndex.seekcar(this.baseItem); //待完善...
    },
    awake:function(){

    },
    carinfo:function(){

    },
    flashlight: function() {
      pageIndex.flashlight(); //待完善...
    },
    whistle: function() {
      pageIndex.whistle(); //待完善
    },
    openheadlight: function() {
      pageIndex.openheadlight(); //待完善...
    },
    closeheadlight: function() {
      pageIndex.closeheadlight(); //待完善...
    },
    risewindow: function() {
      pageIndex.risewindow();
    },
    dropwindow: function() {
      pageIndex.dropwindow();
    },
    openair: function() {
      if (this.airForm.startTime) {
        this.airForm.startTime = this.$func.formatTime(this.airForm.startTime);
      }
      console.log(this.airForm);
      pageIndex.openair();
    },
    closeair: function() {
      pageIndex.closeair();
    },
    charge: function() {},
    uncharge: function() {},
    setBatterytemp: function() {
      let weekdata = this.weekData
        .map(item => {
          return item.flag ? 1 : 0;
        })
        .join(",");
      this.batterytemperatureForm.week = weekdata;
      console.log(this.batterytemperatureForm);
    },
    seeBatterytemp: function() {},
    delBatterytemp: function() {}
  },
  created() {}
};
</script>


<style lang="stylus" scoped>
@import '~@styles/mixins.styl';

.box {
  padding: 20px;
}

.showres {
  position: absolute;
  top: 20px;
  right: 20px;
  left: 50%;
}

>>> .box-inline .ivu-form-item {
  display: inline-block;
  margin-right: 20px;
}

>>> .box-inline .ivu-form-item-content {
  display: inline-block;
}

>>> .ivu-form-item-label {
  width: 120px;
}

>>> .air-inline .ivu-form-item-label {
  width: auto;
}

>>> .ivu-card {
  margin-bottom: 20px;
}

>>> .ivu-table-cell {
  padding: 0 10px;
}

table {
  border-width: 0;
  border-color: #dcdee2;
}

.flex-box {
  display: flex;

  // form:first-child{
  // margin-right:30px;
  // }
  >>> .ivu-form-item-label {
    display: inline-block;
    float: none;
  }

  >>> .ivu-form-item-content {
    display: inline-block;
  }
}
</style>