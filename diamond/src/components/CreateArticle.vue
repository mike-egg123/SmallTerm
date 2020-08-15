<template>
  <div>
    <router-link to="/edit">
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597145866902&di=832fbb88637a7e41c778cdb9a8d8d0d3&imgtype=0&src=http%3A%2F%2Fimg12.360buyimg.com%2Fn1%2Fjfs%2Ft17584%2F253%2F2043472217%2F52049%2F6f4f6993%2F5ae1354bN57b15f6e.jpg"  alt="word" class="image">
    </router-link>
    <div style="padding: 20px;">
      <span  style="display: inline-block; white-space: nowrap; width: 100%; overflow: hidden; text-overflow:ellipsis;">{{createItem.title}}</span>
      <div class="bottom clearfix">
        <time class="time">这里放什么时间？</time>
        <br>
        <br>
        <el-tooltip class="item" effect="dark" content="收藏" placement="bottom-start" v-if="!createItem.islike">
          <el-button type="warning" plain icon="el-icon-star-off" circle @click="handleLike" size="mini"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="取消收藏" placement="bottom-start" v-else>
          <el-button type="warning" icon="el-icon-star-off" circle @click="handleLike" size="mini"></el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="删除" placement="bottom-start">
          <el-button type="danger" icon="el-icon-delete" circle @click="handleGarbage" size="mini"></el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import {reqLikeornotArticle,reqDeleteArticle} from '../api'
export default {
  name: "CreateArticle",
  props:{
    createItem:Object,
  },
  data:function (){
    return{
      currentDate: new Date(),
    }
  },
  computed:{
    ...mapState(['userInfo','likeList'])
  },
  mounted () {
    this.recordCreateList()
  },
  methods:{
    ...mapActions(['getLikeList','getGarbageList','getCreateList','getCurrentList','recordCreateList']),
    //点击收藏按钮
    handleLike(){
      this.createItem.islike=!this.createItem.islike
      if(this.createItem.islike){//收藏
        //调用收藏接口，修改数据库收藏列表
        const result=reqLikeornotArticle(this.userInfo.userid,this.createItem.articleid,true)
        //更新state中的收藏列表
        setTimeout(() => {
          this.getLikeList();
          //更新自己创建的文档列表
          this.getCreateList()
          //更新回收站列表
          this.getGarbageList()
          //更新浏览列表
          this.getCurrentList()
        },500)
      }
      else{//取消收藏
        //调用收藏接口，修改数据库收藏列表
        const result=reqLikeornotArticle(this.userInfo.userid,this.createItem.articleid,false)
        //更新state中的收藏列表
        setTimeout(() => {
          this.getLikeList();
          //更新自己创建的文档列表
          this.getCreateList()
          //更新回收站列表
          this.getGarbageList()
          //更新浏览列表
          this.getCurrentList()
        },500)
        console.log(this.likeList.length)
      }
    },
    //处理删除
    handleGarbage() {
      this.$alert('确定删除该文档吗？', '删除文档', {
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
        const result=reqDeleteArticle(this.createItem.articleid)
        console.log(result)
        setTimeout(() => {
          //更新创建文档列表
          this.getCreateList()
          //如果收藏，从收藏列表中删除
          //更新state中的收藏列表
          this.getLikeList();
          //更新回收站列表
          this.getGarbageList()
          //更新浏览列表
          this.getCurrentList()
        },500)
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
