<template>
  <div class="basic-config">
    <el-card class="box-card">
      <!-- <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div> -->
      <!-- 表格数据 -->
      <el-table
        :data="tableData"
        border
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        style="width: 100%">
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="code" label="配置编号" />
        <el-table-column prop="value" label="配置值" />
        <el-table-column prop="note" label="说明" />
        <el-table-column prop="updateTime" label="更新日期" />
        <el-table-column label="操作" width="110" class-name="operation">
          <template slot-scope="scope">
            <span @click="handleEdit(scope.row)">编辑</span>
            <em>|</em>
            <el-dropdown @command="handleDropDownMenuClick">
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" placement="top-start">
                <el-dropdown-item command="a">详情</el-dropdown-item>
                <el-dropdown-item command="b">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格数据 -->
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :current-page.sync="pageOptions.page"
        :page-size="pageOptions.pageSize"
        @current-change="handleCurrentChange"
        :total="totalCount" />
      <!-- /分页 -->
    </el-card>
  </div>
</template>

<script>
import { basicConfigData } from 'https/basicConfig'

export default {
  name: 'basicConfigIndex',
  data () {
    return {
      url: {
        list: '/basicConfiguration/basicConfiguration/list'
      },
      // 分页参数
      pageOptions: {
        page: 1,
        pageSize: 10
      },
      tableData: [],
      totalCount: 0
    }
  },
  created () {
    this.loadTableData(1)
  },
  methods: {
    // 加载table数据
    loadTableData (page = 1) {
      basicConfigData(this.url.list, this.pageOptions).then(res => {
        const { result: { records, total }, success } = res.data
        if (success) {
          this.tableData = records
          this.totalCount = total
        }
      })
    },
    // 点击分页页码
    handleCurrentChange () {
      this.loadTableData(this.page)
    },
    // 编辑
    handleEdit (row) {
      console.log(row)
    },
    // 下拉
    handleDropDownMenuClick (command) {
      console.log('下拉', command)
    }
  }
}
</script>

<style lang="less" scoped></style>
