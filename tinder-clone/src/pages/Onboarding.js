import React, {useState} from 'react'
import Nav from '../Components/Nav'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const OnBoarding = () => {

  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name : "",
    dob_day: '',
    dob_month: '',
    dob_year: '',
    show_gender: false,
    gender_identity: 'man',
    gender_interest: 'everyone',
    url: '',
    about: '',
    matches: []
  })

  let navigate = useNavigate()


  const handleSubmit = async (e) => {
    console.log('hello')
    e.preventDefault()
    try {

      const response = await axios.put("http://localhost:8000/user", {formData})
      const success = response.status === 200

      if (success) navigate('/dashboard')
    } catch (err) {
        console.log(err)}
  }

  const handleChange = (e) => {
    console.log('e', e)
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState, //copy old data and add "changed" variable to whatever value it ends up being
            [name]: value
        }))
  }

  console.log(formData)


  return (
   <>
    <Nav minimal={true}
      setShowModal={() => {}}
      showModal={false}
      />
    <div className='text-center border-t-2 border-t-gray-300 my-1 py-1'>
        <h2 className='font-readex italic font-bold text-4xl'> CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit} className='flex justify-center'>
          <section className='flex flex-col px-5 py-5 w-[35%] text-left'>
            <label htmlFor="first_name"> First Name </label>
            <input className='py-4 px-7 my-2 text-lg border-2 border-gray-200 rounded-lg'
             id = "first_name" type="text" name="first_name" placeholder='First Name' 
             required={true} value = {formData.first_name} onChange={handleChange}/>

            <label htmlFor="dob_day"> Birthday </label>
            <div className='flex flex-row space-x-2'>
              <input className='acc-creation-input w-1/3'
              id = "dob_day" type="number" name="dob_day" placeholder='DD' required={true} value = {formData.dob_day} onChange={handleChange}/>
              <input className='acc-creation-input w-1/3'
              id = "dob_month" type="number" name="dob_month" placeholder='MM' required={true} value = {formData.dob_month} onChange={handleChange}/>
              <input className='acc-creation-input w-1/3'
              id = "dob_year" type="number" name="dob_year" placeholder='YYYY' required={true} value = {formData.dob_year} onChange={handleChange}/>
            </div>

            <label> Gender </label>
            <div className='flex flex-row'>
                <input className='appearance-none peer/man'
                id = "man-gender-identity" type="radio" name="gender_identity" value = "man" onChange={handleChange} checked={formData.gender_identity === "man"}/>
                <label className='px-2 py-2 border-2 border-gray-400 rounded-lg mr-2 peer-checked/man:border-red-300' 
              htmlFor="man-gender-identity"> Man </label>

                <input className='appearance-none peer/woman'
                id = "woman-gender-identity" type="radio" name="gender_identity" value = "woman" onChange={handleChange} checked={formData.gender_identity === "woman"}/>
                <label className='px-2 py-2 border-2 border-gray-400 rounded-lg mr-2 peer-checked/woman:border-red-300'
              htmlFor="woman-gender-identity"> Woman </label>
              
                <input className='appearance-none peer/more'
                id = "more-gender-identity" type="radio" name="gender_identity" value = "more" onChange={handleChange} checked={formData.gender_identity === "more"}/>
                 <label className='px-2 py-2 border-2 border-gray-400 rounded-lg mr-2 peer-checked/more:border-red-300'
               htmlFor="more-gender-identity"> More </label>

            </div>
            
            <div className='flex space-x-2'>
            <label
            htmlFor="show-gender"> Show gender on my profile</label>
              <input className='mr-2'
               id = "show-gender" type="checkbox" name="show_gender"  onChange={handleChange} checked={false}/>
            </div>

            <label> Show Me</label>
            <div className='flex flex-row'>
              <input className='appearance-none peer/prefman'
                id = "man-gender-interest" type="radio" name="gender_interest" value = "man" onChange={handleChange} checked={formData.gender_interest === "man"}/>
              <label className='px-2 py-2 border-2 border-gray-400 rounded-lg mr-2 peer-checked/prefman:border-red-300'
                htmlFor="man-gender-interest"> Man </label>

                <input className='appearance-none peer/prefwoman'
                  id = "woman-gender-interest" type="radio" name="gender_interest" value = "woman" onChange={handleChange} checked={formData.gender_interest === "woman"}/>
                <label className='px-2 py-2 border-2 border-gray-400 rounded-lg mr-2 peer-checked/prefwoman:border-red-300'
                  htmlFor="woman-gender-interest"> Woman </label>

                <input className='appearance-none peer/prefeveryone'
                  id = "everyone-gender-interest" type="radio" name="gender_interest" value = "everyone" onChange={handleChange} checked={formData.gender_interest === "everyone"}/>
                <label className='px-2 py-2 border-2 border-gray-400 rounded-lg mr-2 peer-checked/prefeveryone:border-red-300'
                  htmlFor="everyone-gender-interest"> Everyone </label>

            </div>

            <label> About Me</label> 
            <input className='acc-creation-input'
            id="about" type="text" name="about" required={true} placeholder="I like long walks..." value={formData.about} onChange={handleChange}/>
            <input className='hover:bg-gray-50 active:bg-red-300 py-4 px-7 my-2 text-lg border-2 border-gray-200 rounded-lg'
            type="submit"/>
          </section>

          <section className='flex flex-col px-5 py-5 w-[35%]'>
            <label htmlFor="url">Profile Photo</label>
                        <input
                            className='acc-creation-input'
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />
                        <div className="photo-container w-full z-10">
                            {formData.url && <img className='rounded-lg' src={formData.url} alt="profile pic preview"/>
                            }
                        </div>
          </section>
        </form>
    </div>
   </>
  )
}

export default OnBoarding