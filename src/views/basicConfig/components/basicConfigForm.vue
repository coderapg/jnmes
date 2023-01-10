<template>
  <div class="basic-config-mode">
    <el-dialog
      width="800px"
      :title="title"
      :visible="dialogVisible"
      append-to-body>
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
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'basicConfigMode',
  data () {
    return {
      title: '编辑',
      dialogVisible: false,
      disabled: false,
      form: {}
    }
  },
  methods: {
    // 编辑
    edit (row) {
      this.$nextTick(() => {
        this.dialogVisible = true
        this.form = Object.assign({}, row)
      })
    }
    // 查看
  }
}
</script>

<style lang="less" scoped></style>
