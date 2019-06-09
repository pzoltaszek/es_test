var I18n = {
    button: {
        start: 'START',
        up: '^',
        right: '>',
        plus: '+',
        intro: 'INTRO',
        refresh: 'refresh',
        save: 'save',
        continue: 'continue',
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
        userLogout: 'User logged out',
        errorDb: 'Database error',
        deleteSuccess: 'User deleted',
        userEditPass: 'Password changed. Please login with new password'
    },

    informlistAdmin: {
        errorId: '[ADMIN] Error - wrong id',
        errorDb: '[ADMIN] Error - database: ',
        deleteSuccess: '[ADMIN] User deleted',
        usersListRefreshed: '[ADMIN] Users list refreshed',
        userEditSuccess: '[ADMIN] User edited sucessfully'
    },

    dataBase: {
        userPost: 'http://localhost:3001/api/putUser',
        userGet: 'http://localhost:3001/api/getUser',
        userDelete: 'http://localhost:3001/api/deleteUser',
        userUpdate: 'http://localhost:3001/api/updateUser',
    },

    intro: {
        window1: 'Na początku byl Wielki wybuch... Z nieskonczenie gestej i goracej osobliwosci zacząl wylaniac sie wszechswiat... Powstaly wtedy przestrzeń i czas.',
        window2: 'Po miliardowych częściach sekundy powstaly pierwsze skladniki materi, takie jak kwarki, ktore stygly i laczyly sie poczatkowo w protony i neutrony, a nastepnie w pierwsze pierwiastki takie jak wodor (H) i hel (He).',
        window3: 'W trwajacym wiele milonow lat procesie pierwiastki te lącza się tworzac gwaizdy. Gwiazdy natomiast na końcu swojego życia mogą eksplodować uwalniajac w przestrzen cięższe pierwiastki i materię',
        window4: 'Materia ta laczy sie tworzac planety. Z koleji na planetach powstaja zwiazki chemiczne ktore daja poczatek zyciu...',
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