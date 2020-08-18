export default {
  userInfo: {userid:38}, // 用户信息
  otherUserInfo:{}, //用于查看其他用户信息
  currentList: [], //最近浏览文档列表
  likeList:[] ,//收藏文档列表
  createList:[], //自己创建的文档列表
  garbageList:[], //在垃圾桶的文档列表
  myTeamList:[], //我加入的所有团队的列表
  myCreateTeamList:[], //我创建的所有团队的列表
  checkTeamInfo:{}, //某个团队信息
  checkTeamMemberList:[], //查看某个团队成员
  teamArticleList:[], //某个团队的所以文档
  userList:[],//全局搜索的用户列表
  teamList:[],//全局搜索的团队列表
  articleList:[],//全局搜索的文档列表
  keyword:{},//全局搜索的关键词
  teamMessageList:[] ,//团队消息通知列表
  commentMessageList:[],//评论消息通知列表
  privateMessageList:[],//接收私信列表
  front:0,//用于翻页
  count:5,//用于翻页
}
