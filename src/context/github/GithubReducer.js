//action is typically an object that has a type. the type is a string. if any data, then you send a payload in that object too
const githubReducer = (state, action) => {
    switch (action.type) {
      case 'GET_USERS':
        return {
          ...state,
          users: action.payload,
          loading: false,
        }
        default:
            return state
    }
}

export default githubReducer