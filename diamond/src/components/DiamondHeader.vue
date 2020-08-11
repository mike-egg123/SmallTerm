<template>
  <div>
    <div class="header_wrap">
<!--      <div class="back">-->
<!--        <i class="iconfont icon-fanhui1"></i>-->
<!--        <el-link target="_blank" @click="$router.back()" class="act_back">返回</el-link>-->
<!--      </div>-->
      <slot name="left"></slot>
      <div class="project">
        {{title}}
      </div>
      <slot name="right"></slot>
<!--      <div class="trick">-->
<!--          已有账号？-->
<!--          <el-link type="primary" class="act_login">登录</el-link>-->
<!--      </div>-->
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  name: 'DiamondHeader',
  props:{
    title:String
  }
}
</script>

<style scoped rel="stylesheet">
.header_wrap{
  /*background-color: #02a774;*/
  display: flex;
  width: 95%;
  margin: 20px auto;

}
.iconfont{
  font-size: 23px;
  font-weight: bolder;
}
.back{
  flex-grow:.5;
  line-height: 30px;
  font-size: 20px;
  color: black;
  text-align: left;
}
.project {
  flex-grow:1;
  font-size: 33px;
  font-weight: bolder;
  letter-spacing: 3px;
  text-align: left;
}
.trick{
  flex: 3;
  text-align: end;
  line-height: 33px;
  font-size: 18px;
}
.act_login,.act_back{
  font-size: 18px;
}
</style>
