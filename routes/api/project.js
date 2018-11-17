var express = require('express');
var router = express.Router();
var project = require('../../db/project');

/* Insert */
router.post('/', function (req, res, next) {
    project.Insert(req.body.params)
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(err => {
            res.send(err);
            res.end();
        });
});

/* Update */
router.put('/', function (req, res, next) {
    project.Update(req.body.params)
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(err => {
            res.send(err);
            res.end();
        });
});

/* Delete */
router.delete('/:id', function (req, res, next) {
    project.Delete(req.params.id)
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(err => {
            res.send(err);
            res.end();
        });
});

/* GET All */
router.get('/', function (req, res, next) {
    project.SelectAll()
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(err => {
            res.send(err);
            res.end();
        });
});

/* GET By Id */
router.get('/:id', function (req, res, next) {
    project.SelectById(req.params.id)
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(err => {
            res.send(err);
            res.end();
        });
});

router.get('/getProjectbyClient/:clientId', function (req, res, next) {
    project.SelectProjectbyClient(req.params.clientId)
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(err => {
            res.send(err);
            res.end();
        });
});


module.exports = function (app) {
    app.use("/api/project", router);
};