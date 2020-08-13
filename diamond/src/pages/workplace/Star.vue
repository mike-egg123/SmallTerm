<template>
  <div>
    <el-row>
      <el-col :span="4" v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 20px; -webkit-transition-duration:0.3s; -webkit-transition-timing-function:linear; -webkit-transition-delay:0.01s;">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597145866902&di=832fbb88637a7e41c778cdb9a8d8d0d3&imgtype=0&src=http%3A%2F%2Fimg12.360buyimg.com%2Fn1%2Fjfs%2Ft17584%2F253%2F2043472217%2F52049%2F6f4f6993%2F5ae1354bN57b15f6e.jpg"  alt="word" class="image">
          <div style="padding: 20px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <br>
              <br>
              <el-tooltip class="item" effect="dark" content="收藏" placement="bottom-start">
                <el-button type="warning" icon="el-icon-star-off" circle></el-button>
              </el-tooltip>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'Star',
    data() {
      return {
        currentDate: new Date()
      };
    }
  }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
    margin-top: 8px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
