import githubReducer from './GithubReducer'
import {createContext, useReducer} from 'react'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    // get initial users (just for testing purposes)
    const fetchUsers = async () => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users`, {
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`
        }
    })

    const data = await response.json()

    //dispatches the type to the githubReducer
    dispatch({
        type: 'GET_USERS',
        payload: data,
    })
}

//set loading
const setLoading = () => dispatch({type:'SET_LOADING'})

return ( <GithubContext.Provider value={{
    //the dispatch is updating the state so we have to pass it down to the components as shown below
    users: state.users,
    loading: state.loading,
    fetchUsers
}}>
    {children}
    </GithubContext.Provider>
)
}

export default GithubContext