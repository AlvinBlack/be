'use strict';
const Controller = require('egg').Controller;

class AddPartnerController extends Controller {
  async index() {
    const partner = this.ctx.request.body.name;
    const timeArr = this.ctx.request.body.timeArr;
    const result = await this.ctx.model.Info.find({ partner,  });
    for(let i = 0; i < timeArr; i++){
        
    }
    if (userName && result.length < 1) {
      await this.ctx.model.User.create({ userName, password, role });
      this.ctx.body = {
        code: '200',
        message: '注册成功',
      };
    } else {
      await this.ctx.model.User.updateOne({ userName }, { password });
      this.ctx.body = {
        code: '404',
        message: '用户名已存在',
      };
    }
  }
}

module.exports = AddPartnerController;
