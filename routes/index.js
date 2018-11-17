module.exports = function (app) {
    require('./api')(app);
    require('./ui')(app);
}