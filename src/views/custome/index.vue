<template>
  <div class="custome-container">
    <el-card class="box-card">
      <el-tabs v-model="typeIndex" @tab-click="handleClick">
        <el-tab-pane label="待分配" name="2" v-if="typeIndex === '2'">2</el-tab-pane>
        <el-tab-pane label="跟单" name="3">3</el-tab-pane>
        <el-tab-pane label="成单" name="1">1</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { userInfoAndDepartsMixin } from 'utils/mixin'

export default {
  name: 'CustomeIndex',
  mixins: [userInfoAndDepartsMixin],
  data () {
    return {
      activeName: '2'
    }
  },
  computed: {
    typeIndex () {
      const { post } = this.userInfo
      const user = post.indexOf('admin') !== -1 ? '2' : '3'
      console.log('闪现', user)
      return user
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
  }
</style>
