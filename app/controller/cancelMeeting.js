'use strict';
const Controller = require('egg').Controller;
const convertTimeToKey = require('../utils').convertTimeToKey;
class CancelMeetingController extends Controller {
  async index() {
    const partner = this.ctx.request.body.partner;
    const player = this.ctx.request.body.player;
    const time = this.ctx.request.body.time;
    const result = await this.ctx.model.Info.find({ partner, month: time.month, day: time.day});
    const sequence = result.map(item => convertTimeToKey(item.time));
    const list = getContinues(sequence, convertTimeToKey(time));
    result.forEach(item => {
        if(list.indexOf(convertTimeToKey(item.time)) !== -1){
            item.player = '';
        }
    })
    await result.save();
        this.ctx.body = {
            code: '200',
            message: '取消成功'
        };
  }
}

module.exports = AddPartnerController;

function getContinues(sequence, current){
    let result = [current];
    if (sequence.indexOf(current + 1) != -1) {
      result.push(current + 1);
      if (sequence.indexOf(current + 2) != -1) {
        result.push(current + 2);
        if (sequence.indexOf(current + 3) != -1) {
            result.push(current + 3);
          }
      }
    }
    if (sequence.indexOf(current - 1) != -1) {
      result.push(current - 1);
      if (sequence.indexOf(current - 2) != -1) {
        result.push(current - 2);
        if (sequence.indexOf(current - 3) != -1) {
            result.push(current - 3);
          }
      }
    }
    return result;
  };
  