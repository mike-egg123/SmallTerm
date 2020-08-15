/*
与后台交互模块
 */
import ajax from './ajax'
/**
 * 账号密码登录
 */
const MY_URL='http://182.92.239.145'
export const reqPwdLogin = (username, password) => ajax('/apis/user/login', {
  username,password
}, 'POST')

/*
获取用户登录状态
 */
export const reqGetStatus = () => ajax('/apis/user/getstatus' )

/*
用户注册
 */
export const reqPwdRegister = (username ,email ,password) => ajax('/apis/user/register',{
  username ,email ,password
},'POST')

/*
用户退出
 */
export const reqPwdLogout = () => ajax('/apis/user/logout')

/*
修改个人信息
 */
export const reqChange = (formData) => ajax('/apis/personality/change',formData,'POST')

/*
查看个人信息
 */
export const reqGet = (formData) => ajax('/apis/personality/get',formData,'POST')

/*
创建在线文档
 */
export const reqCreate = (userid,title,content,permission) => ajax('/apis/article/create',{
  userid,title,content,permission
},'POST')

/*
查看文档
 */
export const reqFetch = (articleid,userid) => ajax('/apis/article/get',{
  articleid,userid
},'POST')

/*
修改文档
 */
export const reqUpdate = (articleid,userid,title,content,permission) => ajax('/apis/article/update',{
  articleid,userid,title,content,permission
},'POST')

/*
  删除文档
 */
export const reqDeleteArticle = (articleid) => ajax('/apis/article/delete',{articleid},'POST')

/*
发表评论
 */
export const reqCommentPost = (articleid,userid,content) => ajax('/apis/comment/post',{
  articleid,userid,content
},'POST')

/*
获取对某文档的所有评论
 */
export const reqGetAllComment = (articleid) => ajax('/apis/comment/getbyarticleid',{articleid},'POST')

/*
恢复文档
 */
export const reqRecoverArticle = (articleid) => ajax('/apis/article/recover',{articleid},'POST')

/*
文档收藏与否
islike  0取消收藏 1收藏
 */
export const reqLikeornotArticle = (userid,articleid,islike) => ajax('/apis/article/likeornot',{
  userid,articleid,islike
},'POST')

/*
获取最近浏览的文档
 */
export const reqGetRecentArticle = (userid) => ajax('/apis/article/getrecentwatch',{userid},'POST')

/*
获取最近浏览的文档（异步）
 */
export const reqGetRecentArticleYi = () =>ajax('/apis/article/getrecentwatchYi',{},'POST')

/*
获取所有收藏
 */
export const reqGetAllLikesArticle = (userid) => ajax('/apis/article/getalllikes',{userid},'POST')

/*
获取所有收藏（异步）
 */
export const reqGetAllLikesArticleYi = () => ajax('/apis/article/getalllikesYi',{},'POST')

/*
获取所有创建
 */
export const reqGetAllCreateArticle = (userid) => ajax('/apis/article/getallcreations',{userid},'POST')

/*
获取所有创建（异步）
 */
export const reqGetAllCreateArticleYi = () =>ajax('/apis/article/getallcreationsYi',{},'POST')

/*
获取回收站文档
 */
export const reqGetGarbageArticle = (userid) => ajax('/apis/article/getallcreationsingarbage',{userid},'POST')

/*
获取回收站文档
 */
export const reqGetGarbageArticleYi = () => ajax('/apis/article/getallcreationsingarbageYi',{},'POST')

/*
改变文档修改状态
 */
export const reqUpdatingcodeArticle = (updatingcode,articleid) => ajax('/apis/article/updatingcodechange',{
  updatingcode,articleid
},'POST')

/*
获取登录验证码
 */
export const reqGetValidCode = () => ajax('/apis/user/getvalidcode','','POST')

/*
创建团队
 */
export const reqCreateTeam = (teamname,userid) => ajax('/apis/workplace/createteam', {teamname,userid},'POST')

/*
加入团队
 */
export const reqJoinTeam = (teamid,userid) => ajax('/apis/workplace/jointeam',{teamid,userid},'POST')

/*
退出团队
 */
export const reqExitTeam = (userid,teamid) => ajax('/apis/workplace/exitteam',{userid,teamid},'POST')

/*
解散团队
 */
export const reqDisband = (teamid) => ajax('/apis/workplace/disband',{teamid},'POST')

/*
获取全部加入的团队
 */
export const reqMyJoinTeam = (userid) => ajax('/apis/workplace/myjointeam',{userid},'POST')

/*
获取全部加入的团队（异步）
 */
export const reqMyJoinTeamYi = () => ajax('/apis/workplace/myjointeamYi',{},'POST')

/*
获取某个团队的所有成员
 */
export const reqGetTeamMember = (teamid) => ajax('/apis/workplace/getteammember',{teamid},'POST')

/*
获取某个团队的所有文档
 */
export const reqGetAllArticles = (teamid) => ajax('/apis/workplace/getallarticles',{teamid},'POST')

/*
获取创建的所有团队
 */
export const reqMyCreateTeam = (userid) => ajax('/apis/workplace/mycreateteam',{userid},'POST')

/*
获取创建的所有团队（异步）
 */
export const reqMyCreateTeamYi = () => ajax('/apis/workplace/mycreateteamYi',{},'POST')

/*
获取团队信息
 */
export const reqTeamInfo = (teamid) => ajax('/apis/workplace/getteaminfo',{teamid},'POST')

/*
全局搜索用户
 */
export const reqSearchUser = (keyword) => ajax('/apis/search/users',{keyword},'POST')
