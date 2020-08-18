<template>
    <div>
      <router-link to="/edit">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597145866902&di=832fbb88637a7e41c778cdb9a8d8d0d3&imgtype=0&src=http%3A%2F%2Fimg12.360buyimg.com%2Fn1%2Fjfs%2Ft17584%2F253%2F2043472217%2F52049%2F6f4f6993%2F5ae1354bN57b15f6e.jpg"  alt="word" class="image">
      </router-link>
      <div style="padding: 20px;">
        <span  style="display: inline-block; white-space: nowrap; width: 100%; overflow: hidden; text-overflow:ellipsis">{{article.title}}</span>
        <div class="bottom clearfix">
          <time class="time">作者：{{article.author}}</time>
          <br>
          <br>
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    name: 'Article_result',
    props:{
      article:Object
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
