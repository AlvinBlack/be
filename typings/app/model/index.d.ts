// This file is created by egg-ts-helper@1.25.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportInfo = require('../../../app/model/info');

declare module 'egg' {
  interface IModel {
    Info: ReturnType<typeof ExportInfo>;
  }
}
