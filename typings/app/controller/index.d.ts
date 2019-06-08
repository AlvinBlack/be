// This file is created by egg-ts-helper@1.25.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAddPartner = require('../../../app/controller/addPartner');
import ExportHome = require('../../../app/controller/home');

declare module 'egg' {
  interface IController {
    addPartner: ExportAddPartner;
    home: ExportHome;
  }
}
