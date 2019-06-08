'use strict';
const Controller = require('egg').Controller;
const convertTimeToKey = require('../utils').convertTimeToKey
class AddPartnerController extends Controller {
  async index() {
    const partner = this.ctx.request.body.name;
    const timeArr = this.ctx.request.body.timeArr;
    for(let i = 0, len = timeArr.length; i < len; i++){
      let time = timeArr[i];
      const result = await this.ctx.model.Info.find({ partner, month: time[0], day: time[1], time: convertTimeToKey(time[2]) });
      if(result.length < 1){
        await this.ctx.model.Info.create({ partner, player: '', month: time[0], day: time[1], time: convertTimeToKey(time[2]) });
      }
    }
    this.ctx.body = {
      code: '200',
      message: '添加成功'
    };
  }
}

module.exports = AddPartnerController;
