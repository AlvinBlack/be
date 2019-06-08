// This file is created by egg-ts-helper@1.25.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAddPartner = require('../../../app/controller/addPartner');
import ExportCancelMeeting = require('../../../app/controller/cancelMeeting');
import ExportHome = require('../../../app/controller/home');
import ExportMakeMeeting = require('../../../app/controller/makeMeeting');

declare module 'egg' {
  interface IController {
    addPartner: ExportAddPartner;
    cancelMeeting: ExportCancelMeeting;
    home: ExportHome;
    makeMeeting: ExportMakeMeeting;
  }
}
