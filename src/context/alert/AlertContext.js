import { createContext, useReducer } from "react";
import alertReducer from './AlertReducer'

const AlertContext = createContext()

//deconstructs children
export const AlertProvider = ({children}) => {
    const initialState = null

    //useReducer hook
    const [state, dispatch] = useReducer(alertReducer, initialState)

    //set an alert
    const setAlert = (msg, type) => {
        dispatch({
            type: 'SET_ALERT',
            //payload is object with msg and type
            payload: {msg, type}
        })

        //setTimeout takes in a function that dispatches an object with the type of REMOVE_ALERT
        //setTimeout takes in a second argument of how often in milisecs we want it to fire off (3 secs)
        setTimeout(() => dispatch({type: 'REMOVE_ALERT'}), 3000)
    }

        //passes values in as an object, which is alert and we passed in the entire state. 
        //also passes in setAlert, which holds a msg and type, which gets put into state
    return (
        <AlertContext.Provider value={{ alert: state, setAlert }}>
        {/* children prop */}
        {children}
    </AlertContext.Provider>
    )
}

export default AlertContext