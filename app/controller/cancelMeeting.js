'use strict';
const Controller = require('egg').Controller;
const convertTimeToKey = require('../utils').convertTimeToKey;

class CancelMeetingController extends Controller {
  async index() {
    const partner = this.ctx.request.body.partner;
    const player = this.ctx.request.body.player;
    const time = this.ctx.request.body.time;
    const result = await this.ctx.model.Info.find({ partner,player, month: time.month, day: time.day});
    const sequence = result.map(item => item.time);
    const list = getContinues(sequence, convertTimeToKey(time.time));
    result.forEach(async item => {
        if(list.indexOf(item.time) !== -1){
            item.player = '';
        }
        await item.save()
    })
    // await result.save();
        this.ctx.body = {
            code: '200',
            message: '取消成功'
        };
  }
}

module.exports = CancelMeetingController;

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
  