import React from 'react'
import Nav from '../Components/Nav'
import {useState} from 'react'
import AuthModal from '../Components/AuthModal'
import {useCookies} from "react-cookie"

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const authToken = cookies.AuthToken

    const handleClick = () => {
      if (authToken) {
          removeCookie('UserId', cookies.UserId)
          removeCookie('AuthToken', cookies.AuthToken)
          window.location.reload()
          return
      }
      setShowModal(true)
      setIsSignUp(true)
  }


  return (
    <div className="h-screen w-screen fixed my-auto mx-auto text-center bg-home-pattern">
    <Nav minimal={false} authToken={authToken} setShowModal={setShowModal} showModal={showModal} setIsSignUp={setIsSignUp}/>

      <div className='align-center mt-[30vh]'>

          <h1 className='font-readex text-7xl font-bold text-white mb-12'> Swipe Right®</h1> 

          <button onClick={handleClick} className ='text-[#fff] font-bold uppercase text-base mt-8
            bg-gradient-to-r from-pink-500 to-orange-500
            py-3 px-7 rounded-3xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500'>
              {authToken ? 'Signout' : 'Create Account'}
          </button>

          {showModal && (
            <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
          )}

      </div>
    </div>
  )
}

export default Home