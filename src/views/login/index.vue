<template>
  <div class="login-container">
    <el-form ref="userForm" :model="user" :rules="rules" class="user">
      <el-form-item>
        <div class="logo"></div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="user.username" /><!-- el-icon-s-custom -->
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" show-password v-model="user.password" />
      </el-form-item>
      <el-form-item prop="inputCode">
        <el-input placeholder="请输入验证码" prefix-icon="el-icon-refresh" v-model="user.inputCode" />
        <img v-if="showRandCode" :src="randCode" alt="" @click="loadVerificationCode" />
        <img v-else src="./checkcode.png" @click="loadVerificationCode" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loginLoading" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getVerificationCode } from 'https/login'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        username: '',
        password: '',
        inputCode: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        inputCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      timeStamp: '', // 获取当前的时间戳，用于获取最新验证码和登录时验证返回的code
      randCode: null, // 后台返回的验证码图片
      showRandCode: true, // 判断404图片是否显示
      loginLoading: false // 提交时添加loading效果
    }
  },
  created () {
    this.loadVerificationCode()
  },
  methods: {
    // 获取验证码
    loadVerificationCode () {
      this.timeStamp = new Date().getTime() // 获取当前时间戳
      this.user.inputCode = '' // 每次刷新 / 点击时，需要置空验证码
      getVerificationCode(this.timeStamp).then(res => {
        const { data: { message, result, success }, status } = res
        if (status === 200 && success) {
          this.randCode = result
          this.showRandCode = true
        } else {
          this.$message.error(message)
          this.showRandCode = false
        }
      }).catch(() => {
        this.showRandCode = false
      })
    },
    handleLogin () {
      this.$refs.userForm.validate(valid => {
        if (!valid) {
          console.log('submit!')
          return false
        }
        this.loginLoading = true
        // 发送请求
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url('./login_bg.jpg') no-repeat center center;
    background-size: 100% 100%;
    .user {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      height: 600px;
      padding: 20px 10px;
      background-color: #fff;
      box-sizing: border-box;
    }
  }
</style>
