import { useState, useContext } from "react"
import GithubContext from "../../../context/github/GithubContext"
import AlertContext from "../../../context/alert/AlertContext"
import {searchUsers} from "../../../context/github/GithubActions"

function UserSearch() {
    const [text, setText] = useState('')

    const {users, dispatch, } = useContext(GithubContext)
    const {setAlert} = useContext(AlertContext)

    //updates the state, which is the text, to whatever is typed in
    const handleChange = (e) => setText(e.target.value)

    const handleSubmit = async (e) => {
        //its a form submit so we have to do:
        e.preventDefault()
        //checks if there is text
        if(text === '') {
            setAlert('Please type something or this is going to be awkward', 'error')
        } else {
            dispatch({type: 'SET_LOADING'})
            const users = await searchUsers(text)
            dispatch({type: 'GET_USERS', payload: users})

            setText('')
        }
    }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
        <div>
        <form onSubmit={handleSubmit}>
            <div className="form-control"> 
            <div className="relative">
                <input
                type='text'
                className='w-full pr-40 bg-gray-200 input input-lg text-black'
                placeholder="Search"
                value={text}
                onChange={handleChange}
                />
                <button type = 'submit'
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">
                    Go
                </button>
            </div>
            </div>
        </form>
        </div>
{/* only shows clear buttons when something has been searched */}
  {users.length > 0 && ( 
            <button onClick={() => dispatch({type: 'CLEAR_USERS'})} className="btn btn-ghost btn-lg">
                Clear
            </button>
          )}  
    </div>
    )
}

export default UserSearch
