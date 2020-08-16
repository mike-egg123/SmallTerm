<template>
  <div>
    <div class="article_title">
      <el-input type="text" placeholder="请输入文档标题" v-model="title" maxlength="10" show-word-limit ></el-input>
      <div class="block" style="display: inline-block">
        <el-cascader :options="options" :props="props" collapse-tags clearable ></el-cascader>
      </div>
    </div>
    <vue-ueditor-wrap v-model="content" :config='myConfig'>
      <VueUeditorWrap/>
    </vue-ueditor-wrap>
    <br>
    <el-button @click="create()" round type="success">创建</el-button>
    <!-- <el-button @click="fresh()" round type="primary">查看</el-button> -->
    <el-button @click="change()" round type="warning">提交修改</el-button>    
    <el-button>编辑器读取成功：{{userInfo.avatar}}</el-button>
    <!-- <button onclick="setDisabled()" disabled="true">不可编辑</button>  -->
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import { mapGetters, mapActions, mapState } from 'vuex'
import { reqStore, reqCreate, reqFetch, reqUpdate,reqReleaseLock } from '../../api'

export default {
  name: 'Editor',
  components: {
    VueUeditorWrap
  },
  data () {
  return {
    result:"",
    userid:this.userInfo.userid,
    title: "",//
    author:"",
    permission: 0,//
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
    props: { multiple: true },
    //需要接口
    options: [
      {
        value: 0,
        label: '仅自己可见',
      },
      {
        value:1,
        label: '团队可见',
        children: [{
            label: '团队1',
        },
        {
          label: '团队2',
      }]
    },
      {
        value:2,
        label: '团队可见且可编辑',
        children: [{
          label: '团队1',
        },
          {
            label: '团队2',
          }]
      },
    ],          
  }},
  computed:{
    ...mapState(['userInfo']),
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['getUserInfo']),
    //创建新文档
    async create () {
      const {userid,title,content,permission} = this
      const result = await reqCreate(userid,title,content,permission)
      console.log(result)
    },
    //编辑文档并提交
    async change() {
      const {articleid,userid,title,content,permission} = this
      const result = await reqUpdate(articleid,userid,title,content,permission)
      console.log("One update to: " + this.articleid)
    },
    //读取文档，注意调用关系，因此需要放在change之后
    async fresh () {
      //延时
      var time = 1000//延时执行，时间1000ms
      var startTime = new Date().getTime() + parseInt(time, 10);
      while(new Date().getTime() < startTime) {}
      const {articleid,userid} = this
      const result = await reqFetch(articleid,userid)
      this.content = result.content
      this.title = result.title
      console.log(result)
      console.log("Editor loaded")
      console.log(this.content)
      //this.releaseTest()
      const res = reqReleaseLock(articleid)
      console.log("编辑器释放互斥锁")
    },
  },
  mounted () {
    this.fresh();
    console.log("Finish")  
  },
  beforeDestroy () {
    this.change()
  },
  destroyed() {
    this.change()
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
