<template>
  <div>
    <DiamondHeader :title="article_title">
      <div class="back" slot="left">
        <i class="iconfont icon-fanhui1"></i>
        <el-link target="_blank" @click="$router.back()" class="act_back">返回</el-link>
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

      
      <!-- 三个小按钮 -->
      <div class="person_wrap" slot="right">
        <el-tooltip class="item" effect="dark" content="收藏" placement="bottom-start"><el-button icon="el-icon-star-on" circle type="warning" @click="star" size="small"></el-button></el-tooltip>
        <el-tooltip class="item" effect="dark" content="分享" placement="bottom-start"><el-button icon="el-icon-share" circle type="primary" @click="link" size="small"></el-button></el-tooltip>
        <el-tooltip class="item" effect="dark" content="添加评论" placement="bottom-start"><el-button icon="el-icon-chat-line-round" circle type="success" @click="newcomment" size="small"></el-button></el-tooltip>
      </div>
      
    </DiamondHeader>
    <!-- 以下文档信息显示异常 -->
      <div class="doc_info" slot="middle">
        文档创建者&nbsp;:&nbsp;<li>{{author}}</li>
        创建时间&nbsp;:&nbsp;<li>{{formatDate(created_time)}}</li>&nbsp;&nbsp;
        修改时间&nbsp;:&nbsp;<li>{{formatDate(updated_time)}}</li>&nbsp;&nbsp;
      </div>
    <el-container style="margin: 0 100px">
      <el-aside width="80%">
        <div class="article_title">
          <el-input type="text" placeholder="请输入文档标题" v-model="title" maxlength="10" show-word-limit ></el-input>
          <!-- 文档权限管理，仅限作者本人 -->
          <div class="block" style="display: inline-block" v-show="isAuthor">
            <!-- 设置新权限：
            {{this.selectedOptions}} -->
            <el-cascader
            v-model="selectedOptions"
            :options="options"
            :props="defaultParams"
            collapse-tags
            clearable>
            </el-cascader>
          </div>
        </div>
        <vue-ueditor-wrap v-model="content" :config='myConfig'>
          <VueUeditorWrap/>
        </vue-ueditor-wrap>
        <br>
        <el-button @click="change()" round type="warning" v-show="!this.myConfig.readonly">提交修改</el-button>
      </el-aside>
      <el-main>
        <ul class="comment_list">
          <li v-for="(comment,index) in comments" :key="index" v-if="(index>=begin&&index<end)" style="padding: 10px;">
            <div style="text-align: left; font-size: 15px;color: #409EFF;vertical-align:center;vertical-align: middle;line-height: 20px"><el-avatar size="medium" :src="comment.avatar"></el-avatar>&nbsp;&nbsp;&nbsp;{{comment.username}}</div>
            <div style="text-align: left; padding-left: 10px;padding-top: 5px;padding-bottom: 5px">&nbsp;&nbsp;&nbsp;&nbsp;{{comment.content}}</div>
            <div style="text-align: right;padding-top: 5px;">{{formatDate(comment.created)}}</div>
          </li>
        </ul>
        <!-- 评论区翻页 -->
        <div v-show="this.comments.length>5">
        <el-button type="primary" icon="el-icon-caret-left" @click="decrement"></el-button>
        <el-button>第{{end/5}}页</el-button>
        <el-button type="primary" icon="el-icon-caret-right" @click="increment"></el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import DiamondHeader from '../../components/DiamondHeader'
import { reqGetComment, reqAddComment, reqLikeornotArticle, reqCommentMessage } from '../../api'
import { reqStore, reqCreate, reqFetch, reqUpdate,
  reqReleaseLock, reqGetPermission, reqSetPermission, reqGetAllTeam,
  reqGetPermissionSetting } from '../../api'  
import { mapGetters, mapActions, mapState } from 'vuex'
import Config from '../../../static/UEditor/ueditor.config.js'

export default {
  name: 'Edit',
  components: {VueUeditorWrap, DiamondHeader},
  data(){
    return{
      comments:[],
      select:false,
      articleid:this.$route.params.articleid,
      created_time:"",
      updated_time:"",
      invitelink:"",      
      author:"",
      authorid:"",
      isAuthor:false,//true:作者本人,能够修改文档权限
      permission0: 0,//临时存储查询权限的结果
      permission:0,//为了正常提交修改
      state:"",//0为私有文档，1为团队只读，2为团队可改
      lastChosen:[],//上一次文档权限中的团队teamname列表
      teamlist:[],//拥有文档权限的团队id列表 
      title: "",   
      content: "",
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 400,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: 'http://35.201.165.105:8000/controller.php',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/static/UEditor/',
        readonly:false,//是否可以编辑,空值为默认false,按钮为显示状态
      },
      selectedOptions: [],//与文档权限联动
      defaultParams: {
          multiple: true,
          label: 'teamname',
          value: 'teamid',
      },
      options: [
        {
          teamid:0,//value
          teamname: '仅自己可见',//label
        },
        {
          teamid:1,
          teamname: '团队可见',
          children: []
        },
        {
          teamid:2,
          teamname: '团队可见且可编辑',
          children: []
        }
      ],
    }
  },
  computed:{
    article_title:function (){
      return this.title+'.doc';
    },
    ...mapGetters([//管理所有的事件
      'begin',
      'end',
      'user'
    ]),
    ...mapState(['userInfo']),
  },
  methods:{
    goTo_PersonInfo(){
      this.$router.replace('/personInfo')
    },
    ...mapActions([//获取页码
      'increment',
      'decrement',
      'clickOdd',
      'clickAsync',
      'getUserInfo'
    ]),
    //收藏
    star() {
      reqLikeornotArticle(this.userInfo.userid,this.articleid,true)
      this.$message({
        type:'success',
        message:'收藏成功'
      })
    },
    // onCopy: function (e) {
    //   console.log('本文档链接为: ' + e.text)

    // },
    // onError: function (e) {
    //   console.log('复制失败')
    // },
    //分享->复制链接
    link () {
      this.invitelink = location.href.replace(this.$route.path+this.$route.params,'');
      this.$alert('请通过复制以下链接来分享文档'+this.invitelink , '分享', {
        confirmButtonText: '复制链接',
        callback: action => {
          this.$copyText(this.invitelink).then(
            function(e) {
              console.log('本文档链接为: ' + e.text)
            })
          this.$message({
            type: 'success',
            message: '链接已复制到剪贴板'
          });
        }
      });
    },
    newcomment() {
      this.$prompt('请输入评论(不多于50字)', '评论该文档', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: function (value) {
          if (!value) {
            return "评论不能为空"
          } else if (value.length > 50) {
            return "请控制评论字数"
          } else {}
        },
      }).then(({ value }) => {       
          this.addComment(value);
          if (!this.isAuthor) {//不是作者本人，才发消息
            var sendRes = reqCommentMessage(this,articleid,this.userInfo.userid)
            console.log(sendRes)
          }
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
    },
    async addComment(value) {
      const {articleid} = this
      const result3 = await reqAddComment(articleid,this.userInfo.userid,value)
      console.log(result3)
      const result2 = await reqGetComment(articleid)
      console.log(result2)
      this.comments = result2
    },
    formatDate (date) {
      Date.prototype.format = function(fmt) {
        var o = {
          "M+" : this.getMonth()+1,                 //月份
          "d+" : this.getDate(),                    //日
          "h+" : this.getHours(),                   //小时
          "m+" : this.getMinutes(),                 //分
          "s+" : this.getSeconds(),                 //秒
          "q+" : Math.floor((this.getMonth()+3)/3), //季度
          "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt)) {
          fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
          if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
          }
        }
        return fmt;
      }
      //假设输入的时间格式为YYYY-MM-DDTHH-mm-SS.sss
      const s = String(date)
      s.replace(/(\+d{2})(\d{2})$/, "$1:$2")
      return new Date(s).format('yyyy-MM-dd hh:mm:ss')
    },
    //根据selectedOptions修改权限
    async changePermission() {
      if (this.selectedOptions.length == 0) {
        //没选新的，原样返回
        //const {state,teamlist} = this
        //const result1 = await reqSetPermission(this.userInfo.userid,state,articleid,teamlist)
        console.log("Set permission to: " + this.articleid)
      }
      else {//需要检查selectedOptions,另外这个数组会在每个维度自动升序排列
        if (this.selectedOptions[0] == 0 && this.selectedOptions.length > 1) {
          this.$message('私有文档不能设置为团队可见')
        } else if (this.selectedOptions.length > 1 && this.selectedOptions[0][0] != this.selectedOptions[-1][0]) {
          this.$message('只能选择一种权限')
        } else {
            var s = this.selectedOptions[0]
            if (s.length == 1 && s[0] == 0) {
              this.state = 0
            }
            else {
              this.state = s[0]
            }           
            if (this.state == 0) {//私有，teamlist为空
              const result1 = await reqSetPermission(this.userInfo.userid,this.state,this.articleid,[])
              console.log("Set permission to: " + this.articleid)
            } else {//state == 1 || state == 2
              var teamlist = []//先清空
              console.log("在这里看到即将提交的团队权限")
              console.log("团队权限（0/1/2）:")
              console.log(this.state)
              console.log("清空的团队id：")
              console.log(teamlist)
              var item
              for (var i = 0;i < this.selectedOptions.length;i++) {//这样访问是有问题的
                teamlist.push(this.selectedOptions[i][1]);
                console.log("一个新加入的团队id：")
                console.log(this.selectedOptions[i][1])
              }
              
              const result1 = await reqSetPermission(this.userInfo.userid,this.state,this.articleid,teamlist)
              console.log("Set permission to: " + this.articleid + result1.message)
            }
        }
      }
    },   
    //编辑文档并提交
    async change(userid0) {
      if (!userid0) {
        userid0 = this.userInfo.userid
      }
      //alert("编辑器提交一次: " + this.userInfo.userid)     
      //延时
      // var time = 1000//延时执行，时间1000ms
      // var startTime = new Date().getTime() + parseInt(time, 10);
      // while(new Date().getTime() < startTime) {}
      //修改标题和内容
      const {articleid,title,content,permission} = this     
      const result = await reqUpdate(articleid,title,content,permission)
      console.log("One update to: " + this.articleid)
      console.log("最近一次修改者:"+userid0)
      //修改权限
      await this.changePermission()
      //悬浮提示
      this.$message({
        type:'success',
        message:'文档保存成功'
      })
    },
    async fresh() {
      const {articleid} = this
      //判断是否登录
      if (!this.userInfo.userid) 
      {//未登录
        this.$message({
          type: 'info',
          message: '请先登录'
        });
        this.$router.replace('/login')
      }
      else {
        //await reqReleaseLock(articleid)//for debug
        //判断权限
        const GotPer = await reqGetPermission(this.userInfo.userid,articleid)
        this.state = 1//GotPer.state
        if (this.state == 500) {//no permission
          this.$message({
            type: 'info',
            message: '您没有对该文档的访问权限'
          });
          this.$router.replace('/workplace')
        } else if (this.state == 1) {//readonly
          this.myConfig.readonly = true;//设置编辑器组件、提交修改按钮为不可见
          Config.readonly = true;//引入官方配置文件
        }
        //this.myConfig.readonly = true
      }
      
      //获取历史权限设置
      const Got = await reqGetPermissionSetting(this.userid,this.articleid)
      this.state = Got.state//其实两次state含义不同
      // console.log("Got list:")
      // console.log(Got)
      // console.log(Got.teamlist)
      for (let ii in Got.teamlist) {
        this.lastChosen.push(Got.teamlist[ii])//有相关权限的团队id
        //alert(ii)
      }
      
      //alert("Got" + this.lastChosen)
      //读取加入的团队，以设置权限     
      const teams = await reqGetAllTeam(this.userInfo.userid)
      this.options[1].children = teams//options数组是从0开始数的，每个元素包含团队各信息
      this.options[2].children = teams
      console.log("Joined  teams:")
      console.log(this.options[1].children)
      // 根据团队名称，匹配id并保存到teamlist中
      {
        if (this.lastChosen.length == 0) {
          this.selectedOptions = [[0]]
        }
        console.log("len:"+this.lastChosen.length)
        for (var j=0;j<this.lastChosen.length;j++) {//有权限的团队
          var item = this.lastChosen[j]
          console.log("to cmp: "+item)
          for (var i=0;i<teams.length;i++) {//所有加入的团队
            if (teams[i].teamname == item) {
              this.selectedOptions.push([this.state,teams[i].teamid])
              this.teamlist.push(teams[i].teamid)
              //alert(this.selectedOptions)
              //alert(this.teamlist.length)
            }
          }
        }
        console.log("Init cascade box..")
        console.log(this.selectedOptions)
      }
      //延时
      // var time = 500//延时执行，时间1000ms
      // var startTime = new Date().getTime() + parseInt(time, 10);
      // while(new Date().getTime() < startTime) {}
      //读取文档    
      const result = await reqFetch(articleid,this.userInfo.userid)
      var status1 = (result.status)
      if (status1 == 2) {
        this.$message('该文档正在修改，暂时无法访问')
        this.$router.replace('/workplace')
      }
      console.log('reqFetch...')
      console.log(result)
      this.content = result.content
      this.author = result.author
      this.title = result.title
      this.created_time = (result.created_time)
      this.updated_time = (result.updated_time)
      this.authorid = result.authorid
      this.isAuthor = (this.authorid == this.userInfo.userid)
      //console.log(this.content)
      console.log("Editor-fresh loaded.")
     
      //初始化评论区（一定要先执行）
      const Coms = await reqGetComment(articleid)
      this.comments = Coms
      //释放锁，使得查看文档时再次获取
      //const res = await reqReleaseLock(articleid)
      //console.log("框架已释放互斥锁")      
      console.log("Edit loaded:")
      console.log(result)
      //延时
      // var time = 1000//延时执行，时间1000ms
      // var startTime = new Date().getTime() + parseInt(time, 10);
      // while(new Date().getTime() < startTime) {}           
    },
    releaseTest() {
      const {articleid} = this
      const res = reqReleaseLock(articleid)
      console.log("框架已释放互斥锁")
    },
  },
  async mounted () {
    this.fresh(this.userInfo.userid)
  },
  beforeDestroy () {
    //关闭前提交一下修改
    this.change(this.userInfo.userid)
  },
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
  /*line-height: 35px;*/
  font-size: 22px;
  overflow: visible;
  padding: 20px 60px;
  margin-top: -10px;
}

.el-main {
  color: #333;
  background-color: #FFF;
  padding:0px;
  line-height: 20px;
  font-size: 13px;
  margin-top: -20px;
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
  left: -10px;
  top:10px;
  font-size: 15px;
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
  line-height: 20px;
  font-size: 13px;
  /* 为了自动换行 */
  word-break: break-all;
}
.comment_list>li{
  border-bottom: gainsboro 1px dotted;
  padding-left: 10px;
  /* 为了自动换行 */
  word-break: break-all;
}
.article_title{
  width: 30%;
  /*margin: 0px auto;*/
}
.block{
  /*三个小按钮*/
  position: relative;
  left: 300px;
  top:-40px;
}
</style>
