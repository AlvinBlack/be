'use strict';
const Controller = require('egg').Controller;
const convertKeyToTime = require('../utils').convertKeyToTime
class GetInfoTableController extends Controller {
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
      columns: [
          {
            dataIndex: 'time',
            title: '时间'
          }
      ],
      dataSource: [
        {
          time: 'time',
          "合伙人": {
            isFree: true,
            entrepreneur: '创业者'
          }
        }
      ]
    };
  }
}

module.exports = GetInfoTableController;
