<template>
    <div>jump to edit page...</div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
    name:'Jump',
    data(){
        return{
            articleid:this.$route.params.articleid,
        }        
    },
    computed:{
    ...mapState(['userInfo','likeList','checkArticleInfo'])
  },
    methods:{
        ...mapActions(['getLikeList','getGarbageList','getCreateList','getCurrentList','recordCreateList',
    'recordArticleInfo','getArticleInfo','getArticleInfoRead']),
        async handleTo(){
            if(this.articleid) {
                await this.$store.dispatch('getArticleInfoRead',this.articleid)
            }
                this.fresh()
        },
        async fresh() {
            //判断是否登录
            if (!this.userInfo.userid) {//未登录
                this.$message({
                type: 'info',
                message: '请先登录'
                });
                this.$router.replace('/login')
            }          
            //判断权限
            const GotPer = await reqGetPermission(this.userInfo.userid, this.checkArticleInfo.articleid)
            console.log('GotPer')
            console.log(GotPer.state)
            if (GotPer.state == 500) {//no permission
                this.$message({
                type: 'info',
                message: '您没有对该文档的访问权限'
                });
                this.$router.replace('/workplace')
            } else if (GotPer.state == 1) {//readonly
                this.$router.replace('/editRead')
            }
            else{
                this.$router.replace('/edit')
            }
        },
    },
    mounted() {
        this.handleTo();
    }
}
</script>

<style scoped>

</style>