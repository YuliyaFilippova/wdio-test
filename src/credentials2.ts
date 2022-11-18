

let CredentialsIF = {
    CenttripAdminUSA: {
        Email: 'e.halynia@andersenlab.com',
        Password: 'Password1!'
    },
    CenttripAdminiUK: {
        Email: 'yulia.centtripadmin.qa@harakirimail.com',
        Password: 'Password1!'
    },
    SuperAdminUK: {
        Email: 'superadminqa02@harakirimail.com',
        Password: 'Password1!'
    },
};

if (process.env.ENV === 'dev') {
    CredentialsIF = {
        CenttripAdminUSA: {
            Email: 'megaadmin@harakirimail.com',
            Password: 'Password1!'
        },
        CenttripAdminiUK: {
            Email: 'y.philippova@andersenlab.com',
            Password: 'Password1!'
        },
        SuperAdminUK: {
            Email: 'superadmin05@harakirimail.com',
            Password: 'Password1!'
        },
    }
}; 

module.exports = { CredentialsIF }; 