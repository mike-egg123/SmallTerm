<template>
  <div>
    <router-link to="/edit">
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597145866902&di=832fbb88637a7e41c778cdb9a8d8d0d3&imgtype=0&src=http%3A%2F%2Fimg12.360buyimg.com%2Fn1%2Fjfs%2Ft17584%2F253%2F2043472217%2F52049%2F6f4f6993%2F5ae1354bN57b15f6e.jpg"  alt="word" class="image">
    </router-link>
    <div style="padding: 20px;">
      <span>{{currentItem.title}}</span>
      <div class="bottom clearfix">
        <time class="time">{{ currentDate }}</time>
        <br>
        <br>
        <el-tooltip class="item" effect="dark" content="收藏" placement="bottom-start" v-if="!currentItem.islike">
          <el-button type="warning" plain icon="el-icon-star-off" circle @click="handleCurrent"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="取消收藏" placement="bottom-start" v-else>
          <el-button type="warning" icon="el-icon-star-off" circle @click="handleCurrent"></el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import {reqLikeornotArticle} from '../api'
export default {
  name: "CurrentArticle",
  props:{
    currentItem:Object,
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
    ...mapActions(['getLikeList','getGarbageList','getCreateList','getCurrentList',]),
    handleCurrent(){
      this.getCurrentList()
      this.currentItem.islike=!this.currentItem.islike
      if(this.currentItem.islike){//收藏
        //调用收藏接口，修改数据库收藏列表
        const result=reqLikeornotArticle(this.userInfo.userid,this.currentItem.articleid,true)
        //更新state中的收藏列表
        setTimeout(() => {
          this.getLikeList()
          //更新回收站列表
          this.getGarbageList()
          //更新创建列表
          this.getCreateList()
          //更新浏览列表
          this.getCurrentList()
        },200)

      }
      else{//取消收藏
        //调用收藏接口，修改数据库收藏列表
        const result=reqLikeornotArticle(this.userInfo.userid,this.currentItem.articleid,false)
        //更新state中的收藏列表
        setTimeout(() => {
          this.getLikeList()
          //更新回收站列表
          this.getGarbageList()
          //更新创建列表
          this.getCreateList()
          //更新浏览列表
          this.getCurrentList()
        },200)
        console.log(this.likeList.length)
      }
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
