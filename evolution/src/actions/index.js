export const usersFetched = (users) => ({
    type: 'FETCH_USERS_SUCCESS',
    users
  });

  export function usersFetchData(url) {
    return (dispatch) => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((users) => dispatch(usersFetched(users)));
    };
}