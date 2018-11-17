var express = require('express');
var router = express.Router();
var projectReport = require('../../db/project-report');
var mail = require('../../send-email');

/* Insert */
router.post('/', function (req, res, next) {
    if (req.body.params.projectReport.id > 0) {
        projectReport.UpdateProjectReport(req.body.params.projectReport)
            .then(result => {
                res.send(result);
                res.end();
            })
            .catch(err => {
                res.send(err);[]
                res.end();
            });
    }
    else {
        projectReport.insertProjectReport(req.body.params.projectReport)
            .then(result => {
                res.send(result);
                res.end();
            })
            .catch(err => {
                res.send(err);
                res.end();
            });
    }

});
router.post('/projectReportDetails', function (req, res, next) {
    var detail = req.body.params.instructionList[0];
    if (detail.projectReportDetailId > 0) {
        projectReport.updateProjectReportDetails(req.body.params.instructionList)
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
        projectReport.insertProjectReportDetails(req.body.params.instructionList)
            .then(result => {
                res.send(result);
                res.end();
            })
            .catch(err => {
                res.send(err);
                res.end();
            });
    }

});
/* Delete */
router.delete('/:id', function (req, res, next) {
    projectReport.Delete(req.params.id)
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
    projectReport.SelectAll()
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
router.get('/:projectId/:isReportSent', function (req, res, next) {
    projectReport.SelectById(req.params.projectId, req.params.isReportSent)
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
router.get('/getReportLogDetail/:projectId/:projectReportId', function (req, res, next) {
    projectReport.GetReportLogDetails(req.params.projectId, req.params.projectReportId)
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(err => {
            res.send(err);
            res.end();
        });
});

// update project report details
/* Insert */
router.post('/updateProjectreport', function (req, res, next) {
    projectReport.UpdateProjectReport(req.body.params.projectReport)
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(err => {
            res.send(err);
            res.end();
        });
});

router.post('/updateProjectReportDetails', function (req, res, next) {
    projectReport.updateProjectReportDetails(req.body.params.instructionList)
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(err => {
            res.send(err);
            res.end();
        });
});

router.post('/sendProjectReport/:projectId/:projectReportId', function (req, res, next) {
    mail.sendProjectReport(req.body.params.recipients, req.params.projectId, req.params.projectReportId, function (err, result) {
        if (err) {
            res.send(err);
            res.end();
        }
        else {
            res.send(result);
            res.end();
        }
    });
});

router.get('/previewProjectReport/:projectId/:projectReportId', function (req, res, next) {
    projectReport.PreviewReport(req.params.projectId, req.params.projectReportId)
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
function addProjectReportDetails(instructionList, projectReportId, res) {
    projectReport.insertProjectReportDetails(instructionList, projectReportId)
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(err => {
            res.send(err);
            res.end();
        });
}


function updateProjectReportDetails(instructionList, res) {
    projectReport.updateProjectReportDetails(instructionList)
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(err => {
            res.send(err);
            res.end();
        });
}

module.exports = function (app) {
    app.use("/api/projectreport", router);
};