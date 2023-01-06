<template>
  <div class="layout-container">
    <!-- Container 布局容器 -->
    <el-container>
      <el-aside width="200px">
        <div class="logo">
          <a href="#">
            <img src="http://sms.jnmes.com/img/logo.bec6bef1.svg" alt="">
          </a>
        </div>
        <!-- 侧边导航栏 -->
        <el-menu
          default-active="1"
          :collapse="isCollapse">
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
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu> -->
        </el-menu>
        <!-- /侧边导航栏 -->
      </el-aside>
      <el-container>
        <el-header>
          <div class="header">
            <!-- el-icon-s-unfold -->
            <i class="el-icon-s-fold" />
            <div class="user-wrap"></div>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <!-- /Container 布局容器 -->
  </div>
</template>

<script>

export default {
  name: 'LayoutIndex',
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
  .layout-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .el-container {
      width: 100%;
      height: 100%;
      .el-aside {
        .logo {
          width: 100%;
          background-color: #409eff;
          a {
            display: block;
            height: 60px;
            line-height: 60px;
            padding: 12px 0 0 15px;
            box-sizing: border-box;
            img {
              height: 40px;
            }
          }
        }
      }
      .el-container {
        .el-header {
          background-color: #409eff;
          color: #fff;
          .header {
            line-height: 60px;
            i {
              font-size: 24px;
              vertical-align: middle;
              // font-size: 24px;
              font-weight: normal;
            }
          }
        }
      }
      // .el-header {
      //   .head-container {
      //     display: flex;
      //     justify-content: space-between;
      //     height: 100%;
      //     .user-info {}
      //   }
      // }
      // .el-container {
      //   height: 100%;
      //   .el-aside {
      //     .el-menu {
      //       height: 100%;
      //     }
      //   }
      // }
    }
  }
</style>
