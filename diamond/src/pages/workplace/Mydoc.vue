<template>
    <div>
      <el-row>
        <el-col :span="4" v-for="(createItem, index) in createList" :key="index" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 20px; -webkit-transition-duration:0.3s; -webkit-transition-timing-function:linear; -webkit-transition-delay:0.01s;">
            <CreateArticle :createItem="createItem" />
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>
<script>
  import {mapState,mapActions} from 'vuex'
  import CreateArticle from '../../components/CreateArticle'
  export default {
    name: 'Mydoc',
    data() {
      return {
        currentDate: new Date()
      };
    },
    mounted () {
      this.getCreateList()
    },

    computed:{
      ...mapState(['createList'])
    },
    methods:{
      ...mapActions(['getCreateList']),
    },
    components: {CreateArticle},
  }
</script>

<style scoped>
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
