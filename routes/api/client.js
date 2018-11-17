var express = require('express');
var router = express.Router();
var client = require('../../db/client');

/* Insert */
router.post('/', function (req, res, next) {
    client.Insert(req.body.params)
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
    client.Update(req.body.params)
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
    client.Delete(req.params.id)
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
    client.SelectAll()
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
    client.SelectById(req.params.id)
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
    app.use("/api/client", router);
};