<template>
  <div class="layout-container">
    <!-- Container 布局容器 -->
    <el-container>
      <el-aside width="auto">
        <div class="logo">
          <a href="#">
            <img src="http://sms.jnmes.com/img/logo.bec6bef1.svg" alt="">
          </a>
        </div>
        <!-- 侧边导航栏 -->
        <el-menu
          router
          text-color="#8e99f6"
          active-text-color="#fff"
          collapse-transition
          default-active="/home"
          :collapse="isCollapse">
          <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/custome">
            <i class="el-icon-user"></i>
            <span slot="title">{{ userInfo.userIdentity === 2 ? '客户管理' : '我的客户' }}</span>
          </el-menu-item>
          <el-menu-item index="3">
            <!-- el-icon-zoom-in -->
            <!-- el-icon-s-check -->
            <i class="el-icon-s-check"></i>
            <span slot="title">{{ userInfo.userIdentity === 2 ? '审核管理' : '我的申请' }}</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-document-copy"></i>
            <span slot="title">{{ userInfo.userIdentity === 2 ? '日志管理' : '我的日志' }}</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-document"></i>
            <span slot="title">{{ userInfo.userIdentity === 2 ? '日报管理' : '我的日报' }}</span>
          </el-menu-item>
          <el-menu-item index="/config">
            <!-- <i class="el-icon-setting"></i> -->
            <i class="el-icon-coin"></i>
            <span slot="title">基础配置</span>
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
            <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="handleToggle" />
            <div class="user-wrap" @click="handleToProfile">个人中心</div>
            <div class="user-wrap" @click="handleSingOut">退出</div>
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
import { userInfoAndDepartsMixin } from 'utils/mixin'
import { JNMES_TOKEN } from 'utils/jsmesconst'

export default {
  name: 'LayoutIndex',
  mixins: [userInfoAndDepartsMixin],
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    // 切换展开 / 隐藏
    handleToggle () {
      this.isCollapse = !this.isCollapse
    },
    // 去往个人中心
    handleToProfile () {
      this.$router.push('/profile')
    },
    // 退出
    handleSingOut () {
      this.$confirm('确定注销登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '注销成功!'
        })
        window.localStorage.removeItem(JNMES_TOKEN) // 清除登录人token信息
        this.$router.push('/login')
      })
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
      background-color: #f4f4f4;
      .el-aside {
        background-color: #3a3b6a;
        .logo {
          width: 100%;
          background-color: #3a3b6a;
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
        .el-menu {
          height: calc(100% - 60px);
          background-color: #3a3b6a;
          .el-menu-item {
            width: 200px;
            i {
              color: #8e99f6;
            }
          }
          .el-menu-item:hover {
            background-color: transparent;
          }
          .is-active {
            background-color: transparent;
            i {
              color: #fff;
            }
          }
        }
      }
      .el-container {
        .el-header {
          background-color: #fff;
          color: #333;
          box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.2);
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 60px;
            i {
              font-size: 24px;
              vertical-align: middle;
              font-weight: normal;
            }
          }
        }
        // .el-main {
        //   padding: 20px 25px;
        // }
      }
    }
  }
</style>
