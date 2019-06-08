'use strict';
const Controller = require('egg').Controller;
const convertTimeToKey = require('../utils').convertTimeToKey
class AddPartnerController extends Controller {
  async index() {
    let data = this.ctx.request.body;
    if(data instanceof Array == false){
      data = [data]
    }
    for(let i = 0; i < data.length; i++){
      const partner = data[i].name;
      const timeArr = data[i].timeArr;
      for (let i = 0, len = timeArr.length; i < len; i++) {
        let time = timeArr[i];
        const result = await this.ctx.model.Info.find({ partner, month: +time[0], day: +time[1], time: convertTimeToKey(time[2]) });
        if (!result || result.length < 1) {
          await this.ctx.model.Info.create({ partner, player: '', month: +time[0], day: +time[1], time: convertTimeToKey(time[2]) });
        }
      }
    }
    
    this.ctx.body = {
      code: '200',
      message: '添加成功'
    };
  }
}

module.exports = AddPartnerController;
