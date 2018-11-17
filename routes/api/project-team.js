var express = require('express');
var router = express.Router();
var projectTeam = require('../../db/project-team');
// const await = require('await');
// const async = require('async');
/* Insert */
router.post('/', function (req, res, next) {
    projectTeam.add(req.body.params)
        .then(result => {
            const team2Update = req.body.params.filter(x => x.id > 0);
            if (team2Update.length > 0) {
                projectTeam.Update(req.body.params)
                    .then(result => {
                        res.send(result);
                        res.end();
                    })
                    .catch(err => {
                        res.send(err);
                        res.end();
                    });
            }
            else {
                res.send(result);
                res.end();
            }

        })
        .catch(err => {
            res.send(err);
            res.end();
        });
    // addUpdateProjectTeam(req.body.params, res);
});

/* Delete */
router.delete('/:id', function (req, res, next) {
    projectTeam.Delete(req.params.id)
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
    projectTeam.SelectAll()
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
router.get('/getbyid/:id', function (req, res, next) {
    projectTeam.SelectById(req.params.id)
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(err => {
            res.send(err);
            res.end();
        });
});

/* GET All designations */
router.get('/designations', function (req, res, next) {
    projectTeam.SelectAllDesignations()
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(err => {
            res.send(err);
            res.end();
        });
});

router.get('/team/:projectId', function (req, res, next) {
    projectTeam.SelectTeamByProject(req.params.projectId)
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(err => {
            res.send(err);
            res.end();
        });
});

// private functions
// async function addUpdateProjectTeam(objProjectTeam, res) {
//     const responseAdd = await projectTeam.add(objProjectTeam);
//     if (responseAdd.status == 0) {
//         const responseUpdate = await projectTeam.Update(objProjectTeam);
//         if (responseUpdate.status == 0) {
//             res.send(responseUpdate.data);
//             res.end();
//         }
//         else {
//             res.send(responseUpdate.err);
//             res.end();
//         }
//     }
//     else {
//         res.send(responseAdd.err);
//         res.end();
//     }
// }

module.exports = function (app) {
    app.use("/api/projectteam", router);
};