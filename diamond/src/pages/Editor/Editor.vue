<template>
  <div>    
    <vue-ueditor-wrap v-model="msg" :config='myConfig'>
      <VueUeditorWrap/>
    </vue-ueditor-wrap>
    <button @click="create()">submit</button>
    <button @click="fresh()">fetch</button>
    <p>上面应该显示刚才编辑好的内容</p>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import { reqStore, reqCreate, reqFetch } from '../../api'

export default {
  name: 'Editor',
  components: {
    VueUeditorWrap
  },
  data () {
  return {
    userid: "28",
    title: "rcyTest",
    articleid: "52",
    msg: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>默认文本</h2>',
    myConfig: {
      // 编辑器不自动被内容撑高
      autoHeightEnabled: false,
      // 初始容器高度
      initialFrameHeight: 240,
      // 初始容器宽度
      initialFrameWidth: '100%',
      // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
      serverUrl: 'http://35.201.165.105:8000/controller.php',
      // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
      UEDITOR_HOME_URL: '/static/UEditor/'
    }
  }},
  methods: {
    async create () {
      const {userid,title,msg} = this
      const result = await reqCreate(userid,title,msg)
      this.articleid = result.articleid
      console.log(result)    
    },
    async fresh () {
      const {articleid} = this
      alert(this.articleid)  
      const result = await reqFetch(this.articleid)
      this.msg = result.content
      console.log(this.msg)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet">

</style>
