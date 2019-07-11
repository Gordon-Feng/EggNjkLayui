const Service = require('egg').Service;

class AccountService extends Service{

  /**
   * 根据社团账号获取对应的社团信息
   * @param { String } club_account 社团账号
   */
  async GetClubInfoByAccount(club_account){
    try {
      const ClubInfo = await this.app.mysql.select('club_info', { 
        where: { club_account: club_account  },//WHERE 条件
        columns: ['club_id' , 'club_account' , 'club_password' , 'club_name' , 'club_logo'],//要查询的表字段
        orders: [ ['club_id','desc'] ],//排序方式
      });
      console.log("根据社团账号获取对应的社团信息ClubInfo:",ClubInfo[0]);
      return ClubInfo[0];
    } catch (error) {
      console.error("根据社团账号获取对应的社团信息ClubInfo error:",error);
      return { error: String(error) };
    }
  }

  /**
   * 根据社团id获取对应的社团详细信息
   * @param { Number } club_id 社团id
   */
  async GetClubDetailById(club_id){
    const ClubDetail = await this.app.mysql.get('club_info', { club_id: club_id });
    console.log("根据社团id获取对应的社团详细信息ClubDetail:",ClubDetail);
    return ClubDetail;
  }

}

module.exports = AccountService;