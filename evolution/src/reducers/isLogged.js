const INITIAL_STATE = 
    {
       login: 'yeti',
      isLogged: true
    };

export const isLogged = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'IS_LOGGED':
        return {
          login: action.loged.login,
          isLogged: action.loged.isLogged
        }
          
      default:
        return state;
    }
  }  