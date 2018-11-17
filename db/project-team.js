const { sql, poolPromise } = require('./db')
// const async = require('async');

var project = {};

project.add = function add(objProjectTeam) {

    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            const team2Insert = objProjectTeam.filter(x => x.id == 0);
            if (team2Insert.length > 0) {
                const tblProjectTeam = new sql.Table('TblProjectTeam');
                tblProjectTeam.create = true;
                tblProjectTeam.columns.add('projectId', sql.Int, { nullable: false });
                tblProjectTeam.columns.add('designationId', sql.Int, { nullable: false });
                tblProjectTeam.columns.add('name', sql.NVarChar(50), { nullable: true });
                tblProjectTeam.columns.add('phone', sql.NVarChar(50), { nullable: true });
                tblProjectTeam.columns.add('email', sql.NVarChar(50), { nullable: true });
                team2Insert.forEach(element => {
                    tblProjectTeam.rows.add(element.projectId, element.designationId, element.name, element.phone, element.email)
                });
                const request = new sql.Request(pool);
                request.bulk(tblProjectTeam, (err, result) => {
                    if (err) {
                        reject({ err: err, status: 3 });
                    }
                    else {
                        resolve({ data: result, status: 0 });
                    }
                })
            }
            else {
                resolve({ data: {}, status: 0 });
            }
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
                    }).catch(err => {
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
                .execute('PT_Projects')
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
                .execute('PT_Projects')
                .then(result => {
                    resolve(result.recordset);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

project.SelectById = function (id) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('Id', sql.Int, id)
                .input('operation', sql.Int, 5)
                .execute('PT_Projects')
                .then(result => {
                    resolve(result.recordset);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

project.SelectAllDesignations = function () {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('operation', sql.Int, 6)
                .execute('PT_ProjectTeam')
                .then(result => {
                    resolve(result.recordset);
                }).catch(err => {
                    reject(err);
                });
        })
    });
};

project.SelectTeamByProject = function (projectId) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('projectId', sql.Int, projectId)
                .input('operation', sql.Int, 4)
                .execute('PT_ProjectTeam')
                .then(result => {
                    resolve(result.recordset);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

module.exports = project;