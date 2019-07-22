'use strict';

const Controller = require('egg').Controller;

class ClubController extends Controller {

  /**
   * 社团详情页
   */
  async ClubInfo() {
    const { ctx } = this;
    if(!ctx.session.club_account){
      ctx.body = '请退出重新登录';
    }else{
      var ClubInfo = await ctx.service.account.GetClubDetailById(ctx.session.club_id);
      console.log("获取社团详细信息ClubInfo:",ClubInfo);
      await ctx.render('ClubInfo.njk' , { 
        title: '社团信息' , 
        img_host: process.env.IMG_HOST ,
        club_info: ClubInfo , 
      }); // title用于显示在浏览器标签中
    }
  }
}

module.exports = ClubController;
