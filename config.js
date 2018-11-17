module.exports = {
    sqlConfig: {
        user: 'WMDB',
        password: 'WMDB',
        server: 'AKHILESH-PC', // You can use 'localhost\\instance' to connect to named instance
        database: 'PrimeTech',
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        options: {
            encrypt: false, // Use this if you're on Windows Azure
        }
    },
    smptpConfig: {
        sender: 'smtps://ptdcreport@gmail.com',
        password : 'primetech'
    }
};