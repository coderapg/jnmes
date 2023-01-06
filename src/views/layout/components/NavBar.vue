<template>
  <el-container>
      <el-header>
        <div class="head-container">
          <div class="logo">
            <img src="../../assets/images/logo.png" alt="">
          </div>
          <div class="user-info">123</div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 导航菜单 -->
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo">
            <el-menu-item index="1">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-user"></i>
              <span slot="title">客户管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <!-- el-icon-zoom-in -->
              <!-- el-icon-s-check -->
              <i class="el-icon-s-check"></i>
              <span slot="title">审核管理</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-document-copy"></i>
              <span slot="title">日志管理</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-document"></i>
              <span slot="title">日报管理</span>
            </el-menu-item>
            <el-menu-item index="6">
              <!-- <i class="el-icon-setting"></i> -->
              <i class="el-icon-coin"></i>
              <span slot="title">基础设置</span>
            </el-menu-item>
          </el-menu>
          <!-- /导航菜单 -->
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
