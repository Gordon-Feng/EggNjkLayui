##### 1.下载 `layuiAdmin`后台模板资源 , [下载地址:https://www.xiaoyewl.com/detail/70.html](https://www.xiaoyewl.com/detail/70.html)
##### 2.将下载的文件放进 `app/public/layuiAdmin`中 , 本项目对不需要的`layuiAdmin`文件进行了筛选.
##### 3.新建 `app/view/components` 文件夹 , 该文件夹用于存放前端公共组件.
##### 4.在 `app/view/components` 下新建 `HeadInfo.njk` 文件 , 该文件编辑网站`HTML`文件公用的`head`标签.
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=9,IE=10" />
  <meta http-equiv="Expires" content="0">
  <meta http-equiv="Cache-Control" content="no-cache">
  <meta http-equiv="Cache-Control" content="no-store">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <link rel="shortcut icon" href="/favicon.ico">
  <!-- 引入依赖的JS -->
  <!-- 引入依赖的CSS -->
  <link rel="stylesheet" type="text/css" href="../../layui/css/layui.css">
  <link rel="stylesheet" type="text/css" href="../../style/admin.css">
</head>
```
##### 5.在 `app/view` 下新建 `Login.njk` 文件. `nunjucks`语法请查看[https://nunjucks.bootcss.com/api.html](https://www.xiaoyewl.com/detail/70.html)
```
{% include "./components/HeadInfo.njk" %}
<body>
  <div class="login-main">
    <header class="layui-elip">登录</header>
    <form class="layui-form" action="/login" method="post">
      <div class="layui-input-inline">
        <input type="text" name="account" required lay-verify="required" placeholder="用户名" autocomplete="off" class="layui-input">
      </div>
      <div class="layui-input-inline">
        <input type="password" name="password" required lay-verify="required" placeholder="密码" autocomplete="off" class="layui-input">
      </div>
      <div class="layui-input-inline login-btn">
        <button lay-submit lay-filter="login" class="layui-btn">登录</button>
      </div>
      <hr/>
      <p><a href="register.html" class="fl">立即注册</a><a href="javascript:;" class="fr">忘记密码？</a></p>
    </form>
  </div>
</body>
<script src="../../layui/layui.js"></script>  
<script type="text/javascript">
  layui.use(['form','layer','jquery'], function (){
    var form = layui.form;
    var $ = layui.jquery;
    // 登录
    form.on('submit(login)', function(data){
      console.log("登录data:",data);
      $.ajax({ url:'/login', data:data.field, dataType:'text', type:'post', success:function (data) {
          var result = JSON.parse(data);
          console.log("登录结果:",result);
          layer.msg(result.msg);
          if(result.status == 200){
            window.location.href = "/";
          }
        }
      });
      return false;
    });
  })
</script>
<style>
  .login-main {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 350px;
    margin: 0 auto;
  }

  .login-main header {
    margin-top: 200px;
    height: 35px;
    line-height: 35px;
    font-size: 30px;
    font-weight: 100;
    text-align: center;
  }

  .login-main header, .login-main form, .login-main form .layui-input-inline {
    margin-bottom: 15px;
  }

  .login-main form .layui-input-inline, .login-main form .layui-input-inline input, .login-main form .layui-input-inline button {
    width: 100%;
  }

  .login-main form .login-btn {
    margin-bottom: 5px;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }
</style>
```
##### 6.在`app/controller`新建js文件`account.js`, 用于实现跟账号相关的逻辑.
```
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
}
```

module.exports = AccountController;
##### 7.修改`app/view/components/HeadInfo.njk`文件 , 在`<head></head>`中 , 添加以下代码 (变量`title`就是从`AccountController`中传递过去的) :
```
<title>{{title}}</title>
```
##### 8.在`app/router.js`中添加路由`/login` , 完成后 , 浏览器访问`http://127.0.0.1:8080/login` , 可以看到对应的登录页的页面效果.
```
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.Index);//首页
  router.get('/login', controller.account.Login);//登录页
};
```

