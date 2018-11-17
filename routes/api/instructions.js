var express = require('express');
var router = express.Router();
var instructions = require('../../db/instructions');

/* Insert */
router.post('/', function (req, res, next) {
    instructions.Insert(req.body.params)
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
    instructions.Update(req.body.params)
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
    instructions.Delete(req.params.id)
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
    instructions.SelectAll()
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
router.get('/:elementId/:projectReportId', function (req, res, next) {
    instructions.SelectById(req.params.elementId,req.params.projectReportId)
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
    app.use("/api/instructions", router);
};