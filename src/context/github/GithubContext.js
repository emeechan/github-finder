import { createRenderer } from 'react-dom/test-utils'
import githubReducer from './GithubReducer'
import {createContext, useReducer} from 'react'
import { getQueriesForElement } from '@testing-library/react'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)


// get single user
const getUser = async (login) => {
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
        Authorization: `token ${GITHUB_TOKEN}`
    }
})

//if page cannot be loaded then redirect
if (response.state === 404) {
    window.location = '/notfound'
}   else {
    const data = await response.json()

    //dispatches the type to the githubReducer
    dispatch({
        type: 'GET_USER',
        payload: data,
        })
}
}

// get user repos
const getUserRepos = async (login) => {
    setLoading()

    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
    })

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    headers: {
        Authorization: `token ${GITHUB_TOKEN}`
    }
})

const data = await response.json()

//dispatches the type to the githubReducer
dispatch({
    type: 'GET_REPOS',
    payload: data,
})
}

//clear users from state
const clearUsers = () => dispatch({type: 'CLEAR_USERS'})

//set loading
const setLoading = () => dispatch({ type:'SET_LOADING' })

return ( 
    <GithubContext.Provider
    //the dispatch is updating the state so we have to pass it down to the components as shown below
    value ={{
        ...state,
        dispatch,
        clearUsers,
        getUser,
        getUserRepos,
}}>
    {children}
    </GithubContext.Provider>
)
}


export default GithubContext