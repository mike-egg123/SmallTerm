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
export const reqCreate = (userid,title,content) => ajax('/apis/article/create',{
  userid,title,content
},'POST')

/*
查看文档
 */
export const reqFetch = (articleid) => ajax('/apis/article/get',{articleid},'POST')
