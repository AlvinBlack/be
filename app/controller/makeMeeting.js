"use strict";
const Controller = require("egg").Controller;
const convertTimeToKey = require("../utils").convertTimeToKey;
class MakeMeetingController extends Controller {
  async index() {
    const insertList = this.ctx.request.body.meetingList;
    const player = this.ctx.request.body.player;
    const month = this.ctx.request.body.month;
    const day = this.ctx.request.body.day
    const list =  await this.ctx.model.Info.find({month, day});
    const canUpdate = judge(player, list, insertList);
    if(canUpdate){  
        
        insertList.forEach(async ele => {
            let item = await this.ctx.model.Info.findOne({month, day, time: convertTimeToKey(ele.time), partner: ele.partner})
            if(item){
                item.player = ele.player;
                await item.save();
            }else{
                let partner = ele.partner
                let time = ele.time
                let player = ele.player
                item = await this.ctx.model.Info.create({ player, month, day, partner, time:convertTimeToKey(time)});
                await item.save()
            }
        })
        this.ctx.body = {
            code: 200,
            message: '操作成功'
        };
    }else {
        this.ctx.body = {
            code: -1,
            message: '操作失败'
        };
    }
  }
}

module.exports = MakeMeetingController;


function judge(player, list, insertList) {
    let canUpdate = judgeConflict(list, insertList);
    let total = list.concat(insertList);
    if(canUpdate){
        canUpdate = judgeContinue(total, player)
    }
    if(canUpdate){
        canUpdate = judgeTime(total)
    }
    return canUpdate;
}


//同时预约多人
function judgeTime(result, player) {
    return result.filter(item => item.player === player).every((item1,index1) => {
        return !result.some((item2, index2)=> {
            return item1.time === item2.time && index1 !==index2
        })
    })
}
//是否与其他人冲突
function judgeConflict(list, insertList) {
    return insertList.every(item1 => {
        return !list.some(item2 => {
            return item1.time === item2.time && item1.partner === item2.partner && item1.player !== item2.player;
        })
    })
}
//判断自己预约是否合法
function judgeContinue(list, player) {
    const partnerList = getPartnerList(list, player)
    let result
    for(let key in partnerList){
        if(!eleContinue(partnerList[key])){
            result = false
        }else {
            result = true;
        }
    }
    return result;
}

function getPartnerList(list, player) {
    let map = {}
    list.forEach(item => {
        if(!map[item.partner]){
            map[item.partner] = []
        }
        if(item.player === player){
            map[item.partner].push(typeof item.time == 'number' ? item.time: convertTimeToKey(item.time))
        }
    });
    return map
}

function eleContinue(list) {
    list = Array.from(new Set(list))
    list.sort((a,b) => a-b);
    console.log("current")
    console.log(list)
    if(list && list.length >= 1){
        return list.length <= 4 && list[list.length-1] - list[0] <= 3;
    }
    return true;
}
