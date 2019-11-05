export const usersFetched = (users) => ({
    type: 'FETCH_USERS_SUCCESS',
    users
  });

export const isLoadaing = (bool) => ({
type: 'IS_LOADNIG',
isLoading: bool
});

export const isLogged = (loged) =>({
    type: 'IS_LOGGED',
    loged
});

let id = 0;

export const addToInformList = (text) => ({
    id: id++,
    type: 'ADD_TO_INFORM_LIST',
    text
});

export function usersFetchData(url) {
    return (dispatch) => {
        dispatch(isLoadaing(true));
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
        dispatch(isLoadaing(false));
            return response;
            })
            .then((response) => response.json())
            .then((users) => dispatch(usersFetched(users)));
    };
};
