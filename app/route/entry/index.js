
module.exports = app => {
    app.router.post('/act/getUserGroup', app.controller.entry.index.getUserGroup);
    app.router.post('/act/getEntranceConf', app.controller.entry.index.getEntranceConf);
    app.router.post('/act/getActivityConfig', app.controller.entry.index.getActivityConfig);
    app.router.post('/act/deleteEntrancePlan', app.controller.entry.index.deleteEntrancePlan);
    app.router.post('/act/getEntranceDetail', app.controller.entry.index.getEntranceDetail);
    app.router.post('/act/postEntrancePlan', app.controller.entry.index.postEntrancePlan);
    app.router.post('/act/putEntrancePlan', app.controller.entry.index.putEntrancePlan);
    app.router.post('/act/getEntrancePlanList', app.controller.entry.index.getEntrancePlanList);
    app.router.post('/act/postEntranceShelves', app.controller.entry.index.postEntranceShelves);
    app.router.post('/act/getIconEntranceDetail', app.controller.entry.index.getIconEntranceDetail);
};