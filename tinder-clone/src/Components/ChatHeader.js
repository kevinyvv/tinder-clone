import React from 'react'
import {useCookies} from 'react-cookie'

const ChatHeader = ({user}) => {

  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  console.log(user)

  const logout = () => {
    removeCookie('UserId', cookies.UserId)
    removeCookie('AuthToken', cookies.AuthToken)
    window.location.reload()

  }

  return (
    <div className='bg-gradient-to-r from-pink-500 to-orange-500 py-4 h-[100px] flex justify-center items-center'>
        <div className='profile'>
            <div className='h-[30px] w-[30px] rounded-lg overflow-hidden m-2'>
              {user != null  ? <img className='w-full' src={user.url}/> : <img className='w-full'/> }
            </div>
            {user != null ? <h3 className='font-bold text-white'> {user.first_name}</h3> : <h3 className='font-bold text-white'> userName</h3> }
        </div>
        <button><i className="flex items-center p-4 text-white" onClick={logout}> ⇦ </i></button>
    </div>
  )
}

export default ChatHeader