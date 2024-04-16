//takes in state and action
const alertReducer =(state, action) => {
    //evaluates action.type
    switch(action.type) {
        case 'SET_ALERT':
            //returns the entire payload which is msg and type
            return action.payload
            case 'REMOVE_ALERT':
                //return intial state
                return null
                default:
                    return state
    }
}

export default alertReducer
