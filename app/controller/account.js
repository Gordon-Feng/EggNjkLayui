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
   */
  async LoginApi() {
    const { ctx } = this;
    var ReqData = ctx.request.body;
    console.log("登录接口参数ReqData:",ReqData);
    var LoginResult = await ctx.service.account.GetClubInfoByAccount(ReqData.club_account);
    console.log("登录接口LoginResult:",LoginResult);
    if(!LoginResult){
      ctx.body = {
        status: -200, data: "", msg: "账号不存在"
      };
    }else{
      ctx.body = {
        status: 200, data: LoginResult, msg: "登录成功"
      };
    }
  }
}

module.exports = AccountController;