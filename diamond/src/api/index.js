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

//创建、修改、查看文档没有写


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
获取所有收藏
 */
export const reqGetAllLikesArticle = (userid) => ajax('/apis/article/getalllikes',{userid},'POST')

/*
获取所有创建
 */
export const reqGetAllCreateArticle = (userid) => ajax('/apis/article/getallcreations',{userid},'POST')

/*
获取回收站文档
 */
export const reqGetGarbageArticle = (userid) => ajax('/apis/article/getallcreationsingarbage',{userid},'POST')

/*
改变文档修改状态
 */
export const reqUpdatingcodeArticle = (updatingcode,articleid) => ajax('/apis/article/updatingcodechange',{
  updatingcode,articleid
},'POST')
