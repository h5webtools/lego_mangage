
module.exports = app => {
    app.router.post('/act/getUserGroup', app.controller.entry.index.getUserGroup);
};