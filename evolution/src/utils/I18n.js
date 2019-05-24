var I18n = {
    button: {
        start: 'START',
        up: '^',
        right: '>',
        plus: '+',
        intro: 'INTRO',
        refresh: 'refresh',
    },

    commonText: {
        welcome: 'Welcome, ',
        editProfile: 'Edit profile',
        logout: 'Logout',
        adminMenu: 'Admin menu'
    },

    informList: {
        welcome: 'Welcome, today is: ',
        wrongCredentials: 'Wrong credentials',
        addUser: 'User sucessfully added',
        loginExists: 'User with such login already exists',
        wrongPassword: 'Wrong password value for user: ',
        userLogged: 'Logged successfully. Welcome ',
        userLogout: 'User logged out'
    },

    informlistAdmin: {
        errorId: '[ADMIN] Error - wrong id',
        errorDb: '[ADMIN] Error - database: ',
        deleteSuccess: '[ADMIN] User deleted',
        usersListRefreshed: '[ADMIN] Users list refreshed'
    },

    dataBase: {
        userPost: 'http://localhost:3001/api/putUser',
        userGet: 'http://localhost:3001/api/getUser',
        userDelete: 'http://localhost:3001/api/deleteUser'
    },

    get: function (key) {
        let keys = key.split('.'),
            me = this;
        for (let i = 0; i < keys.length; i++) {
            me = me[keys[i]];
            if (!me) {
            return '!' + key;
            }
        }
        return me;
    },
};

export default I18n;