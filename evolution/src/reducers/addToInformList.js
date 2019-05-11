const INITIAL_STATE = [
  {
    id: 'a',
    text: null,
  },
  {
    id: 'b',
    text: null,
  },
  {
    id: 'c',
    text: null,
  },
  {
    id: 'd',
    text: null,
  },
  {
    id: 'e',
    text: null,
  }
]
export const addToInformList = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'ADD_TO_INFORM_LIST':
        return [
          ...state, {
            id: action.id,
            text: action.text
          }
        ]
      default:
        return state;
    }
  }  


