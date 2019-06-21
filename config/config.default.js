/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
const fs = require('fs');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 用于cookie的签名密钥，应改为您自己的并保持安全
  config.keys = appInfo.name + '_1561105314613_6960';

  // 在这里添加中间件配置
  config.middleware = [];

  // 配置项目启动的端口
  config.cluster = {
    listen: {
      port: 8080
    }
  };

  // 配置session
  config.session = {
    key: 'egg_njk',
    maxAge: 1800 * 1000,
    httpOnly: true,
    enctypt: true,
    renew: true
  };

  // 设置安全插件
  config.security = {
    csrf: {
      useSession: false,
      enable: false,
      ignoreJSON: false,
      cookieName: 'csrfToken',
      sessionName: 'csrfToken',
      headerName: 'x-csrf-token',
      bodyName: '_csrf',
      queryNAme: '_csrf'
    },
    domainWhiteList: ['http://localhost:8081']
  }

  // 配置跨域
  config.cors = {
    origin: "*",
    allowMethods: 'GET,HEADER,PUT,POST,DELETE,PATCH',
    credentials: true
  }

  // 设置网站图标
  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/favicon.ico'))
  };

  // 设置静态资源地址
  config.static = {
    prefix: '/',
    dir: ['app/public/layuiAdmin','app/public/static']
  };

  // 设置模板
  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view')
    ].join(','),
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.njk': 'nunjucks'
    }
  };

  // 在这里添加用户配置
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
