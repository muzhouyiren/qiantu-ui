<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <el-row>
        <el-col>
          <div class="filter-container" v-show="searchFilterVisible">
            <el-form :inline="true" :model="searchForm" ref="searchForm">
              <el-form-item label="名称" prop="name">
                <el-input class="filter-item input-normal" size="small" v-model="searchForm.userName"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="mobile">
                <el-input class="filter-item input-normal" size="small" v-model="searchForm.mobile"></el-input>
              </el-form-item>
              <el-form-item label="创建时间" prop="createTime">
                  <el-date-picker 
                    v-model="searchForm.createTime"  
                    format="yyyy-MM-dd HH:mm:ss" 
                    value-format="yyyy-MM-dd HH:mm:ss" 
                    clearable 
                    :picker-options="startDatePicker" 
                    type="datetime"  
                    placeholder="请选择开始日期"
                    style="width: 46%!important;">
                  </el-date-picker>
                  至
                  <el-date-picker 
                    v-model="searchForm.createEndTime"  
                    format="yyyy-MM-dd HH:mm:ss" 
                    value-format="yyyy-MM-dd HH:mm:ss" 
                    clearable 
                    :picker-options="endDatePicker"  
                    type="datetime"  
                    placeholder="请选择结束日期"
                    style="width: 46%!important;">
                    </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button @click="handleFilter" icon="el-icon-search" size="small" type="primary">查询</el-button>
                <el-button @click="searchReset" icon="icon-rest" size="small">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 表格功能列 -->
          <div class="table-menu">
            <div class="table-menu-left">
              <el-button @click="handleExport" icon="icon-export" size="mini" type="primary">导出
              </el-button>
            </div>
            <div class="table-menu-right">
              <el-button @click="searchFilterVisible= !searchFilterVisible" circle icon="el-icon-search"
                         size="mini"></el-button>
            </div>
          </div>
          <el-table :data="list" :key='tableKey' @sort-change="sortChange" element-loading-text="加载中..."
                    fit highlight-current-row v-loading="listLoading">
            <el-table-column
              fixed="left" type="index" width="80">
            </el-table-column>
            <el-table-column align="center" label="姓名">
              <template slot-scope="scope">
                <span>{{scope.row.userName}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="电话">
              <template slot-scope="scope">
                <span>{{scope.row.mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="性别">
              <template slot-scope="scope">
                <span :type="scope.row.gender | genderFilter">{{scope.row.gender | formatStata}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="省份">
              <template slot-scope="scope">
                <span>{{scope.row.province}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="城市">
              <template slot-scope="scope">
                <span>{{scope.row.city}}</span>
              </template>
            </el-table-column>
             <el-table-column align="center" label="创建时间">
              <template slot-scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>
            
          </el-table>
          <div class="pagination-container" v-show="!listLoading">
            <el-pagination :current-page.sync="listQuery.current" :page-size="listQuery.size"
                           :page-sizes="[10,20,30, 50]"
                           :total="total" @current-change="handleCurrentChange"
                           @size-change="handleSizeChange" background
                           class="pull-right" layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
    import cusService from "./cus-service";
    import util from "@/util/util";
    import validate from "@/util/validate";
    import {baseUrl} from "../../../config/env";

    export default {
        name: 'Role',
        data() {
            return {
                searchFilterVisible: true,//搜索图标
                list: null,
                total: null,
                listLoading: true,
                searchForm: {},
                listQuery: {
                    current: 1,
                    size: 20
                },
                tableKey: 0,
                startDatePicker: this.beginDate(), //创建开始时间
                endDatePicker: this.processDate(),//创建结束时间
            }
        },
        watch: {},
        created() {
            this.getList();
            console.log("util---",util);
        },
        filters: {
          genderFilter(status) {// el-tag类型转换
            const statusMap = {
              '0': '0',
              '1': '1',
            }
            return statusMap[status]
          },
          formatStata(status) { // 状态显示转换
            const statusMap = {
              '1': '先生',
              '0': '女士',
            }
            return statusMap[status]
          }
        },
        methods: {
            getList() {
                this.listLoading = true;
                this.listQuery.queryConditionJson = util.parseJsonItemForm([{
                    fieldName: 'userName', value: this.searchForm.userName,},{
                    fieldName: 'mobile', value: this.searchForm.mobile,},{
                    fieldName: 'create_time', value: this.searchForm.createTime, operate: 'between', attrType: 'String',endValue: this.searchForm.createEndTime
                }]);
                cusService.page(this.listQuery).then(response => {
                    this.list = response.data.records;
                    this.total = response.data.total;
                    this.listLoading = false;
                });
            },
            beginDate(){
              const self = this
              return {
                disabledDate(time){
                  if (self.searchForm.createEndTime) {  //如果结束时间不为空，则小于结束时间
                    return new Date(self.searchForm.createEndTime).getTime() < time.getTime()
                  } else {
                    // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
                  }
                }
              }
            },
            processDate() {
              const  self = this
              return {
                disabledDate(time) {
                  if (self.searchForm.createTime) {  //如果开始时间不为空，则结束时间大于开始时间
                    return new Date(self.searchForm.createTime).getTime() > time.getTime()
                  } else {
                    return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
                  }
                }
              }
            },
            sortChange(column) {
                if (column.order == "ascending") {
                    this.listQuery.ascs = column.prop;
                    this.listQuery.descs = undefined;
                } else {
                    this.listQuery.descs = column.prop;
                    this.listQuery.ascs = undefined;
                }
                this.getList()
            },

            //搜索清空
            searchReset() {
                this.$refs['searchForm'].resetFields();
            },
            handleFilter() {
                this.listQuery.current = 1;
                this.getList();
            },
            handleSizeChange(val) {//分页
                this.listQuery.size = val;
                this.getList();
            },
            handleCurrentChange(val) {//分页当前页
                this.listQuery.current = val;
                this.getList();
            },
            handleExport() {//导出
                cusService.export(this.listQuery).then(response => {
                    window.location.href = `${window.location.origin}` + baseUrl + "/file/download?fileName=" + encodeURI(response.data) + "&delete=" + true;
                });
            }
        }
    }
</script>

