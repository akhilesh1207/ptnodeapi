const { sql, poolPromise } = require('./db')

var element = {};

element.Insert = function (obj) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('name', sql.NVarChar, obj.name)
                .input('address', sql.NVarChar, obj.address)
                .input('phone', sql.NVarChar, obj.phone)
                .input('email', sql.NVarChar, obj.email)
                .input('operation', sql.Int, 1)
                .execute('PT_element')
                .then(result => {
                    resolve(result);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

element.Update = function (obj) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('id', sql.Int, obj.id)
                .input('name', sql.NVarChar, obj.name)
                .input('address', sql.NVarChar, obj.address)
                .input('phone', sql.NVarChar, obj.phone)
                .input('email', sql.NVarChar, obj.email)
                .input('operation', sql.Int, 2)
                .execute('PT_element')
                .then(result => {
                    resolve(result);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

element.Delete = function (id) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('id', sql.Int, id)
                .input('operation', sql.Int, 3)
                .execute('PT_element')
                .then(result => {
                    resolve(result);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

element.SelectAll = function () {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('operation', sql.Int, 4)
                .execute('PT_Elements')
                .then(result => {
                    resolve(result.recordset);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

element.SelectById = function (id) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('Id', sql.Int, id)
                .input('operation', sql.Int, 5)
                .execute('PT_element')
                .then(result => {
                    resolve(result.recordset);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

element.getInstructionsByElementId = function (id) {
    return new Promise(function (resolve, reject) {
        poolPromise.then(pool => {
            pool.request()
                .input('Id', sql.Int, id)
                .input('operation', sql.Int, 6)
                .execute('PT_element')
                .then(result => {
                    resolve(result.recordset);
                }).catch(err => {
                    reject(err);
                });
        })
    });
}

module.exports = element;