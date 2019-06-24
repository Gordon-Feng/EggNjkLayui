'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {

  /**
   * 登录页
   */
  async login() {
    const { ctx } = this;
    await ctx.render('Login.njk' , { title: '登录' }); // title用于显示在浏览器标签中
  }

  /**
   * 登录接口
   */
  async loginApi() {
    const { ctx } = this;
    
  }
}

module.exports = AccountController;