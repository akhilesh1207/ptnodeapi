module.exports = function (app) {
    require('./client')(app);
    require('./element')(app);
    require('./project')(app);
    require('./project-team')(app);
    require('./instructions')(app);
    require('./project-report')(app);
}