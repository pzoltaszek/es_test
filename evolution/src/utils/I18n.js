var I18n = {
common: {
    start: 'START'
},

informList: {
    welcome: 'Welcome, today is: ',
    wrongCredentials: 'Wrong credentials'
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