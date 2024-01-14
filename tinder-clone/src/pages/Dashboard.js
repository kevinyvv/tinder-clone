import React, {useState, useEffect} from 'react'
import TinderCard from 'react-tinder-card'
import {useCookies} from 'react-cookie'
import ChatContainer from '../Components/ChatContainer'
import axios from 'axios'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [lastDirection, setLastDirection] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const userId = cookies.UserId


  const getUser = async () => {
      try {
          const response = await axios.get('http://localhost:8000/user', {
              params: {userId}
          })
          setUser(response.data)
      } catch (error) {
          console.log(error)
      }
  }
  const getGenderedUsers = async () => {
      try {
          const response = await axios.get('http://localhost:8000/gendered-users', {
              params: {gender: user?.gender_interest}
          })
          setGenderedUsers(response.data)
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
      getUser()

  }, [])

  useEffect(() => {
      if (user) {
          getGenderedUsers()
      }
  }, [user])

  const updateMatches = async (matchedUserId) => {
      try {
          await axios.put('http://localhost:8000/addmatch', {
              userId,
              matchedUserId
          })
          getUser()
      } catch (err) {
          console.log(err)
      }
    }


    const swiped = (direction, swipedUserId) => {
      if (direction === 'right') {
          updateMatches(swipedUserId)
      }
      setLastDirection(direction)
    }

    const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
    }

    const matchedUserIds = user?.matches ? user.matches.map(({user_id}) => user_id).concat(userId) : []

    const filteredGenderedUsers = genderedUsers?.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id)) || []


    console.log('filteredGenderedUsers ', filteredGenderedUsers)
  

  return (
    <>
    {user &&
    <div className='div font-readex text-center w-full flex justify-between'>
      <ChatContainer user={user}/>
      <div className='w-2/3 h-full flex flex-col items-center justify-center mt-8'>
        <div className='max-w-[400px] w-[400px] height-[650px]'>
          {filteredGenderedUsers?.map((genderedUser) =>
            <TinderCard className='absolute' key={genderedUser.name} onSwipe={(dir) => swiped(dir, genderedUser.name)} onCardLeftScreen={() => outOfFrame(genderedUser.name)}>
              <div style={{ backgroundImage: 'url(' + genderedUser.url + ')', backgroundSize: 'cover',
              backgroundColor: '#fff',
              width: '400px',
              maxWidth: '400px',
              height: '650px',
              backgroundPosition: 'center',
              borderRadius: '30px',
            }}>
              <h3 className='font-bold mx-10 mt-0 text-[#fff]'>{genderedUser.name}</h3>
              </div>
            </TinderCard>
          )}
          <div className='absolute bottom-1/4'>
            { lastDirection ? <p> you swiped {lastDirection} </p> : <p></p>}
          </div>
        </div>
      </div>
    </div>}
    </>
  )
}

export default Dashboard