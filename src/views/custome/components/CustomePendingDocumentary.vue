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
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      style="width: 100%">
      <el-table-column label="序号" type="index" width="80" />
      <el-table-column prop="companyName" label="客户名称" />
      <el-table-column prop="createTime" label="开始日期" />
      <el-table-column prop="endTime" label="结束日期">
      </el-table-column>
      <el-table-column prop="status" label="客户状态">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '正常' : scope.row.status === 2 ? '作废' : '删除' }}
        </template>
      </el-table-column>
      <el-table-column label="客户等级" width="140">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{ textsList[scope.row.starLevel -1] }}</span>
            <div slot="reference" class="name-wrapper">
              <el-rate v-model="scope.row.starLevel" disabled text-color="#ff9900" />
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="orderName" label="主要负责人">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.orderName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="helperNames" label="协助人员">
        <template slot-scope="scope" v-if="scope.row.helperNames">
          <el-tag size="medium" v-for="(item, index) in helperList(scope.row.helperNames)" :key="index">{{ item }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="详细地址">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{ scope.row.address }}</span>
            <div slot="reference" class="name-wrapper">
              <p>{{ scope.row.address | sliceFilter }}</p>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{ scope.row.remark }}</span>
            <div slot="reference" class="name-wrapper">
              <p>{{ scope.row.remark | sliceFilter }}</p>
            </div>
          </el-popover>
        </template>
      </el-table-column>
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
              <el-dropdown-item command="b">日志</el-dropdown-item>
              <el-dropdown-item command="c">成单</el-dropdown-item>
              <el-dropdown-item command="d">延期</el-dropdown-item>
              <el-dropdown-item command="e">作废</el-dropdown-item>
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
      :current-page.sync="page"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      :total="totalCount" />
    <!-- /分页 -->
  </div>
</template>

<script>
import { JnmesMixin } from 'utils/jsmesMixin'
import { getData } from 'https/jsmesConfig'

export default {
  name: 'CustomePendingDocumentary',
  data () {
    return {
      queryParam: {},
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
      tableData: [],
      textsList: ['一般客户', '良好客户', '优质客户', '大客户', '超级客户'],
      url: {
        list: '/customer/cusCustomer/list'
      },
      // 分页参数
      page: 1,
      pageSize: 10,
      totalCount: 1
    }
  },
  mixins: [JnmesMixin],
  props: {
    curType: {
      type: Number,
      default: 2,
      required: true
    }
  },
  filters: {
    sliceFilter (val) {
      return val && val.length > 0 ? val.slice(0, 6) + '...' : null
    }
  },
  created () {
    this.loadTableData(1)
  },
  methods: {
    // 初始化加载数据
    loadTableData (page = 1) {
      this.page = page
      getData(this.url.list, {
        type: this.curType,
        pageNo: this.page,
        pageSize: this.pageSize
      }).then(res => {
        const { code, result: { records, total }, success } = res.data
        if (code === 200 && success) {
          this.tableData = records
          console.log('打印数据', records)
          this.totalCount = total
        }
      })
    },
    // 点击分页页码
    handleCurrentChange () {
      this.loadTableData(this.page)
    },
    onSubmit () {
      console.log('submit!')
    },
    handleEdit (row) {
      console.log(row)
    },
    // 对协助人员进行切割
    helperList (value) {
      return value.split(',')
    },
    // 下拉
    handleDropDownMenuClick (command) {
      console.log('下拉', command)
    }
  }
}
</script>

<style lang="less" scoped>
  .custome-pending-documentary {}
  /deep/ .operation {
    .cell {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      span {
        color: #409eff;
        i {
          font-size: 12px;
        }
      }
      em {
        font-size: 10px;
        font-style: normal;
        color: #eee;
      }
    }
  }
</style>
