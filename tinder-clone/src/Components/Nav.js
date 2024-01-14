import React from 'react'
import logo from '../images/tinder_logo_white.png'
import colorLogo from '../images/color-logo-tinder.png'


const Nav = ({minimal, authToken, setShowModal, showModal, setIsSignUp}) => {

  const handleClick = () => {
    setShowModal(true)
    setIsSignUp(false)
  }

  return (
    <nav className='w-full flex justify-between'>
      <div className='w-[170px] mx-4 my-2'>
        <img className='w-full' src={minimal ? colorLogo : logo} />
      </div>
      {!authToken && !minimal && 
        <button className='mx-2 font-bold text-pink-500 bg-white text-lg rounded-xl px-4 py-1 my-2 disabled:bg-gray-100 disabled:text-pink-600' 
        onClick={handleClick} disabled={showModal}>
           Log in
        </button>
      }
    </nav>
  )
}

export default Nav