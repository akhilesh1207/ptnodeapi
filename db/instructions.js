const { sql, poolPromise } = require('./db')

var instruction = {};

instruction.Insert = function (obj) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('name', sql.NVarChar, obj.name)
                .input('address', sql.NVarChar, obj.address)
                .input('phone', sql.NVarChar, obj.phone)
                .input('email', sql.NVarChar, obj.email)
                .input('operation', sql.Int, 1)
                .execute('PT_Instructions')
                .then(result => {
                    resolve(result);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

instruction.Update = function (obj) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('id', sql.Int, obj.id)
                .input('name', sql.NVarChar, obj.name)
                .input('address', sql.NVarChar, obj.address)
                .input('phone', sql.NVarChar, obj.phone)
                .input('email', sql.NVarChar, obj.email)
                .input('operation', sql.Int, 2)
                .execute('PT_Instructions')
                .then(result => {
                    resolve(result);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

instruction.Delete = function (id) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('id', sql.Int, id)
                .input('operation', sql.Int, 3)
                .execute('PT_Instructions')
                .then(result => {
                    resolve(result);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

instruction.SelectAll = function () {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('operation', sql.Int, 4)
                .execute('PT_Instructions')
                .then(result => {
                    resolve(result.recordset);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

instruction.SelectById = function (elementId,projectReportId) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('elementId', sql.Int, elementId)
                .input('projectReportId', sql.Int, projectReportId)
                .input('operation', sql.Int, 5)
                .execute('PT_instructions')
                .then(result => {
                    resolve(result.recordset);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

module.exports = instruction;