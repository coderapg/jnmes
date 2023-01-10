<template>
  <div class="profile-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row :gutter="10">
        <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
          <el-form ref="form" :model="user" :rules="rules" label-width="80px">
            <el-row :gutter="10">
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <el-form-item label="真实姓名" prop="realname">
                  <el-input v-model="user.realname" />
                </el-form-item>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <el-form-item label="手机号码" prop="phone">
                  <el-input v-model="user.phone" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="user.email" />
                </el-form-item>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <el-form-item label="生日">
                  <el-date-picker type="date" placeholder="选择日期" v-model="user.birthday" style="width: 100%;" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <el-form-item label="职务">
                  <el-input v-model="user.post" disabled />
                </el-form-item>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <el-form-item label="性别">
                  <el-radio-group v-model="user.sex" disabled>
                    <el-radio :label="1" v-if="user.sex === 1">男</el-radio>
                    <el-radio :label="2" v-else>女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <el-form-item label="状态">
                  <el-select v-model="user.status" placeholder="请选择" disabled width="100%">
                    <el-option
                      v-for="item in statusList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <el-form-item label="归属部门">
                  <el-select v-model="user.org" multiple placeholder="请选择" disabled>
                    <el-option
                      v-for="item in user.orgList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="avatar-wrap">
          <label for="file">
            <img
              style="width: 200px; height: 200px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c2594117123jpeg.jpeg" />
              <p>修改头像</p>
            <input ref="file" type="file" id="file" hidden @change="handleAvatarChange">
          </label>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      append-to-body
      width="30%"
      @opened="handleDialogOpened">
      <div class="preview-wrap">
        <img ref="proviewImg" :src="proviewImg" alt="">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleUploadPhoto">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userInfoAndDepartsMixin } from 'utils/mixin'

import { updateAlbum } from 'https/user'

// 引入cropper
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'ProfileIndex',
  mixins: [userInfoAndDepartsMixin],
  data () {
    return {
      user: {
        realname: '',
        phone: '',
        email: '',
        birthday: '',
        type: [],
        resource: '',
        radio: 1,
        sex: null,
        status: null,
        org: '',
        orgList: []
      },
      statusList: [
        {
          label: '正常',
          value: 1
        },
        {
          label: '禁用',
          value: 2
        }
      ],
      rules: {
        realname: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        email: [
          { required: false, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      dialogVisible: false, // 是否显示弹出层
      proviewImg: '', // 弹出层预览的图片
      cropper: null // cropper裁切器
    }
  },
  created () {
    this.loadRelatedInfo()
  },
  methods: {
    // 加载登录人相关信息
    loadRelatedInfo () {
      const { birthday, email, id, phone, post, realname, sex, status, userIdentity } = this.userInfo
      const userPost = post.indexOf('admin') !== -1 && userIdentity === 2 ? '管理员' : post.indexOf('admin') === -1 && userIdentity === 2 ? '销售主管' : '业务员'
      this.user = Object.assign({}, { birthday, email, id, phone, post: userPost, realname, sex, status, userIdentity })
      this.user.orgList = this.departs.map(item => { return { value: item.id, label: item.departName } })
      this.user.org = this.user.orgList.map(item => item.value)
    },
    // 弹出弹出层
    handleAvatarChange () {
      this.dialogVisible = true
      const file = this.$refs.file.files[0]
      const blob = window.URL.createObjectURL(file)
      this.proviewImg = blob

      // 处理选择同一张图片时，file不触发change事件的bug
      this.$refs.file.value = ''
    },
    // dialog对话框完全打开时
    handleDialogOpened () {
      // 加载cropper
      const image = this.$refs.proviewImg
      this.cropper = new Cropper(image, { // 初始化裁切器
        aspectRatio: 1, // 定义裁剪框的固定纵横比 1 : 1
        cropBoxResizable: false, // 不允许改变裁切框的大小
        movable: true,
        dragMode: 'none', // 不允许裁切器自动变化 / 不允许移动图片
        viewMode: 1 //  限制裁剪框不超过画布的大小
      })
    },
    // 裁切并上传图片
    handleUploadPhoto () {
      const fd = new FormData()
      fd.append('file', fd)
      updateAlbum(fd).then(res => {
        console.log('上传成功看了', res)
      })
    },
    onSubmit () {
    }
  }
}
</script>

<style lang="less" scoped>
  .avatar-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      text-align: center;
      font-size: 20px;
      color: #333;
    }
  }
  // 弹出层
  .el-dialog__wrapper {
    .preview-wrap {
      img {
        display: block;
        max-width: 100%;
        height: 200px;
      }
    }
  }
</style>
