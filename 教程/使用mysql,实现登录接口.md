##### 1.安装`egg-mysql`插件 
```
G:\PoorGuy\GitPub\EggNjkLayui>npm i --save egg-mysql
```
##### 2.在`config/config.default.js`中配置mysql连接信息
```
config.mysql = {
  client: {
    host:'localhost',
    user:'root',
    password:'123456',
    database:'super_club',
    port:3306
  }
}
```
##### 3.在`config/plugin.js`中开启插件 
```
mysql : {
  enable: true,
  package: 'egg-mysql',
}
```
##### 4.新增`app/service`目录 , 创建`account.js`文件 , 用于实现账号相关的业务逻辑.
- AccountService结构如下:
```
const Service = require('egg').Service;
class AccountService extends Service{

}
module.exports = AccountService;
```
- 实现从`club_info(社团信息表)`获取对应账号的社团信息
```
/**
  * 根据社团账号获取对应的社团信息
  * @param { String } club_accouint 社团账号
  */
async GetClubInfoByAccount(club_accouint){
  const ClubInfo = await this.app.mysql.get('club_info', { club_accouint: club_accouint });
  console.log("根据社团账号获取对应的社团信息ClubInfo:",ClubInfo);
  return ClubInfo;
}
```
##### 5.在`app/controller/account.js`的`LoginApi`中调用`AccountService`服务的`GetClubInfoByAccount` , 实现登录功能.
```
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
    ctx.body = {
      status: -200, data: "", msg: "账号不存在"
    };
  }else if(LoginResult.club_account != ReqData.club_account || LoginResult.club_password != ReqData.club_password){
    ctx.body = {
      status: -200, data: "", msg: "密码错误"
    };
  }else{
    ctx.body = {
      status: 200, data: LoginResult, msg: "登录成功"
    };
  }
}
```
##### 6.在`app/router.js`中添加路由
```
router.post('/login', controller.account.LoginApi);//登录接口
```


