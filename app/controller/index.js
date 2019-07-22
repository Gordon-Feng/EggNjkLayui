'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {

  /**
   * 首页(用于嵌套iframe)
   */
  async Index() {
    const { ctx } = this;
    if(!ctx.session.club_account){
      await ctx.redirect('/login');
    }else{
      await ctx.render('Index.njk' , { 
        title: '首页' , 
        img_host: process.env.IMG_HOST ,
        account_info: { club_name: ctx.session.club_name, club_account: ctx.session.club_account, club_logo: ctx.session.club_logo } 
      }); // title用于显示在浏览器标签中
    }
  }
}

module.exports = IndexController;
