//action is typically an object that has a type. the type is a string. if any data, then you send a payload in that object too
//the reducer gets actions dispatched to it by fuctions in the context and it updates the state based on that action
const githubReducer = (state, action) => {
    switch (action.type) {
      case 'GET_USERS':
        return {
          ...state,
          users: action.payload,
          loading: false,
        }
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            }
            //puts the single user in the state
            case 'GET_USER':
              return{
                ...state,
                user: action.payload,
                loading: false
              }
            //called from GithubContext
            case 'CLEAR_USERS':
              return {
                ...state,
                //sets it to an empty array
                users: []
              }
        default:
            return state
    }
}

export default githubReducer