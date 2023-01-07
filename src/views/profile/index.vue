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
            <!-- <img src="" alt=""> -->
            <!-- <el-avatar shape="square" :size="100" fit="cover" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c2594117123jpeg.jpeg"></el-avatar> -->
            <el-image
              style="width: 200px; height: 200px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c2594117123jpeg.jpeg"
              fit="cover"></el-image>
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
      width="30%">
      <img :src="proviewImg" alt="">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { JNMES_DEPARTS, JNMES_USER_INFO } from 'utils/jsmesconst'

export default {
  name: 'ProfileIndex',
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
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      dialogVisible: false, // 是否显示弹出层
      proviewImg: '', // 弹出层预览的图片
      value1: [],
      value2: []
    }
  },
  created () {
    this.loadRelatedInfo()
  },
  methods: {
    // 加载登录人相关信息
    loadRelatedInfo () {
      const departs = JSON.parse(window.localStorage.getItem(JNMES_DEPARTS))
      const userInfo = JSON.parse(window.localStorage.getItem(JNMES_USER_INFO))
      const { birthday, email, id, phone, post, realname, sex, status, userIdentity } = userInfo
      this.user = Object.assign({}, { birthday, email, id, phone, post, realname, sex, status, userIdentity })
      this.user.orgList = departs.map(item => { return { value: item.id, label: item.departName } })
      this.user.org = this.user.orgList.map(item => item.value)
      // console.log('加载完成', departs, userInfo)
    },
    // 弹出弹出层
    handleAvatarChange () {
      this.dialogVisible = true
    },
    onSubmit () {
      console.log('submit!')
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
</style>
