<template>
    <div class="box">
        <h2>我的活动</h2>
        <div class="tab-tit">
            <span v-for='(tab,index) in tabs' :class="{cur:iscur==index}" @click="changeTab(index)" :key="index">{{tab.name}}</span>
        </div>
        <div class="tab-con">
            <div class="tab" v-if='iscur==0'>
                <table>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th style="width:40%;">活动名称</th>
                            <th>活动时间</th>
                            <th>活动状态</th>
                        </tr>
                    </thead>
                    <tbody v-if="join.length != 0">
                        <tr :class="{finish:item.status==2}" v-for="(item,index) of join" :key="item.id">
                            <td>{{index+1}}</td>
                            <td>{{item.activityName}}</td>
                            <td>{{item.endTime|Y.M.D}}</td>
                            <td>{{item.status|formatStatus}}</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="4">亲，您还没有参加的活动~</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="tab" v-else>
                <table>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th style="width:40%;">试驾名称</th>
                            <th>签到时间</th>
                            <th>试驾状态</th>
                        </tr>
                    </thead>
                    <tbody v-if="testDrive.length != 0">
                        <tr :class="{finish:item.signTime}" v-for="(item,index) of testDrive" :key="item.id">
                            <td>{{index+1}}</td>
                            <td>{{item.activityName}}</td>
                            <td v-if="item.signTime">{{item.signTime|Y.M.D}}</td>
                            <td v-else></td>
                            <td>{{item.signTime?'已完成':'待体验'}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import weui from "weui.js";
import { getActivityByOpenid } from "./apis.js";
export default {
  name: "MyActivity",
  data() {
    return {
      iscur: 0,
      tabs: [{ name: "我的活动" }, { name: "我的试驾" }],
      join: [],
      testDrive:[]
    };
  },
  filters: {
    formatStatus: num => {
      switch (num) {
        case 0:
          return "待进行";
          break;
        case 1:
          return "进行中";
          break;
        case 2:
          return "已完成";
          break;
      }
    },
  },
  methods: {
    async getActivityByOpenid(params) {
      try {
        let { data } = await getActivityByOpenid(params);
        if (data.success) {
          this.join = data.data.join;
          this.testDrive = data.data.testDrive;
        } else {
          weui.alert(data.msg);
        }
      } catch (error) {}
    },
    changeTab(index) {
      this.iscur = index;
    }
  },
  created() {
    let openid = localStorage.getItem("openId") || this.$cookies.get("openId");
    this.getActivityByOpenid({ openid: openid });
  }
};
</script>
<style lang="stylus" scoped>
@import '~@styles/varibles.styl';

.box {
    padding: 30px;
}

h2 {
    font-size: 18px;
    color: #282828;
    text-align: center;
    padding: 20px;
    font-weight: bold;
}

.tab-con {
    margin-top: 10px;
}

table {
    width: 100%;
}

td, th {
    border: 1px solid #b3b3b3;
    padding: 4px;
    text-align: center;
}

thead tr {
    background: #3a3838;
    color: #c1c5c9;
}

tbody tr.finish {
    background: rgba(#ababab, 0.3);
    color: #757575;
}

.tab-tit {
    font-size: 0;

    span {
        display: inline-block;
        width: 75px;
        height: 32px;
        line-height: 32px;
        color: #fff;
        font-size: 13px;
        text-align: center;
        color: $color;
        border: 1px solid $color;

        &.cur {
            background: $color;
            color: #fff;
        }
    }

    span:first-child {
        border-radius: 5px 0 0 5px;
        margin-right: 1px;
    }

    span:last-child {
        border-radius: 0 5px 5px 0;
    }
}
</style>

