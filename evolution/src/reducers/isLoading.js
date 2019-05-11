export const isLoading = (state = false, action) => {
  switch (action.type) {
    case 'IS_LOADNIG':
      return action.isLoading;
    default:
      return state;
  }
}  