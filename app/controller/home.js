'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async Index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
