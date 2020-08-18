<!-- 已经完全合并到Edit中，可以删除 -->
<template>
  <div>
    <div class="article_title">
      <el-input type="text" placeholder="请输入文档标题" v-model="title" maxlength="10" show-word-limit ></el-input>
      <!-- 文档权限管理，仅限作者本人 -->
      <div class="block" style="display: inline-block" v-show="isAuthor">
        设置新权限：
        {{this.selectedOptions}}
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
    <el-button @click="change()" round type="warning">提交修改</el-button>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import { mapGetters, mapActions, mapState } from 'vuex'
import { reqStore, reqCreate, reqFetch, reqUpdate,
  reqReleaseLock, reqGetPermission, reqSetPermission, reqGetAllTeam,
  reqGetPermissionSetting } from '../../api'

export default {
  name: 'Editor',
  components: {
    VueUeditorWrap
  },
  data () {
    return {
      title: "",
      author:"",
      authorid:"",
      isAuthor:false,//true:作者本人,能够修改文档权限
      permission0: 0,//临时存储查询权限的结果
      permission:0,//为了正常提交修改
      state:"",//0为私有文档，1为团队只读，2为团队可改
      lastChosen:[],//上一次文档权限中的团队teamname列表
      teamlist:[],//拥有文档权限的团队id列表
      articleid: this.$route.params.articleid,//test:26      
      content: '',//'<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>默认文本</h2>',
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
  }},
  computed:{
    ...mapState(['userInfo']),
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['getUserInfo']),
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
            if (s.length == 1) {
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
              console.log(teamlist)
              var item
              for (item in this.selectedOptions) {//这样访问是有问题的
                teamlist.push(item[1]);
                console.log(item[1])
              }
              
              const result1 = await reqSetPermission(this.userInfo.userid,this.state,this.articleid,teamlist)
              console.log("Set permission to: " + this.articleid)             
            }
        }
      }
    },
    //根据团队名称，匹配id并保存到teamlist中
    async transTeam () {
      if (this.lastChosen.length == 0) {
        this.selectedOptions = [[0]]
      }
      var item//删掉会导致未定义
      for (item in this.lastChosen) {
        for (record in this.options[1].children) {
          if (record.teamname == item) {
            this.selectedOptions.push(record.teamid)
          }
        }
      }
      console.log("Init cascade box...")
      console.log(this.selectedOptions)
    },
    //编辑文档并提交
    async change() {
      //alert("编辑器提交一次: " + this.userInfo.userid)
      //修改标题和内容
      const {articleid,title,content,permission} = this     
      const result = await reqUpdate(articleid,this.userInfo.userid,title,content,permission)
      console.log("One update to: " + this.articleid)
      //修改权限
      await this.changePermission()
      //悬浮提示     
      this.$message({
        type:'success',
        message:'文档保存成功'
      })
    },
    //读取文档
    async fresh () {     
      const {articleid} = this
      //alert("编辑器读取用户: " + this.userInfo.userid)
      //判断是否登录
      if (!this.userInfo.userid) 
      {//未登录
        this.$message({
          type: 'info',
          message: '请先登录'
        });
        this.$router.replace('/login')
      }
      await reqReleaseLock(articleid)
      //判断权限
      const GotPer = await reqGetPermission(this.userInfo.userid,articleid)
      this.state = GotPer.state
      const Got = await reqGetPermissionSetting(this.userid,this.articleid)
      this.lastChosen = Got.teamlist
      if (this.state == 500) {//no permission
        this.$message({
          type: 'info',
          message: '您没有对该文档的访问权限'
        });
        this.$router.replace('/workplace')
      } else if (this.state == 1) {//readonly
        //设置编辑器组件、提交修改按钮为不可见
        //或者导入另一个预览界面
      }
      //延时
      // var time = 500//延时执行，时间1000ms
      // var startTime = new Date().getTime() + parseInt(time, 10);
      // while(new Date().getTime() < startTime) {}
      //读取文档信息     
      const result = await reqFetch(articleid,this.userInfo.userid)
      this.content = result.content
      this.title = result.title
      this.authorid = result.authorid
      this.isAuthor = (this.authorid == this.userInfo.userid)
      console.log(result)
      console.log(this.content)
      console.log("Editor-fresh loaded.")
      //this.releaseTest()
      //for debug
      //const res = reqReleaseLock(articleid)
      //console.log("编辑器释放互斥锁")
      //读取加入的团队，以设置权限
      const teams = await reqGetAllTeam(this.userInfo.userid)
      this.options[1].children = teams//options数组是从0开始数的
      this.options[2].children = teams
      await this.transTeam()
    },
  },
  mounted () {
    this.fresh();
    console.log("Editor-loading finished.")
  },
  beforeDestroy () {
    this.change()
  },
  destroyed() {
    //this.change()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet">
.doc_info>li{
  margin-bottom: 8px;
  display:inline-block;
}
.article_title{
  width: 30%;
  /*margin: 0px auto;*/
}
.block{
  position: relative;
  left: 300px;
  top:-40px;
}
</style>
