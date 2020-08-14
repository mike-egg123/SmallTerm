<template>
  <div>
    <div class="header_wrap">
      <div class="project">
        {{title}}
      </div>
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Member',
  props:{
    title:String
  }
}
</script>

<style scoped>
.header_wrap{
  /*background-color: #02a774;*/
  display: flex;
  width: 95%;
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
  font-size: 16px;
  font-weight: lighter;
  text-align: left;
  margin:5px;
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
