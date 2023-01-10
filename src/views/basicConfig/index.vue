<template>
  <div class="basic-config">
    <el-card class="box-card">
      <!-- 操作区域 -->
      <div class="table-operator">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="handleAdd">新增</el-button>
      </div>
      <!-- /操作区域 -->
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
            <el-dropdown @command="handleDropDownMenuClick($event, scope.row)">
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" placement="top-start">
                <el-dropdown-item command="a">详情</el-dropdown-item>
                <el-dropdown-item command="b">
                  <el-popconfirm title="确定删除吗?" @confirm="handleSureDelete(scope.row)">
                    <template slot="reference">
                      <a>删除</a>
                    </template>
                  </el-popconfirm>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!-- /表格数据 -->
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
    <basic-config-form ref="modelForm" @handleEditChange="handleEditChange" />
  </div>
</template>

<script>
import { basicConfigData, deleteConfig } from 'https/basicConfig'

import basicConfigForm from './components/basicConfigForm'

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
  components: {
    basicConfigForm
  },
  created () {
    this.loadTableData(1)
  },
  methods: {
    // 加载table数据
    loadTableData (page = 1) {
      this.pageOptions.page = page
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
      this.loadTableData(this.pageOptions.page)
    },
    // 新增
    handleAdd () {
      this.$refs.modelForm.title = '新增'
      this.$refs.modelForm.formDisabled = false
      this.$refs.modelForm.itemDisabled = false
      this.$refs.modelForm.add()
    },
    // 编辑
    handleEdit (row) {
      this.$refs.modelForm.title = '编辑'
      this.$refs.modelForm.formDisabled = false
      this.$refs.modelForm.itemDisabled = true
      this.$refs.modelForm.edit(row)
    },
    // 子组件中编辑完成后发送过来的事件
    handleEditChange () {
      this.loadTableData(1)
    },
    // 下拉
    handleDropDownMenuClick (command, row) {
      switch (command) {
        case 'a':
          this.handleDetail(row)
          break
        case 'b':
          this.handleDelete(row)
          break
      }
    },
    // 查看详情
    handleDetail (row) {
      this.$refs.modelForm.title = '详情'
      this.$refs.modelForm.formDisabled = true
      this.$refs.modelForm.itemDisabled = true
      this.$refs.modelForm.edit(row)
    },
    // 删除
    handleDelete (row) {
      // console.log('删除', row)
    },
    // 气泡确认删除
    handleSureDelete (row) {
      deleteConfig({ id: row.id }).then(res => {
        const { message, success } = res.data
        if (success) {
          this.$message({
            message,
            type: 'success'
          })
          // 删除完成后，还是加载当前页码的数据
          this.loadTableData(this.pageOptions.page)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .table-operator {
    margin: 20px 0;
  }
</style>
