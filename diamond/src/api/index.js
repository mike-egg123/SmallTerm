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
获取评论
 */
export const reqGetComment = (articleid) => ajax('/apis/comment/getbyarticleid',{
  articleid
},'POST')

/*
发表评论
 */
export const reqAddComment = (articleid,userid,content) => ajax('apis/comment/post',{
  articleid,userid,content
},'POST')

/*
释放互斥锁
 */
export const reqReleaseLock = (articleid) => ajax('apis/article/releaselock',{
  articleid
},'POST')