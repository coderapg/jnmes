<template>
  <div class="custome-container">
    <el-card>
      <el-tabs class="custome-card" v-model="currentType">
        <el-tab-pane label="待分配" name="2" v-if="typeIndex === CustomerTypeEnum.Pending.toString()">
          <custome-pending-documentary :cur-type="CustomerTypeEnum.Pending" />
        </el-tab-pane>
        <el-tab-pane label="跟单" name="3">
          <custome-pending-documentary :cur-type="CustomerTypeEnum.Documentary" />
        </el-tab-pane>
        <el-tab-pane label="成单" name="1">1</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { CustomerTypeEnum } from 'utils/constant'
import { userInfoAndDepartsMixin } from 'utils/mixin'

import CustomePendingDocumentary from './components/CustomePendingDocumentary.vue'

export default {
  name: 'CustomeIndex',
  mixins: [userInfoAndDepartsMixin],
  data () {
    return {
      CustomerTypeEnum
      // currentType: '2' // 当前选中的tabs的索引
    }
  },
  components: {
    CustomePendingDocumentary
  },
  computed: {
    typeIndex () {
      const { post } = this.userInfo
      return post.indexOf('admin') !== -1 ? CustomerTypeEnum.Pending.toString() : CustomerTypeEnum.Documentary.toString()
    },
    // 当前选中的tabs的索引
    currentType: {
      get () {
        const { post } = this.userInfo
        return post.indexOf('admin') !== -1 ? '2' : '3'
      },
      set () {
        return ''
      }
    }
  },
  methods: {}
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
