'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {

  /**
   * 登录页
   */
  async Login() {
    const { ctx } = this;
    await ctx.render('Login.njk' , { title: '登录' }); // title用于显示在浏览器标签中
  }

  /**
   * 登录接口
   * TO DO 密码加密
   */
  async LoginApi() {
    const { ctx } = this;
    var ReqData = ctx.request.body;
    console.log("登录接口参数ReqData:",ReqData);
    var LoginResult = await ctx.service.account.GetClubInfoByAccount(ReqData.club_account);
    console.log("登录接口LoginResult:",LoginResult);
    if(!LoginResult){
      await ctx.render('Login.njk', { title: "登录" , msg: "账号不存在" });
    }else if(LoginResult.error){
      await ctx.render('Login.njk', { title: "登录" , msg: "系统错误" });
    }else if(LoginResult.club_account != ReqData.club_account || LoginResult.club_password != ReqData.club_password){
      await ctx.render('Login.njk', { title: "登录" , msg: "密码错误" });
    }else{
      ctx.session.club_id = LoginResult.club_id;
      ctx.session.club_name = LoginResult.club_name;
      ctx.session.club_account = LoginResult.club_account;
      ctx.session.club_logo = LoginResult.club_logo;
      ctx.redirect('/');
    }
  }
}

module.exports = AccountController;