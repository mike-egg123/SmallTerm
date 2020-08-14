<template>
    <div style="text-align: left;padding: 50px">
      <el-row>
        创建新文档：<el-button type="primary" @click="handleCreate">点击创建</el-button>
      </el-row>
      <br>
      <br>
      <el-row>
        上传文档：
        <br>
        <br>
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          accept="doc docx"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
<!--          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>
      </el-row>
    </div>
</template>
<script>
  export default {
    name: 'Newdoc',
    methods:{
      handleCreate(){
        this.$router.replace('/edit')
      }
    }
  }
</script>

<style scoped>

</style>
