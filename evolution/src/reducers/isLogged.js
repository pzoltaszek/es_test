export const isLogged = (state = [], action) => {
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