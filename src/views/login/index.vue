<template>
  <div class="login-container">
    <el-form ref="form" :model="user" class="user">
      <el-form-item>
        <div class="logo"></div>
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.code"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        name: '',
        password: '',
        code: ''
      }
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
