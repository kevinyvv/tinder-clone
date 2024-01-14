import React, {useState} from 'react'
import ChatHeader from './ChatHeader'
import ChatDisplay from './ChatDisplay'
import MatchesDisplay from './MatchesDisplay'

const ChatContainer = ({user}) => {
  const [clickedUser, setClickedUser] = useState(null)

  return (
    <div className='bg-white shadow-lg shadow-gray-700 w-1/3 h-screen py-2 text-left z-10'>
        <ChatHeader user={user}/>
        <div className='flex justify-center space-x-4'>
            <button 
            className='border border-white bg-white border-b-4 border-b-red-800 text-lg m-1 p-2 disabled:border-b-gray-300'> Matches </button>
            <button 
            className='border border-white bg-white border-b-4 border-b-red-800 text-lg m-1 p-2 disabled:border-b-gray-300'> Chats</button>
        </div>

        {!clickedUser && <MatchesDisplay matches={user.matches} setClickerUser={setClickedUser}/>}
        {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}
    </div>
  )
}

export default ChatContainer