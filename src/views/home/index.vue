<template>
  <div class="home-container">
    <div class="home-head-census">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>总销售额</span>
        </div>
        <div class="statistic-content">
          <em>¥</em>
          <span>{{ totalSales }}</span>
          <!-- <el-statistic group-separator="," :precision="2" :value="totalSales" /> -->
        </div>
        <div class="footer">
          <span>单笔销售均额:</span>
          <span><em>¥</em>{{ avgSales }}</span>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>总销售额</span>
        </div>
        <div class="statistic-content">
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>客户类型占比</span>
        </div>
        <p class="title">总销售额</p>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>总销售额</span>
        </div>
        <p class="title">总销售额</p>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getTotalSales } from 'https/home'

export default {
  name: 'HomeIndex',
  data () {
    return {
      totalSales: 0,
      avgSales: 0
    }
  },
  created () {
    this.loadTotalSales()
  },
  methods: {
    loadTotalSales () {
      getTotalSales().then(res => {
        const { result: { avg, total }, success } = res.data
        if (success) {
          this.totalSales = total
          this.avgSales = avg
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container {
    .home-head-census {
      display: flex;
      justify-content: space-between;
      /deep/ .box-card {
        color: #fff;
        border-radius: 10px;
        width: 400px;
        height: 180px;
        .el-card__header {
          padding: 16px 20px 0px 20px;
          border-bottom: 1px solid transparent;
        }
        .el-card__body {
          position: relative;
          padding: 0px 20px;
          .statistic-content {
            height: 130px;
          }
          .footer {
            position: absolute;
            left: 20px;
            bottom: 0px;
            font-size: 12px;
            span {
              margin-right: 6px;
            }
            span:nth-child(2) {
              font-size: 16px;
              em {
                font-size: 12px;
                font-style: normal;
                margin-right: 4px;
              }
            }
          }
        }
      }
      /deep/ .box-card:nth-child(1) {
        background-color: #8593f2;
        box-shadow: 0 2px 10px 0 rgba(133, 147, 242, .4);
        .statistic-content {
          line-height: 130px;
          em {
            font-size: 12px;
            margin-right: 4px;
            font-style: normal;
          }
          span {
            font-size: 30px;
          }
        }
      }
      .box-card:nth-child(2) {
        background-color: #bd8def;
        box-shadow: 0 2px 10px 0 rgba(189, 141, 239, .4);
      }
      .box-card:nth-child(3) {
        background-color: #fea898;
        box-shadow: 0 2px 10px 0 rgba(254, 168, 239, .4);
      }
      .box-card:nth-child(4) {
        background-color: #8ac3f8;
        box-shadow: 0 2px 10px 0 rgba(138, 195, 248, .4);
      }
    }
  }
</style>
