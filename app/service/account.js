const Service = require('egg').Service;

class AccountService extends Service{

  /**
   * 根据社团账号获取对应的社团信息
   * @param { String } club_account 社团账号
   */
  async GetClubInfoByAccount(club_account){
    const ClubInfo = await this.app.mysql.get('club_info', { club_account: club_account });
    console.log("根据社团账号获取对应的社团信息ClubInfo:",ClubInfo);
    return ClubInfo;
  }

}

module.exports = AccountService;