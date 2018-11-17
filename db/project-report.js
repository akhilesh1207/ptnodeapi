const { sql, poolPromise } = require('./db');


var project = {};

project.insertProjectReport = function (obj) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('projectId', sql.Int, obj.projectId)
                .input('userName', sql.NVarChar, obj.userName)
                .input('locationRef', sql.NVarChar, obj.locationRef)
                .input('area', sql.NVarChar, obj.area)
                .input('level', sql.NVarChar, obj.level)
                .input('gridLine', sql.NVarChar, obj.gridLine)
                .input('latitude', sql.NVarChar, obj.latitude)
                .input('longitude', sql.NVarChar, obj.longitude)
                .input('location', sql.NVarChar, obj.location)
                .input('name', sql.NVarChar, obj.name)
                .input('operation', sql.Int, 1)
                .output('poProjectReportId', sql.Int)
                .execute('PT_ProjectReport')
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(result);
                });
        });
    });
}

project.insertProjectReportDetails = function (obj, projectReportId) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            const projectReportDetail = new sql.Table('TblProjectReportDetail');
            projectReportDetail.create = true;
            projectReportDetail.columns.add('projectReportId', sql.Int, { nullable: false });
            projectReportDetail.columns.add('elementId', sql.Int, { nullable: false });
            projectReportDetail.columns.add('instructionId', sql.Int, { nullable: false });
            projectReportDetail.columns.add('feedback', sql.NVarChar(1000), { nullable: true });
            projectReportDetail.columns.add('createDate', sql.DateTime, { nullable: true });
            projectReportDetail.columns.add('createBy', sql.Int, { nullable: true });
            projectReportDetail.columns.add('modifyDate', sql.DateTime, { nullable: true });
            projectReportDetail.columns.add('modifyBy', sql.Int, { nullable: true });
            projectReportDetail.columns.add('isChecked', sql.Bit, { nullable: true });
            obj.forEach(item => {
                projectReportDetail.rows.add(item.projectReportId, item.elementId, item.instructionId, item.feedback, new Date(), 1, new Date(), 1, item.isChecked)
            });
            const request = new sql.Request(pool);
            request.bulk(projectReportDetail, (err, result) => {
                if (err) {
                    reject({ err: err, status: 3 });
                }
                else {
                    resolve({ data: result, status: 0 });
                }
            })
        });
    });
}


// Update Project report and details:

project.UpdateProjectReport = function (obj) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('id', sql.Int, obj.id)
                .input('name', sql.NVarChar, obj.name)
                .input('projectId', sql.Int, obj.projectId)
                .input('userName', sql.NVarChar, obj.userName)
                .input('locationRef', sql.NVarChar, obj.locationRef)
                .input('area', sql.NVarChar, obj.area)
                .input('level', sql.NVarChar, obj.level)
                .input('gridLine', sql.NVarChar, obj.gridLine)
                .input('latitude', sql.NVarChar, obj.latitude)
                .input('longitude', sql.NVarChar, obj.longitude)
                .input('location', sql.NVarChar, obj.location)
                .input('operation', sql.Int, 2)
                .output('poProjectReportId', sql.Int)
                .execute('PT_ProjectReport')
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(result);
                });
        });
    });
}

project.updateProjectReportDetails = function (obj) {
    let lv_final_sql = '';
    obj.forEach(item => {
        var isChecked = item.isChecked ? 1 : 0;
        let lv_update_sql = 'UPDATE TblProjectReportDetail SET FEEDBACK = ' + "'" + item.feedback + "'" + ' ,IsChecked = ' + isChecked.toString() + ' WHERE ID = ' + item.projectReportDetailId + ';';
        lv_final_sql += lv_update_sql;
    });

    // console.log('final sql ', lv_final_sql);
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            const request = new sql.Request(pool);
            request.batch(lv_final_sql, (err, result) => {
                if (err) {
                    reject({ err: err, status: 3 });
                }
                else {
                    resolve({ data: result, status: 0 });
                }
            })
        });
    });
}

project.Update = function (objProjectTeam) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            const team2Update = objProjectTeam.filter(x => x.id > 0);
            var idx = 0;
            team2Update.forEach(element => {
                pool.request()
                    .input('id', sql.Int, element.id)
                    .input('projectId', sql.Int, element.projectId)
                    .input('designationId', sql.Int, element.designationId)
                    .input('name', sql.NVarChar, element.name)
                    .input('phone', sql.NVarChar, element.phone)
                    .input('email', sql.NVarChar, element.email)
                    .input('operation', sql.Int, 2)
                    .execute('PT_ProjectTeam')
                    .then(result => {
                        idx += 1;
                        if (idx == team2Update.length)
                            resolve({ data: result, status: 0 });
                    })
                    .catch(err => {
                        idx += 1;
                        if (idx == team2Update.length)
                            reject({ err: err, status: 3 });
                    });

            });
        })
    });
}

project.Delete = function (id) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('id', sql.Int, id)
                .input('operation', sql.Int, 3)
                .execute('PT_ProjectReport')
                .then(result => {
                    resolve(result);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

project.SelectAll = function () {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('operation', sql.Int, 4)
                .execute('PT_ProjectReport')
                .then(result => {
                    resolve(result.recordset);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

project.SelectById = function (projectId, isProcessed) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('isProcessed', sql.Bit, isProcessed)
                .input('projectId', sql.Int, projectId)
                .output('poProjectReportId', sql.Int)
                .input('operation', sql.Int, 5)
                .execute('PT_ProjectReport')
                .then(result => {
                    resolve(result.recordset);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}
project.GetReportLogDetails = function (projectId, projectReportId) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('id', sql.Int, projectReportId)
                .input('projectId', sql.Int, projectId)
                .output('poProjectReportId', sql.Int)
                .input('operation', sql.Int, 6)
                .execute('PT_ProjectReport')
                .then(result => {
                    resolve(result.recordsets);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

project.PreviewReport = function (projectId, projectReportId) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('id', sql.Int, projectReportId)
                .input('projectId', sql.Int, projectId)
                .output('poProjectReportId', sql.Int)
                .input('operation', sql.Int, 7)
                .execute('PT_ProjectReport')
                .then(result => {
                    resolve(result.recordsets);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}


module.exports = project;