<template>
  <div class="custome-container">
    <el-card>
      <el-tabs class="custome-card" v-model="typeIndex" @tab-click="handleClick">
        <el-tab-pane label="待分配" name="2" v-if="typeIndex === CustomerTypeEnum.Pending.toString()">2</el-tab-pane>
        <el-tab-pane label="跟单" name="3">3</el-tab-pane>
        <el-tab-pane label="成单" name="1">1</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { CustomerTypeEnum } from 'utils/constant'
import { userInfoAndDepartsMixin } from 'utils/mixin'

export default {
  name: 'CustomeIndex',
  mixins: [userInfoAndDepartsMixin],
  data () {
    return {
      CustomerTypeEnum,
      activeName: CustomerTypeEnum.Pending.toString()
    }
  },
  computed: {
    typeIndex () {
      const { post } = this.userInfo
      return post.indexOf('admin') !== -1 ? CustomerTypeEnum.Pending.toString() : CustomerTypeEnum.Documentary.toString()
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="less" scoped>
  .custome-container {
    background-color: #fff;
    .custome-card {
      /deep/ .el-tabs__nav-wrap::after {
        background-color: transparent;
      }
    }
  }
</style>
