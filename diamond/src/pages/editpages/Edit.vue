<template>
  <div>
    <DiamondHeader title="xxx.doc">
      <div class="back" slot="left">
        <i class="iconfont icon-fanhui1"></i>
        <el-link target="_blank" @click="handleBack" class="act_back" :underline="false">返回</el-link>
        <div class="content-wrap">
          <div class="content-card">
            <div class="diamond-wrap">
              <div class="diamond">
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
      <div class="doc_info" slot="middle">
        <li>文档创建者&nbsp;:&nbsp;xxx</li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <li>所属团队&nbsp;:&nbsp;11111</li>
        <br>
        <li>创建时间&nbsp;:&nbsp;2020/8/11 20:00</li>&nbsp;&nbsp;&nbsp;&nbsp;
        <li>修改时间&nbsp;:&nbsp;2020/8/12 20:00</li>&nbsp;&nbsp;
        <li>文档大小&nbsp;:&nbsp;100kb</li>
      </div>
      <div class="person_wrap" slot="right">
        <el-tooltip class="item" effect="dark" content="收藏" placement="bottom-start"><el-button icon="el-icon-star-on" circle type="warning"></el-button></el-tooltip>
        <el-tooltip class="item" effect="dark" content="分享" placement="bottom-start"><el-button icon="el-icon-share" circle type="primary" @click="link"></el-button></el-tooltip>
        <el-tooltip class="item" effect="dark" content="添加评论" placement="bottom-start"><el-button icon="el-icon-chat-line-round" circle type="success" @click="newcomment"></el-button></el-tooltip>
      </div>
    </DiamondHeader>
    <el-container>
      <el-aside width="78%">
        <editor></editor>
      </el-aside>
      <el-main>
        <ul class="comment_list">
          <li v-for="(comment,index) in comments" style="padding: 10px;">
            <div style="text-align: left; font-size: 18px;font-weight: bold;padding-top: 5px;padding-bottom: 5px;color: #409EFF">{{comment.name}}</div>
            <div style="text-align: left; padding-left: 10px;padding-top: 5px;padding-bottom: 5px">&nbsp;&nbsp;&nbsp;&nbsp;{{comment.content}}</div>
            <div style="text-align: right;padding-top: 5px;">{{comment.time}}</div>
          </li>
        </ul>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import DiamondHeader from '../../components/DiamondHeader'
import Editor from '../Editor/Editor'
export default {
  name: 'Edit',
  components: {Editor, DiamondHeader},
  data(){
    return{
      comments:[
        {id:1,name:'jack1',content:'这篇文章写的不错',time:'2020/8/13 15:00'},
        {id:2,name:'jack2',content:'？？九折水瓶',time:'2020/8/13 15:01'},
        {id:3,name:'jack3',content:'不会吧不会吧不会真的有人觉得他写的好吧这我接受不了的',time:'2020/8/13 15:02'},
        {id:4,name:'jack4',content:'啊这...',time:'2020/8/13 15:03'},
      ],
      select:false,
      input:'',
      info_count:1
    }
  },
  methods:{
    handleBack(){
      this.$router.replace('/workplace')
    },
    goTo_PersonInfo(){
      this.$router.replace('/personInfo')
    },
    link() {
      this.$alert('这是一个链接', '复制以下链接分享', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'success',
            message: `分享成功！`
          });
        }
      });
    },
    newcomment() {
      this.$prompt('请输入评论', '评论该文档', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '评论成功！'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消评论'
        });
      });
    }
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
  padding: 20px;
  margin-top: -10px;
}

.el-main {
  color: #333;
  background-color: #FFF;
  padding:0px;
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
  display: block;
  padding: 30px;
  border-bottom: #ebeef5 1px solid;
  border-right: #ebeef5 1px solid;
  color: #2c3e50;
  -webkit-transition-duration:0.2s;
  -webkit-transition-timing-function:linear;
  -webkit-transition-delay:0.01s;
}
.choice:hover{
  font-size:23px ;
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
  left: 10px;
  top: 10px;
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


.doc_info{
  text-align: left;
  position: relative;
  left: -330px;
  top:2px;
}
.doc_info>li{
  margin-bottom: 8px;
  display:inline-block;
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
  /*background-color: #AAD3FE;*/
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.comment_list{
  line-height: 25px;
}
.comment_list>li{
  border-bottom: gainsboro 1px dotted;
  border-left:gainsboro 1px dotted;
  padding-left: 10px;
}
</style>
