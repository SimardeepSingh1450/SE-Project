import React, { useState } from 'react'
import './LoginPage.css'
import {motion} from 'framer-motion';
import LoginBg from './assets/laser-beam-login.mp4'
import {LiaGamepadSolid} from 'react-icons/lia';
import {FaUser} from 'react-icons/fa';
import {HiMail} from 'react-icons/hi'
import {RiLockPasswordFill} from 'react-icons/ri'

const LoginPage = () => {
    const [pass,setPass] = useState("");
    const [passPrompt,setPassPrompt] = useState(false);
    const signInHandle=()=>{
        if(pass == ""){
            setPassPrompt(true);
        }else{
            setPassPrompt(false);
        }
    }

  return (
    <div className='mainLoginPageDiv'>
      <video src={LoginBg} autoPlay loop muted/>

      <div className='gameMainHeaderDiv'>
      <LiaGamepadSolid className='gameHeaderIcon'/>
        <motion.h1 initial={{y:-400,x:0}} animate={{y:0,x:0}} transition={{duration:0.5,type:'spring'}} className='gameLoginHeader text-white text-4xl'>Game Login Page</motion.h1>    
      </div>
    
    <motion.div initial={{y:-400,x:0}} animate={{y:0,x:0}} transition={{duration:0.5,type:'spring'}} className="backdrop-filter backdrop-blur-sm md:backdrop-blur-lg w-full max-w-sm">
  <form className="loginFormDiv rounded px-8 pt-6 pb-8">

    <div className="mb-4">
      <div className='iconLabelLogin'>
        <FaUser style={{fontSize:'20px',marginBottom:'15px',marginRight:'10px',color:'white'}}/> 
        <label style={{textShadow:'0.5px 0.5px 2px brown'}} className="block text-white text-lg font-bold mb-2" for="username">
        Username 
        </label>
      </div>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter Username"/>
    </div>

    <div className="mb-4">
    <div className='iconLabelLogin'>
      <HiMail style={{fontSize:'20px',marginBottom:'10px',marginRight:'10px',color:'white'}}/>
      <label style={{textShadow:'0.5px 0.5px 2px brown'}} className="block text-white text-lg font-bold mb-2" for="email">
        Email
      </label>
      </div>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Enter Email"/>
    </div>

    <div className="mb-6">
    <div className='iconLabelLogin'>
      <RiLockPasswordFill style={{fontSize:'20px',marginBottom:'10px',marginRight:'10px',color:'white'}}/>
      <label style={{textShadow:'0.5px 0.5px 2px brown'}} className="block text-white text-lg font-bold mb-2" for="password">
        Password
      </label>
      </div>
      <input onChange={(e)=>{setPass(e.target.value)}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="Enter Password"/>
      {passPrompt?<p className="text-white text-s italic">Please choose a password.</p>:<></>}
    </div>

    <div className="flex items-center justify-between">
      <button onClick={()=>signInHandle()} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Sign In
      </button>
      <button className="inline-block align-baseline font-bold text-sm text-pink-500 hover:text-pink-600" href="#">
        Forgot Password?
      </button>
    </div>

  </form>
</motion.div>

</div>
  )
}

export default LoginPage