export const users = (state = [], action) => { // (1)
    switch (action.type) { // (2)
      case 'FETCH_USERS_SUCCESS':
        return [
          ...action.users
        ]
      default:
        return state
    }
  }