import { createRenderer } from 'react-dom/test-utils'
import githubReducer from './GithubReducer'
import {createContext, useReducer} from 'react'
import { getQueriesForElement } from '@testing-library/react'

const GithubContext = createContext()

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

return ( 
    <GithubContext.Provider
    //the dispatch is updating the state so we have to pass it down to the components as shown below
    value ={{
        ...state,
        dispatch,
}}>
    {children}
    </GithubContext.Provider>
)
}


export default GithubContext