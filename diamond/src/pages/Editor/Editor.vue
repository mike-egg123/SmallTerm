<template>
  <div>
    <vue-ueditor-wrap v-model="content" :config='myConfig'>
      <VueUeditorWrap/>
    </vue-ueditor-wrap>
    <br>
    <el-button @click="create()" round type="success">create</el-button>
    <el-button @click="fresh()" round type="primary">view</el-button>
    <el-button @click="change()" round type="warning">change</el-button>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import { reqStore, reqCreate, reqFetch, reqUpdate } from '../../api'

export default {
  name: 'Editor',
  components: {
    VueUeditorWrap
  },
  data () {
    return {
      userid: "37",//
      title: "rcyTest",//
      permission: 0,//
      articleid: "37",//
      content: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>默认文本</h2>',
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 310,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: 'http://35.201.165.105:8000/controller.php',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/static/UEditor/'
      }
    }},
  methods: {
    //创建新文档
    async create () {
      const {userid,title,content,permission} = this
      const result = await reqCreate(userid,title,content,permission)
      this.articleid = result.articleid
      //console.log(result)
    },
    //读取文档
    async fresh () {
      const {userid,articleid} = this
      const result = await reqFetch(userid,articleid)
      this.content = result.content
      //console.log(this.articleid + ": " + this.content)
    },
    //编辑文档并提交
    async change() {
      const {articleid,userid,title,content,permission} = this
      const result = await reqUpdate(articleid,userid,title,content,permission)
      //console.log(result)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet">

</style>
