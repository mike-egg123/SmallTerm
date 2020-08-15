<template>
  <div>
    <DiamondHeader title="金刚石文档">
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
      <div class="doc_info" slot="right">
        文档创建者&nbsp;:&nbsp;<li>{{author}}</li>
        <br>
        <br>
        创建时间&nbsp;:&nbsp;<li>{{formatDate(created_time)}}</li>&nbsp;&nbsp;&nbsp;&nbsp;
        <br>
        <br>
        修改时间&nbsp;:&nbsp;<li>{{formatDate(updated_time)}}</li>&nbsp;&nbsp;
      </div>
      <div class="person_wrap" slot="right">
        <el-tooltip class="item" effect="dark" content="收藏" placement="bottom-start"><el-button icon="el-icon-star-on" circle type="warning"></el-button></el-tooltip>
        <el-tooltip class="item" effect="dark" content="分享" placement="bottom-start"><el-button icon="el-icon-share" circle type="primary" @click="link"></el-button></el-tooltip>
        <el-tooltip class="item" effect="dark" content="添加评论" placement="bottom-start"><el-button icon="el-icon-chat-line-round" circle type="success" @click="newcomment"></el-button></el-tooltip>      
      </div>
    </DiamondHeader>
    <el-container>
      <el-aside width="78%">
        <editor ></editor>
      </el-aside>
      <el-main>
        <ul class="comment_list">
          <li v-for="(comment,index) in comments" style="padding: 10px;">
            <div style="text-align: left; font-size: 18px;font-weight: bold;padding-top: 5px;padding-bottom: 5px;color: #409EFF">{{comment.username}}</div>
            <div style="text-align: left; padding-left: 10px;padding-top: 5px;padding-bottom: 5px">{{comment.content}}</div>
            <div style="text-align: right;padding-top: 5px;">{{formatDate(comment.created)}}</div>
          </li>
        </ul>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import DiamondHeader from '../../components/DiamondHeader'
  import Editor from '../Editor/Editor'
  import { reqGetComment,reqAddComment, reqFetch, reqUpdate } from '../../api'
  export default {
    name: 'Edit',
    components: {Editor, DiamondHeader},
    data(){
      return{
        comments:[],
        select:false,
        input:'',
        articleid:this.$route.params.articleid,
        userid:"37",//
        author:"",
        created_time:"",
        updated_time:"",
        invitelink:"",
      }
    },
    methods:{
      goTo_PersonInfo(){
        this.$router.replace('/personInfo')
      },
      copyLink () {       
        this.$copyText(this.invitelink).then(
        function(e) {
            console.log('复制链接为: ' + e.text)
        })
      },
      onCopy: function (e) {
        console.log('本文档链接为: ' + e.text)
      },
      onError: function (e) {
        console.log('复制失败')
      },
      link() {
        this.invitelink = location.href.replace(this.$route.path+this.$route.params,'');
        this.$alert('请通过复制链接来分享文档'+this.invitelink , '分享', {
          confirmButtonText: '复制链接',
          callback: action => {
            this.copyLink();
            this.$message({
              type: 'success',
              message: `链接已复制到剪贴板`
            });
          }
        });
      },
      newcomment() {
        this.$prompt('请输入评论', '评论该文档', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if (value.length === 0 || value === null) {
            alert("评论不能为空");
          } else {
            this.addComment(value);
            this.$message({
              type: 'success',
              message: '评论成功！'
            });
          }                 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消评论'
          });
        });
      },
      async addComment(value) {
        const {articleid,userid} = this
        const result3 = await reqAddComment(articleid,userid,value)
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
      //为了在外壳获取到文章信息，change一定要放在fresh之前
      async change(result) {
        const result2 = await reqUpdate(result.articleid,this.userid,result.title,
          "6",result.permission)
      },
      async fresh() {
        const {userid,articleid} = this
        //初始化评论区（一定要先执行）
        const CC = await reqGetComment(articleid)
        console.log("comments: " + CC)
        this.comments = CC
        //初始化文档信息
        const result1 = await reqFetch(articleid,userid)
        this.author = result1.author
        this.created_time = (result1.created_time)
        this.updated_time = (result1.updated_time)
        console.log("Edit loaded:")
        console.log(result1)
        //提交一次，重新获取互斥锁
        var time = 1000//延时执行，时间1000ms
        var startTime = new Date().getTime() + parseInt(time, 10);
        while(new Date().getTime() < startTime) {}
        this.change(result1)
      },
    },
    async mounted () {
      this.fresh()
      const {articleid} = this
      
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
