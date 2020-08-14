<template>
  <form class="Info_wrap" id="info_wrap">
    <div class="Info_title">请完善个人信息</div>
    <div class="Info_name">
      <span>昵称</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model="name" readonly>
    </div>
    <div class="Info_email">
      <span>邮箱</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="email" v-model="email" readonly>
    </div>
    <div class="Info_pwd">
      <span>密码</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="password" v-model="pwd1" readonly>
    </div>
    <div class="Info_phone">
      <span>电话</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model="phone">
    </div>
    <div class="Info_bio">
      <span>个人简介</span>&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;<input type="text" v-model="bio">
    </div>
    <div class="Info_img">
      &nbsp;&nbsp;&nbsp;&nbsp;<div>上传头像</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-upload
        action="#"
        list-type="picture-card"
        :http-request="httpRequest"
        :before-upload="beforeUpload"
      >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}" id="imgFile">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
    <el-button id="btn" type="primary" round style="width: 200px;" @click="infoSubmit">提交</el-button>
  </form>
</template>
<script>

export default {
  name: 'CompleteInfo',
  props:{
    name:String,
    email:String,
    pwd1:String
  },
  data:function (){
    return{
      phone:'',
      bio:'',
      avatar:'',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      file:{},
      file1:{},
      file2:{}
    }
  },
  methods:{
    beforeUpload(file){
      this.file2=file
      console.log(this.file2)
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    httpRequest(e) {
      this.file1 = e.file;
    },
    infoSubmit(){
      this.file=document.getElementById('imgFile')
      console.log("file")
      console.log(this.file)
      console.log("file1")
      console.log(this.file1)
      this.$emit('infoSubmit',this.phone,this.bio,this.file,this.file1)
    }
  }
}
</script>

<style scoped rel="stylesheet">
  .Info_wrap{
    background-color: #fff;
    position: absolute;
    top: 150px;
    left: 350px;
    width: 560px;
    height: 610px;
    border-radius: 10px;
    border: #AAD3FE 2px solid;
  }
  .Info_title{
    margin-top: 30px;
    font-size:20px;
    letter-spacing: 1.5px;
    font-weight: bolder;
  }
  .Info_wrap span{
    font-weight: bold;
    font-size: 17px;
    letter-spacing: 1px;
  }
  .Info_img{
    display: flex;
    margin-bottom: 30px;
  }
  .Info_img div{
    font-weight: bold;
    font-size: 17px;
    letter-spacing: 1px;
  }
  .Info_name input{
    margin-top: 20px;
  }
  .Info_name input,.Info_pwd input,.Info_email input,.Info_phone input,.Info_bio input{
    outline: none;
    margin-bottom: 20px;
    width: 400px;
    height: 40px;
    border-radius: 10px;
    border: lightgray 1px solid;
    padding-left: 10px;
  }
</style>
