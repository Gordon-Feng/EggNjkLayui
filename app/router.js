'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.index.Index);//首页(用于嵌套iframe)
  router.get('/login', controller.account.Login);//登录页
  router.post('/login', controller.account.LoginApi);//登录接口
  router.get('/club', controller.club.ClubInfo);//社团详情页
};
