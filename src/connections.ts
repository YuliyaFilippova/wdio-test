const mysql = require('mysql');

let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'yuliya',
    password: 'mnGpfLmENGp3qLHF4LxS',
    port: 5307
});

let connectionUSA = mysql.createConnection({
    host: '127.0.0.1',
    user: 'yuliya',
    password: 'mnGpfLmENGp3qLHF4LxS',
    port: 5302
});

let configMSSQL = {
    user: 'qaCenttripUser',
    password: 'a28xUfmuHsUZRCHtFGLFcg',
    server: '127.0.0.1',
    port: 1434,
    database: 'Centtrip',
    options: {
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true
    }
};

// connection = mysql.createConnection({
//     host: 'mysql-master-writer.qa.centtrip.systems',
//     user: 'alexander',
//     password: 'KxHaBSRHQQKXgnGR4A5c',
//     port: 3306
//   });

// connectionUSA = mysql.createConnection({
//     host: 'mysql-master-writer.qa-us.centtrip.systems',
//     user: 'alexander',
//     password: 'KxHaBSRHQQKXgnGR4A5c',
//     port: 3306
//   });


if (process.env.ENV === 'dev') {
    connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'yuliya',
        password: 'mnGpfLmENGp3qLHF4LxS',
        port: 3307
    });

    connectionUSA = mysql.createConnection({
        host: '127.0.0.1',
        user: 'yuliya',
        password: 'mnGpfLmENGp3qLHF4LxS',
        port: 3302
    });

    configMSSQL = {
        user: 'devCenttripUser',
        password: 'a28xUfmuHsUZRCHtFGLFcg',
        server: '127.0.0.1',
        port: 1434,
        database: 'Centtrip',
        options: {
            encrypt: true,
            enableArithAbort: true,
            trustServerCertificate: true
        }
    };

// connection = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'alexander',
//   password: 'NPstEy98myHo7kmAmLBQ',
//   port: 3307
// });

// connectionUSA = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'alexander',
//   password: 'NPstEy98myHo7kmAmLBQ',
//   port: 3302
// });
}

module.exports = {connection, connectionUSA, configMSSQL};
