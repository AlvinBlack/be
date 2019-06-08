'use strict';
const Controller = require('egg').Controller;
const convertKeyToTime = require('../utils').convertKeyToTime
class GetInfoTableController extends Controller {
  async index() {
    const time = this.ctx.request.body.time;
    const result = await this.ctx.model.Info.find({ month: time[0], day: time[1] });
    
    let partnerArr = ['合伙人1', '合伙人2', '合伙人3', '合伙人4', '合伙人5'];
    // result.forEach(v => {
    //   if(!partnerArr.includes(v.partner)){
    //     partnerArr.push(v.partner)
    //   }
    // })

    let columns = [{
      dataIndex: 'time',
      title: '时间'
    }]
    partnerArr.forEach(v => {
      columns.push({
        dataIndex: v,
        title: v
      })
    })

    let dataSource = [];
    if(result && result.length){
      result.sort((a, b) => {
        return a.time - b.time
      })
      for (let i = 0; i < 32; i++) {
        dataSource.push({
          time: convertKeyToTime(i)
        })
      }
      result.forEach(v => {
        dataSource[v.time][v.partner] = {
          isFree: !v.player,
          entrepreneur: v.player,
          name: v.partner
        }
      })

      dataSource.forEach(v => {
        partnerArr.forEach(sv => {
          v[sv] = v[sv] ? v[sv] : {
            isFree: false,
            entrepreneur: '',
            name: sv
          }
        })
      })
    }
    
    this.ctx.body = {
      columns,
      dataSource
    };
  }
}

module.exports = GetInfoTableController;
