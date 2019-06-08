"use strict";
const Controller = require("egg").Controller;

class MakeMeetingController extends Controller {
  async index() {
    const meetings = this.ctx.request.body.meetingList;


    this.ctx.body = {};
  }
}

module.exports = MakeMeetingController;


function judge(partner, player, time) {
    
}
