<template>
  <div>
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597145866902&di=832fbb88637a7e41c778cdb9a8d8d0d3&imgtype=0&src=http%3A%2F%2Fimg12.360buyimg.com%2Fn1%2Fjfs%2Ft17584%2F253%2F2043472217%2F52049%2F6f4f6993%2F5ae1354bN57b15f6e.jpg"  alt="word" class="image">
    <div style="padding: 20px;">
      <span>{{garbageItem.title}}</span>
      <div class="bottom clearfix">
        <time class="time">{{ currentDate }}</time>
        <br>
        <br>
        <el-tooltip class="item" effect="dark" content="恢复" placement="bottom-start">
          <el-button type="success" icon="el-icon-refresh" circle @click="handleGarbage"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="bottom-start">
          <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete"></el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import {reqDeleteArticle, reqLikeornotArticle, reqRecoverArticle} from '../api'
export default {
  name: 'GarbageArticle',
  props:{
    garbageItem:Object,
  },
  data:function (){
    return{
      currentDate: new Date(),
    }
  },
  computed:{
    ...mapState(['userInfo','likeList'])
  },
  methods:{
    ...mapActions(['getLikeList','getGarbageList','getCreateList','getCurrentList']),
    //从垃圾箱恢复
    handleGarbage(){
      //调用恢复接口
      reqRecoverArticle(this.garbageItem.articleid)
      //更新回收站列表
      this.getGarbageList()
      //更新创建列表
      this.getCreateList();
      //更新收藏列表
      this.getLikeList();
      //更新浏览列表
      this.getCurrentList();
    },
    //彻底删除
    handleDelete(){
      //调用彻底删除接口
      this.$alert('确定彻底删除该文档吗？', '彻底删除文档', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        //调用删除接口，删除文档，提交给数据库

        //从自己的创建文档列表删除
        const result=reqDeleteArticle(this.garbageItem.articleid)
        //更新回收站列表
        this.getGarbageList()
        //更新创建列表
        this.getCreateList();
        //更新收藏列表
        //reqLikeornotArticle(this.userInfo.userid,this.createItem.articleid,false)
        this.getLikeList();
        //更新浏览列表
        this.getCurrentList();

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet">
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
  margin-top: 8px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

</style>
