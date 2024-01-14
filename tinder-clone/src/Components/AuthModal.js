import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'

const AuthModal = ({setShowModal, isSignUp}) => {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(null)
  
  let navigate = useNavigate()

  const handleClick = () => {
    setShowModal(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        if (isSignUp && (password!= confirmPassword)) {
            setError("Passwords need to match.")
            return
        }

        const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, {email, password})

        setCookie('AuthToken', response.data.token)
        setCookie('UserId', response.data.userId)

        const success = response.status == 201


        if (success && isSignUp) navigate('/onboarding')//navigate to onboarding
        if (success && !isSignUp) navigate('/dashboard')

        window.location.reload()
        console.log('make a post request to our database')
    } catch (error) {
        console.log(error)
    }
  }


  return (
    <div className='absolute w-[360px] h-[600px] mt-4 bg-white px-10 py-4 rounded-md 
    translate -translate-x-1/2 -translate-y-1/3 top-1/3 left-1/2 space-y-4'>
        <button onClick={handleClick} className="float-right hover:font-bold"> ⓧ </button>
        <h2 className='italic text-2xl font-bold'>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
        <p className='text-sm'>By clicking Log In, you agree to ...</p>
        <form onSubmit={handleSubmit} className=' flex flex-col
        space-y-2 my-2 ='>
            <input className='px-2 py-2 text-lg'
                type='email'
                id="email"
                name="email"
                placeholder="email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input className='px-2 py-2 text-lg'
                type='password'
                id="password"
                name="password"
                placeholder="password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
            />
            {isSignUp && 
                <input className='px-2 py-2 text-lg'
                    type='password-check'
                    id="password-check"
                    name="password-check"
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            }
            <button className=' bg-white text-gray-500 font-semibold text-md uppercase rounded-xl border border-gray-500 px-4 py-2 mx-4 my-4
            hover:text-gray-700 hover:border-gray-700
            '> <input type='submit'/> </button>
            <p> {error} </p>
        </form>
        <hr></hr>
        <h2 className='mt-2 italic font-bold text-2xl'> GET THE APP </h2>
    </div>
  )
}

export default AuthModal