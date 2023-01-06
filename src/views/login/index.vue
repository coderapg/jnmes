<template>
  <div class="login-container">
    <el-row class="login">
      <el-col :span="12">
        <el-form ref="userForm" :model="user" :rules="rules" class="user">
          <el-form-item class="logo-title">
            <div class="logo">
              <img src="../../assets/images/logo.png" alt="">
            </div>
            <div class="title">{{ titleName }}</div>
          </el-form-item>
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="user.username" /><!-- el-icon-s-custom -->
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" show-password v-model="user.password" />
          </el-form-item>
          <el-form-item prop="captcha" class="code-wrap">
            <el-input placeholder="请输入验证码" prefix-icon="el-icon-refresh" v-model="user.captcha" />
            <img v-if="showRandCode" :src="randCode" alt="" @click="loadVerificationCode" />
            <img v-else src="./checkcode.png" @click="loadVerificationCode" />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="rememberMe">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loginLoading" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12"><div class="grid-content"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { JNMES_TOKEN } from 'utils/jsmesconst'

import { getVerificationCode, signIn } from 'https/login'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        username: '',
        password: '',
        captcha: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      // logoUrl: 'http://sms.jnmes.com/img/logo.bec6bef1.svg', // logo图片地址
      titleName: '优客EMS销售管理系统',
      timeStamp: '', // 获取当前的时间戳，用于获取最新验证码和登录时验证返回的code
      randCode: null, // 后台返回的验证码图片
      showRandCode: true, // 判断404图片是否显示
      loginLoading: false, // 提交时添加loading效果
      rememberMe: true // 是否记住密码
    }
  },
  created () {
    this.loadVerificationCode()
  },
  methods: {
    // 获取验证码
    loadVerificationCode () {
      this.timeStamp = new Date().getTime() // 获取当前时间戳
      this.user.captcha = '' // 每次刷新 / 点击时，需要置空验证码
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
    // 登录操作
    handleLogin () {
      this.$refs.userForm.validate(valid => {
        if (!valid) {
          return false
        }
        this.loginLoading = true
        // 发送请求
        const form = Object.assign({}, this.user, { checkKey: this.timeStamp })
        signIn(form).then(res => {
          this.loginLoading = false
          const { data: { code, message, result: { departs, multi_depart: multiDepart, sysAllDictItems, tenantList, token, userInfo }, success } } = res
          console.log('登录的相关信息===', departs, multiDepart, sysAllDictItems, tenantList, userInfo)
          if (code === 200 && success) {
            this.$notify.success({
              title: '提示',
              duration: 2000,
              message
            })
            // 存储到本地
            window.localStorage.setItem(JNMES_TOKEN, JSON.stringify(token))
            // 跳转
            this.$router.push('/')
          } else {
            this.$notify.error({
              title: '提示',
              duration: 2000,
              message
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: url('./background.svg') no-repeat center center;
    background-size: 100%;
    background-color: #f0f0f0;
    .login {
      display: flex;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      background-color: #fff;
      box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      overflow: hidden;
      .el-col {
        .user {
          padding: 20px;
          box-sizing: border-box;
          .logo-title {
            height: 120px;
            /deep/ .el-form-item__content {
              // line-height: 80px;
              display: flex;
              flex-direction: column;
              align-items: center;
              .logo {
                img {
                  height: 60px;
                }
              }
              .title {
                font-size: 24px;
                color: #000;
                font-weight: 500;
              }
            }
          }
        }
        .grid-content {
          width: 400px;
          height: 600px;
          background: url('./login_bg.png') no-repeat center center;
          background-size: cover;
        }
        .code-wrap {
          /deep/ .el-form-item__content {
            .el-input {
              width: 66%;
            }
            img {
              vertical-align: middle;
              margin-left: 4px;
            }
          }
        }
        .el-button {
          width: 100%;
          height: 50px;
        }
      }
    }
  }
</style>
