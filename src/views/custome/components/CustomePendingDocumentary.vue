<template>
  <div class="custome-pending-documentary">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <el-form ref="form" :model="queryParam" label-width="80px" size="mini">
        <el-row :gutter="24">
          <el-col :sm="24" :md="8" :lg="7" :xl="6">
            <el-form-item label="客户名称">
              <el-input v-model="queryParam.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :lg="7" :xl="6">
            <el-form-item label="项目名称">
              <el-input v-model="queryParam.name"></el-input>
            </el-form-item>
          </el-col>
          <template v-if="toggleSearchStatus">
            <el-col :sm="24" :md="8" :lg="7" :xl="6">
              <el-form-item label="活动时间">
                <el-date-picker
                  v-model="queryParam.value1"
                  type="datetimerange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="8" :lg="7" :xl="6">
              <el-form-item label="客户状态">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </template>
          <el-col :sm="24" :md="8" :lg="7" :xl="6">
            <span class="table-page-search-submitButtons">
              <el-button size="mini" type="primary" @click="onSubmit">查询</el-button>
              <el-button size="mini" plain>重置</el-button>
              <a @click="handleToggleSearch">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <i :class="toggleSearchStatus ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
              </a>
            </span>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- /查询区域 -->
    <!-- 表格数据 -->
    <el-table
      stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        width="100">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格数据 -->
  </div>
</template>

<script>
import { JnmesMixin } from 'utils/jsmesMixin'

export default {
  name: '',
  data () {
    return {
      queryParam: {
        name: '',
        value1: ''
      },
      selectOptions: [
        {
          value: 1,
          label: '正常'
        },
        {
          value: 2,
          label: '作废'
        }
      ],
      value: null,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  mixins: [JnmesMixin],
  props: {
    currentType: {
      type: Number,
      default: 2,
      required: true
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style lang="less" scoped>
  .custome-pending-documentary {}
</style>
