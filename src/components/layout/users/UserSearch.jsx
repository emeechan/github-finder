import { useState, useContext } from "react"
import GithubContext from "../../../context/github/GithubContext"

function UserSearch() {
    const [text, setText] = useState('')

    const {users, searchUsers} = useContext(GithubContext)

    //updates the state, which is the text, to whatever is typed in
    const handleChange = (e) => setText(e.target.value)

    const handleSubmit = (e) => {
        //its a form submit so we have to do:
        e.preventDefault()
        //checks if there is text
        if(text === '') {
            alert('Please type something or this is going to be awkward')
        } else {
            searchUsers(text)

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
{/* meant to only shows the clear button if something has been typed in the search bar but could not get it to work*/}
{/*  {user.length > 0 && (  */}
            <div>
            <button className="btn btn-ghost btn-lg">
                Clear
            </button>
        </div>
        {/*  )}  */}
    </div>
    )
}

export default UserSearch
