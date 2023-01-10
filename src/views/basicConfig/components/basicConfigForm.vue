<template>
  <div class="basic-config-mode">
    <el-dialog
      width="800px"
      :title="title"
      :visible="dialogVisible"
      :fullscreen="toggleChange"
      append-to-body
      :before-close="handleClosed">
      <template slot="title">
        <div class="title-content">
          <span>{{ title }}</span>
          <i class="iconfont" :class="toggleChange ? 'icon-shouqi' : 'icon-zhankai3'" @click="handleToggle"></i>
        </div>
      </template>
      <!-- 表单区域 -->
      <el-form ref="form" :model="form" label-width="80px" :disabled="disabled">
        <el-form-item label="配置编号">
          <el-input v-model="form.code" disabled />
        </el-form-item>
        <el-form-item label="配置值">
          <el-input v-model="form.value" />
        </el-form-item>
        <el-form-item label="说明">
          <el-input type="textarea" v-model="form.note" disabled />
        </el-form-item>
      </el-form>
      <!-- /表单区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { editConfig } from 'https/basicConfig'

export default {
  name: 'basicConfigForm',
  data () {
    return {
      title: '编辑',
      dialogVisible: false,
      disabled: false,
      form: {},
      toggleChange: false,
      url: {
        add: '/report/businessReport/add',
        edit: '/basicConfiguration/basicConfiguration/edit'
      }
    }
  },
  methods: {
    // 编辑
    edit (row) {
      this.$nextTick(() => {
        this.dialogVisible = true
        this.form = Object.assign({}, row)
      })
    },
    // 点击x号 / esc - 关闭dialog对话框
    handleClosed () {
      this.dialogVisible = false
    },
    // 展开 / 收起
    handleToggle () {
      this.toggleChange = !this.toggleChange
    },
    // 提交
    submitForm () {
      if (this.form.id) {
        // 编辑
        editConfig(this.form).then(res => {
          const { message, success } = res.data
          if (success) {
            this.$message({
              message,
              type: 'success'
            })
            this.dialogVisible = false
            // 子组件调用父组件中的方法
            // this.$parent.loadTableData(1)
            this.$emit('handleEditChange')
          } else {
            this.$message({
              message,
              type: 'error'
            })
          }
        })
      } else {
        // 新增
      }
    }
    // 查看
  }
}
</script>

<style lang="less" scoped>
  /deep/ .el-dialog {
    .el-dialog__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title-content {
        width: 96%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 24px;
        .iconfont {
          color: #909399;
          font-size: 16px;
        }
      }
      .el-dialog__headerbtn {
        line-height: 24px;
      }
    }
  }
</style>
