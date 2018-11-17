const { sql, poolPromise } = require('./db')

var project = {};

project.Insert = function (obj) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('clientId', sql.Int, obj.clientId)
                .input('name', sql.NVarChar, obj.name)
                .input('address', sql.NVarChar, obj.address)
                .input('phone', sql.NVarChar, obj.phone)
                .input('email', sql.NVarChar, obj.email)
                .input('operation', sql.Int, 1)
                .execute('PT_Projects')
                .then(result => {
                    resolve(result);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

project.Update = function (obj) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('id', sql.Int, obj.id)
                .input('clientId', sql.Int, obj.clientId)
                .input('name', sql.NVarChar, obj.name)
                .input('address', sql.NVarChar, obj.address)
                .input('phone', sql.NVarChar, obj.phone)
                .input('email', sql.NVarChar, obj.email)
                .input('operation', sql.Int, 2)
                .execute('PT_Projects')
                .then(result => {
                    resolve(result);
                }).catch(err => {
                    reject(err);
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

project.SelectProjectbyClient = function (clientId) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('ClientId', sql.Int, clientId)
                .input('operation', sql.Int, 6)
                .execute('PT_Projects')
                .then(result => {
                    resolve(result.recordset);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

module.exports = project;