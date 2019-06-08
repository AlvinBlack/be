'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/addPartner', controller.addPartner.index);
  router.post('/getInfoTable', controller.getInfoTable.index);
  router.post('/cancelMeeting', controller.cancelMeeting.index);
  router.post('/makeMeeting', controller.makeMeeting.index);
};
