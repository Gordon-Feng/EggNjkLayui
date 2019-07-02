##### 1.新建文件夹```EggNjkLayui``` , 并切换到该目录下 , 输入命令```npm init egg --type=simple``` , 快速生成一个项目.
```
G:\PoorGuy\GitPub\EggNjkLayui>npm init egg --type=simple
npx: 379 安装成功，用时 44.849 秒
[egg-init] use registry: https://registry.npmjs.org
[egg-init] target dir is G:\PoorGuy\GitPub\EggNjkLayui
[egg-init] fetching npm info of egg-init-config
[egg-init] use boilerplate: simple(egg-boilerplate-simple)
[egg-init] fetching npm info of egg-boilerplate-simple
[egg-init] downloading https://registry.npmjs.org/egg-boilerplate-simple/-/egg-boilerplate-simple-3.3.1.tgz
[egg-init] extract to C:\Users\pg\AppData\Local\Temp\egg-init-boilerplate
[egg-init] collecting boilerplate config...
? project name EggNjkLayui
? project description 使用eggjs + nunjucks模板引擎+ Layui框架搭建的后台管理系统骨架
? project author PoorGuy
? cookie security keys 1561105314613_6960
[egg-init] write to G:\PoorGuy\GitPub\EggNjkLayui\.autod.conf.js
[egg-init] write to G:\PoorGuy\GitPub\EggNjkLayui\.eslintignore
[egg-init] write to G:\PoorGuy\GitPub\EggNjkLayui\.eslintrc
[egg-init] write to G:\PoorGuy\GitPub\EggNjkLayui\README.md
[egg-init] write to G:\PoorGuy\GitPub\EggNjkLayui\.gitignore
[egg-init] write to G:\PoorGuy\GitPub\EggNjkLayui\package.json
[egg-init] write to G:\PoorGuy\GitPub\EggNjkLayui\app\router.js
[egg-init] write to G:\PoorGuy\GitPub\EggNjkLayui\config\config.default.js
[egg-init] write to G:\PoorGuy\GitPub\EggNjkLayui\config\plugin.js
[egg-init] write to G:\PoorGuy\GitPub\EggNjkLayui\app\controller\home.js
[egg-init] write to G:\PoorGuy\GitPub\EggNjkLayui\test\app\controller\home.test.js
[egg-init] usage:
      - cd G:\PoorGuy\GitPub\EggNjkLayui
      - npm install
      - npm start / npm run dev / npm test


G:\PoorGuy\GitPub\EggNjkLayui>
```
#####2.修改```package.json``` , 添加```egg-view-nunjucks```插件 , 使用```.nunjucks```做模板 , ```package.json```文件修改后如下:
```
{
  "name": "EggNjkLayui",
  "version": "1.0.0",
  "description": "使用eggjs + nunjucks模板引擎+ Layui框架搭建的后台管理系统骨架",
  "private": true,
  "egg": {
    "declarations": true
  },
  "dependencies": {
    "egg": "^2.15.1",
    "egg-scripts": "^2.11.0",
    "egg-view-nunjucks": "^2.2.0"
  },
  "devDependencies": {
    "autod": "^3.0.1",
    "autod-egg": "^1.1.0",
    "egg-bin": "^4.11.0",
    "egg-ci": "^1.11.0",
    "egg-mock": "^3.21.0",
    "eslint": "^5.13.0",
    "eslint-config-egg": "^7.1.0"
  },
  "engines": {
    "node": ">=10.0.0"
  },
  "scripts": {
    "start": "egg-scripts start --daemon --title=egg-server-EggNjkLayui",
    "stop": "egg-scripts stop --title=egg-server-EggNjkLayui",
    "dev": "egg-bin dev",
    "debug": "egg-bin debug",
    "test": "npm run lint -- --fix && npm run test-local",
    "test-local": "egg-bin test",
    "cov": "egg-bin cov",
    "lint": "eslint .",
    "ci": "npm run lint && npm run cov",
    "autod": "autod"
  },
  "ci": {
    "version": "10"
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "author": "PoorGuy",
  "license": "MIT"
}

```
##### 3.增加所需的文件目录
- `app/public`   该文件用于存放系统的静态资源
- `app/view`     该文件夹用于存放模板文件
##### 4.修改```config/config.default.js```文件 , 该文件是eggjs的配置文件.文件修改后如下:
```
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
    '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/static/favicon.ico'))
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
```
##### 5.修改```config/plugin.js``` , 启用nunjucks插件 , ```plugin.js```修改后如下:
```
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    enable: true,
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks'
  }
};
```
##### 6.运行项目
- 输入命令`npm install` , 安装项目所需依赖
```
G:\PoorGuy\GitPub\EggNjkLayui>npm install
.......忽略
added 1186 packages from 1048 contributors and audited 20475 packages in 110.984s
found 1 high severity vulnerability
  run `npm audit fix` to fix them, or `npm audit` for details

G:\PoorGuy\GitPub\EggNjkLayui>
```
- 安装成功后 , 输入`npm run dev` , 运行项目
```
G:\PoorGuy\GitPub\EggNjkLayui>npm run dev

> EggNjkLayui@1.0.0 dev G:\PoorGuy\GitPub\EggNjkLayui
> egg-bin dev

[egg-ts-helper] create typings\app\controller\index.d.ts (3ms)
[egg-ts-helper] create typings\config\index.d.ts (15ms)
[egg-ts-helper] create typings\config\plugin.d.ts (4ms)
[egg-ts-helper] create typings\app\index.d.ts (1ms)
2019-06-21 17:28:39,625 INFO 11140 [master] node version v10.15.0
2019-06-21 17:28:39,626 INFO 11140 [master] egg version 2.22.2
2019-06-21 17:28:40,695 INFO 11140 [master] agent_worker#1:13864 started (1063ms)
2019-06-21 17:28:42,185 INFO 11140 [master] egg started on http://127.0.0.1:8080 (2559ms)
```
- 运行成功后 , 访问`http://127.0.0.1:8080` , 可以看到页面返回`hi, egg`.