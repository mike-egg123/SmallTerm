<template>
  <div>
    <DiamondHeader title="个人工作台">
      <div class="back" slot="left">
        <div class="content-wrap" style="overflow: visible">
          <div class="content-card" style="overflow: visible">
            <div class="diamond-wrap" style="overflow: visible">
              <div class="diamond" style="overflow: visible">
                <div class="diamond-side side--top">
                  <div class="diamond-sharp"></div>
                  <div class="diamond-sharp"></div>
                  <div class="diamond-sharp"></div>
                  <div class="diamond-sharp"></div>
                  <div class="diamond-sharp"></div>
                  <div class="diamond-sharp"></div>
                  <div class="diamond-sharp"></div>
                  <div class="diamond-sharp"></div>
                  <div class="diamond-sharp"></div>
                </div>
                <div class="diamond-side side--bottom">
                  <div class="diamond-sharp">
                    <div class="diamond-sharp--color"></div>
                  </div>
                  <div class="diamond-sharp">
                    <div class="diamond-sharp--color"></div>
                  </div>
                  <div class="diamond-sharp">
                    <div class="diamond-sharp--color"></div>
                  </div>
                  <div class="diamond-sharp">
                    <div class="diamond-sharp--color"></div>
                  </div>
                  <div class="diamond-sharp">
                    <div class="diamond-sharp--color"></div>
                  </div>
                  <div class="diamond-sharp">
                    <div class="diamond-sharp--color"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="person_wrap" slot="right">
        <div class="search_warp">
          <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
            <el-button slot="append" icon="iconfont icon-sousuo1" @click="goTo_SearchResult"></el-button>
          </el-input>
        </div>
        <div class="talk_wrap">
          <el-dropdown style="margin: auto">
            <el-badge :value="info_count" class="item">
              <el-button icon="el-icon-bell" circle type="info"  @click="goTo_Notice"></el-button>
            </el-badge>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>团队邀请&nbsp;&nbsp;&nbsp;<el-badge class="mark" :value="3" style="margin-top: -5px"/></el-dropdown-item>
              <el-dropdown-item>文档评论&nbsp;&nbsp;&nbsp;<el-badge class="mark" :value="3" style="margin-top: -5px" /></el-dropdown-item>
              <el-dropdown-item>踢出/加入团队&nbsp;&nbsp;&nbsp;<el-badge class="mark" :value="3" style="margin-top: -5px" /></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="userInfo_wrap">
          <el-button icon="el-icon-user-solid" circle @click="goTo_PersonInfo" type="primary"></el-button>
        </div>
      </div>
    </DiamondHeader>
    <el-container>
      <el-aside width="15%">
        <ul>
          <router-link to="/workplace/recent" class="choice"><i class="el-icon-timer"></i>&nbsp;最近浏览</router-link>
          <router-link to="/workplace/star" class="choice"><i class="el-icon-star-off"></i>&nbsp;收&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;藏</router-link>
          <router-link to="/workplace/mydoc" class="choice"><i class="el-icon-document-copy"></i>&nbsp;我创建的</router-link>
          <router-link to="/workplace/team" class="choice"><i class="el-icon-ship"></i>&nbsp;团&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;队</router-link>
          <router-link to="/workplace/recycler" class="choice"><i class="el-icon-delete"></i>&nbsp;回&nbsp;收&nbsp;站</router-link>
        </ul>
      </el-aside>
      <!--        <el-aside width="1px" style="background-color: #9a9a9a" ></el-aside>-->
      <el-main width="70%">
        <router-view></router-view>
        <!--          <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>-->
      </el-main>
      <el-aside width="15%" style="text-align: center">
        <el-row>
          <el-button @click="handleCreate" round size="medium" style="margin-bottom: 15px;margin-top: 15px">创建新文档</el-button>
          <br>
          <el-button type="primary" @click="handleCreate" round size="medium">基于模板创建</el-button>
          <br>
<!--          <el-button type="primary" @click="handleCreateTeam" round size="medium">基于模板创建</el-button>-->
        </el-row>
      </el-aside>
    </el-container>
  </div>
</template>
<script>
  import DiamondHeader from '../../components/DiamondHeader'
  import {mapState,mapActions} from 'vuex'
  export default {
    name: 'Workplace',
    components: {DiamondHeader},
    data(){
      return{
        select:false,
        input:'',
        info_count:1,
        msg1:'团队邀请'
      }
    },
    computed:{
      ...mapState(['userList'])
    },
    methods:{
      ...mapActions(['recordSearchUser','recordKeyword']),
      goTo_PersonInfo(){
        this.$router.replace('/personInfo')
      },
      goTo_Notice(){
        this.$router.replace('/notice')
      },
      handleCreate(){
        this.$router.replace('/edit')
      },
      goTo_SearchResult(){
        this.$router.replace('/workplace/searchresult')
        //全局搜索用户
        this.recordSearchUser(this.input)
        this.recordKeyword(this.input)

      },
      // OpenTalk(){
      //   this.$alert('' , '查看消息', {
      //     confirmButtonText: '关闭查看',
      //     showCancelButton: false,
      //     type: 'primary',
      //     center: true,
      //     dangerouslyUseHTMLString: true,
      //     message:'<div style="height: 30px">团队邀请<span style="background-color: #F56C6C;color:#fff;display: inline-block;margin-left:10px;width: 24px;height: 24px;border-radius: 50%">1</span></div>' +
      //       '<div style="height: 30px">文档评论<span style="background-color: #F56C6C;color:#fff;display: inline-block;margin-left:10px;width: 24px;height: 24px;border-radius: 50%">11</span></div>' +
      //       '<div style="height: 30px">踢出团队<span style="background-color: #F56C6C;color:#fff;display: inline-block;margin-left:10px;width: 24px;height: 24px;border-radius: 50%">0</span></div>' +
      //       '<div style="height: 30px">加入团队<span style="background-color: #F56C6C;color:#fff;display: inline-block;margin-left:10px;width: 24px;height: 24px;border-radius: 50%">2</span></div>'
      //   }).then(() => {
      //     this.$message({
      //       type: 'success',
      //       message: '已关闭查看!'
      //     });
      //   })
      // }
    }
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 40px;
  }

  .el-aside {
    background-color: #FFF;
    border-radius:0 0 10px 0;
    /*border: 1px #9a9a9a solid;*/
    border-top:none ;
    border-left:none ;
    border-right: none;
    color: #333;
    text-align: center;
    line-height: 35px;
    font-size: 22px;
    overflow: visible;
  }

  .el-main {
    color: #333;
    padding-top: 16px;
    padding-left: 30px;
    background-color: #FFF;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .choice{
    font-size: 16px;
    display: block;
    padding: 10px;
    border-bottom: #ebeef5 1px solid;
    border-right: #ebeef5 1px solid;
    color: #2c3e50;
    -webkit-transition-duration:0.1s;
    -webkit-transition-timing-function:linear;
    -webkit-transition-delay:0.01s;
  }
  .choice:hover{
    font-size:17px ;
    /*border-radius:10px;*/
  }
  .choice:last-child{
    border-radius:0 0 10px 0;
  }
  .router-link-active{
    color: #409EFF;
    background-color: #FFF;
  }
  body{
    background: #FFF;
  }


  .content-wrap {
    position: relative;
    top:-35px;
    left: 100px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /*padding-top: 180px;*/
    /*padding-bottom: 160px;*/
  }
  .content-wrap .content-card {
    width: 240px;
    height: 150px;
    /*background: #FFFFFF;*/
    border-radius: 3px;
    display: flex;
    position: absolute;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content-wrap .content-card .diamond-wrap {
    animation: diamond-shiny 1s infinite alternate;
    /*background-color: #AAD3FE;*/
    position: absolute;
    left: -20px;
    top: 40px;
  }
  @keyframes diamond-shiny {
    from {
      filter: drop-shadow(0 0 12px #FFF) drop-shadow(0 0 3px #BEDEFF);
    }
    to {
      filter: drop-shadow(0 0 30px #FFF) drop-shadow(0 0 12px #BEDEFF);
    }
  }
  .content-wrap .content-card .diamond {
    width: 120px;
    height: 105px;
    clip-path: polygon(0 30px, 21px 0, 105px 0, 120px 30px, 60px 105px);
    transform: scale(0.6);
  }
  .content-wrap .content-card .diamond .diamond-side {
    width: 120px;
  }
  .content-wrap .content-card .diamond .diamond-side.side--top {
    height: 30px;
    display: flex;
    animation: diamond--top 1s linear infinite;
  }
  @keyframes diamond--top {
    from {
      margin-left: 0;
    }
    to {
      margin-left: -80px;
    }
  }
  .content-wrap .content-card .diamond .diamond-side.side--top .diamond-sharp {
    width: 40px;
    height: 30px;
    background: #FFF;
    flex-shrink: 0;
    animation: diamond--top-sharp 0.5s linear infinite alternate;
  }
  @keyframes diamond--top-sharp {
    from {
      background: #FFF;
    }
    to {
      background: #C2E0FF;
    }
  }
  .content-wrap .content-card .diamond .diamond-side.side--top .diamond-sharp + .diamond-sharp {
    margin-left: -20px;
  }
  .content-wrap .content-card .diamond .diamond-side.side--top .diamond-sharp:nth-child(even) {
    clip-path: polygon(0 0, 100% 0, 50% 100%);
    animation: diamond--top-sharp-even 0.5s linear infinite alternate;
  }
  @keyframes diamond--top-sharp-even {
    from {
      background: #AAD3FE;
    }
    to {
      background: #FFF;
    }
  }
  .content-wrap .content-card .diamond .diamond-side.side--bottom {
    height: 75px;
    background: #C2E0FF;
    display: flex;
  }
  .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp {
    width: 120px;
    height: 75px;
    flex-shrink: 0;
    position: absolute;
  }
  .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp:nth-child(1) {
    animation: diamond--bottom-sharp-0 1s linear infinite;
  }
  @keyframes diamond--bottom-sharp-0 {
    from {
      clip-path: polygon(0% 0, 33.3333333333% 0, 50% 100%);
    }
    to {
      clip-path: polygon(-66.6666666667% 0, -33.3333333333% 0, 50% 100%);
    }
  }
  .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp:nth-child(2) {
    animation: diamond--bottom-sharp-1 1s linear infinite;
  }
  @keyframes diamond--bottom-sharp-1 {
    from {
      clip-path: polygon(33.3333333333% 0, 66.6666666667% 0, 50% 100%);
    }
    to {
      clip-path: polygon(-33.3333333333% 0, 0% 0, 50% 100%);
    }
  }
  .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp:nth-child(3) {
    animation: diamond--bottom-sharp-2 1s linear infinite;
  }
  @keyframes diamond--bottom-sharp-2 {
    from {
      clip-path: polygon(66.6666666667% 0, 100% 0, 50% 100%);
    }
    to {
      clip-path: polygon(0% 0, 33.3333333333% 0, 50% 100%);
    }
  }
  .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp:nth-child(4) {
    animation: diamond--bottom-sharp-3 1s linear infinite;
  }
  @keyframes diamond--bottom-sharp-3 {
    from {
      clip-path: polygon(100% 0, 133.3333333333% 0, 50% 100%);
    }
    to {
      clip-path: polygon(33.3333333333% 0, 66.6666666667% 0, 50% 100%);
    }
  }
  .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp:nth-child(5) {
    animation: diamond--bottom-sharp-4 1s linear infinite;
  }
  @keyframes diamond--bottom-sharp-4 {
    from {
      clip-path: polygon(133.3333333333% 0, 166.6666666667% 0, 50% 100%);
    }
    to {
      clip-path: polygon(66.6666666667% 0, 100% 0, 50% 100%);
    }
  }
  .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp:nth-child(6) {
    animation: diamond--bottom-sharp-5 1s linear infinite;
  }
  @keyframes diamond--bottom-sharp-5 {
    from {
      clip-path: polygon(166.6666666667% 0, 200% 0, 50% 100%);
    }
    to {
      clip-path: polygon(100% 0, 133.3333333333% 0, 50% 100%);
    }
  }
  .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp .diamond-sharp--color {
    width: 100%;
    height: 100%;
    animation: diamond--bottom-sharp 0.5s linear infinite alternate;
  }
  @keyframes diamond--bottom-sharp {
    from {
      background: #C2E0FF;
    }
    to {
      background: #AAD3FE;
    }
  }
  .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp:nth-child(even) .diamond-sharp--color {
    animation: diamond--bottom-sharp-even 0.5s linear infinite alternate;
  }
  @keyframes diamond--bottom-sharp-even {
    from {
      background: #AAD3FE;
    }
    to {
      background: #C2E0FF;
    }
  }
  .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp:nth-child(2) .diamond-sharp--color {
    background: #C2E0FF;
    animation: none !important;
  }
  .content-wrap .content-card .diamond .diamond-side.side--bottom .diamond-sharp:nth-child(5) .diamond-sharp--color {
    background: #AAD3FE;
    animation: none !important;
  }
  .content-wrap .content-description {
    width: 240px;
    margin-top: 96px;
    color: #FFF;
    position: absolute;
  }


  .person_wrap{
    display: flex;
  }
  .search_warp{
    margin-right: 30px;
  }
  .talk_wrap,.userInfo_wrap{
    margin-right: 20px;
  }


  .content-wrap .content-description .description--inspiration {
    font-size: 0.8em;
  }
  .content-wrap .content-description .description--inspiration
  .description--hyperlink {
    color: #EA4C89;
    text-decoration: none;
  }
  .search_warp .input-with-select{
    width: 350px;
    /*background-color: #AAD3FE;*/
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
