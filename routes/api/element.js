var express = require('express');
var router = express.Router();
var element = require('../../db/element');

/* Insert */
router.post('/', function (req, res, next) {
    element.Insert(req.body.params)
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
    element.Update(req.body.params)
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
    element.Delete(req.params.id)
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
    element.SelectAll()
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
    element.SelectById(req.params.id)
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(err => {
            res.send(err);
            res.end();
        });
});

router.get('/instructions/:elementId', function (req, res, next) {
    element.getInstructionsByElementId(req.params.elementId)
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
    app.use("/api/element", router);
};