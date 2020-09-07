<template>
  <div class="box">
    <h2 class="tit">驾趣会签到信息</h2>
    <div class="inputs">
      <Input
        class="search-input"
        search
        placeholder="输入活动名称查询"
        @on-search="searchEvent"
        @on-clear="clearEvent"
      />
      <DatePicker
        class="date-picker"
        type="daterange"
        placement="bottom-end"
        placeholder="选择日期"
        @on-change="changeDate"
      ></DatePicker>
      <i-button type="primary" class="export-btn" @click="exportModal = true">导出</i-button>
      <Modal v-model="exportModal" width="360">
        <p slot="header" style="text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>导出确认</span>
        </p>
        <div style="text-align:center">
          <p>确认导出筛选的数据。</p>
        </div>
        <div slot="footer">
          <i-button type="primary" size="large" long :loading="modal_loading" @click="exportData">导出</i-button>
        </div>
      </Modal>
    </div>

    <i-table :columns="columns1" :data="tableData">
      <template slot-scope="{ row }" slot="sex">{{row.sex===1?'男':'女'}}</template>
      <template slot-scope="{ row }" slot="driveType">{{row.driveType===1?'试驾':'试乘'}}</template>
      <template slot-scope="{ row }" slot="drivecard">
        <i-button type="default" @click="seePic(row.drivecard)">查看图片</i-button>
      </template>
      <template slot-scope="{ row }" slot="createTime">{{row.createTime | YMDHms}}</template>
    </i-table>
    <Page
      class="pagination"
      :total="total"
      :page-size="objParams.pageSize"
      :current="objParams.pageNo"
      @on-change="changePage"
    />
    <Modal title="View Image" v-model="visible">
      <img :src="imgSrc" v-show="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
import { formatTime,isIE } from "@/utils/func.js";
import { Table, Page, Button, Modal, Input, DatePicker, Icon } from "iview";
import { PageShowTable } from "./apis.js";
const pageShowTable = new PageShowTable();

export default {
  components: {
    "i-table": Table,
    Page,
    "i-button": Button,
    Modal,
    Input,
    DatePicker,
    Icon
  },
  name: "ShowTable",
  data() {
    return {
      visible: false,
      exportModal: false,
      modal_loading: false,
      imgSrc: null,
      total: 0,
      objParams: {
        pageNo: 1,
        pageSize: 10,
        activityName: null,
        startTime: null,
        endTime: null
      },

      columns1: [
        {
          title: "ID",
          key: "code"
        },
        {
          title: "OPENID",
          key: "openid"
        },
        {
          title: "姓名",
          key: "userName"
        },
        {
          title: "性别",
          slot: "sex"
        },
        {
          title: "手机号",
          key: "mobile"
        },
        {
          title: "身份证号",
          key: "idCardNo"
        },
        {
          title: "驾照",
          slot: "drivecard"
        },
        {
          title: "试乘/试驾",
          slot: "driveType"
        },
        {
          title: "活动名称",
          key: "activityName"
        },
        {
          title: "签到日期",
          slot: "createTime"
        }
      ],
      tableData: []
    };
  },
  methods: {
    seePic(imgSrc) {
      this.visible = true
      this.imgSrc = imgSrc
    },
    searchEvent(val) {
      this.objParams.pageNo = 1
      this.objParams.activityName = val
      this.getDriveList(this.objParams)
    },
    clearEvent() {
      this.objParams.pageNo = 1
      this.objParams.activityName = null
      this.getDriveList(this.objParams)
    },
    changeDate(timeArr) {
      this.objParams.pageNo = 1
      this.objParams.startTime = timeArr[0]
      this.objParams.endTime = timeArr[1]
      this.getDriveList(this.objParams)
    },
    changePage(page) {
      this.objParams.pageNo = page;
      this.getDriveList(this.objParams)
    },
    getDriveList(params) {
      pageShowTable.getDriveList(params).then(res => {
        if (res.code === "0") {
          this.total = res.data.count
          this.tableData = res.data.data || []
        } else {
          this.$weui.alert(res.msg)
        }
      });
    },

    exportData(params) {
      let exportParams = Object.assign({}, this.objParams)
      delete exportParams.pageNo
      delete exportParams.pageSize
      this.modal_loading = true
      pageShowTable
        .getExport(exportParams)
        .then(res => {
          this.modal_loading = false;
          this.exportModal = false;
          let date = new Date();
          let fileName = `驾趣会活动签到表 ${formatTime(
            new Date()
          )}`
          let blob = new Blob([res], { type: "application/vnd.ms-excel" })
          if(isIE()){
            window.navigator.msSaveOrOpenBlob(blob,fileName+'.xls')
          }else{
            let downloadElement = document.createElement("a");
            let href = window.URL.createObjectURL(blob) //创建下载的链接
            downloadElement.href = href
            downloadElement.download = fileName   //下载后文件名
            document.body.appendChild(downloadElement)
            downloadElement.click() //点击下载
            document.body.removeChild(downloadElement) //下载完成移除元素
            window.URL.revokeObjectURL(href) //释放blob对象
          }
          
        })
        .catch(err => {
          this.modal_loading = false
          this.exportModal = false
          console.log(err)
        });
    }
  },
  created() {
    this.getDriveList(this.objParams);
  }
};
</script>

<style lang="stylus" scoped>
.box {
  padding: 30px;
}

.tit {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 15px;
}

.pagination {
  margin-top: 20px;
  text-align: right;
}

.inputs {
  margin-bottom: 15px;
}

.search-input {
  width: 200px;
  background: #fff;
  margin-right: 20px;
}

.date-picker {
  width: 200px;
  background: #fff;
}

.export-btn {
  float: right;
}
</style>