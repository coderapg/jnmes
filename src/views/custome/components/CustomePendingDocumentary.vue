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
              </el-form-item>
            </el-col>
          </template>
          <el-col :sm="24" :md="8" :lg="7" :xl="6">
            <span class="up-down">
              <el-button size="mini" type="primary" @click="onSubmit">查询</el-button>
              <el-button size="mini" type="primary">重置</el-button>
              <a style="margin-left: 8px;" @click="handleToggleSearch">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <i :class="toggleSearchStatus ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
              </a>
            </span>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- /查询区域 -->
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
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        value1: ''
      }
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
    }
  }
}
</script>

<style lang="less" scoped>
  .custome-pending-documentary {}
</style>
