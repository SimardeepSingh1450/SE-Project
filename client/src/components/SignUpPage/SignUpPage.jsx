import React, { useState } from 'react'
import './SignUpPage.css'
import {motion} from 'framer-motion';
import LoginBg from '../LoginPage/assets/laser-beam-login.mp4'
import {LiaGamepadSolid} from 'react-icons/lia';
import {FaUser} from 'react-icons/fa';
import {HiMail} from 'react-icons/hi'
import {RiLockPasswordFill} from 'react-icons/ri'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {StreamChat} from 'stream-chat';

const SignUpPage = () => {
    const api_key = "jhw8xp9vt565";
    const cookies = new Cookies();
    const token = cookies.get('token');
    const client = StreamChat.getInstance(api_key);
    const navigate = useNavigate();

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [promptMsg,setPromptMsg] = useState("");
    const [passPrompt,setPassPrompt] = useState(false);

    if(token){
      client.connectUser({
        id:cookies.get('userId'),
        name:cookies.get('username'),
        hashedPassword:cookies.get('hashedPassword'),
      },token).then((user)=>{
        console.log('getStream Account User:',user)
      })
    }

    const signUpHandle=async()=>{
        if(username == ""){
          setPassPrompt(true);
          setPromptMsg("Please choose a Username");
        }else{
          setPassPrompt(false);
        }

        if(email == ""){
          setPassPrompt(true);
          setPromptMsg("Please input a valid email.");
        }else{
            setPassPrompt(false);
        }

        if(pass == ""){
            setPassPrompt(true);
            setPromptMsg("Please choose a password.");
        }else{
            setPassPrompt(false);
        }

        //Authentiation Handelling code
        const res = await axios.post('http://localhost:3005/user/signup',{email:email,username:username,password:pass});

        if(!res.data.user){
          setPassPrompt(true);
          setPromptMsg("Unsuccessfull Signup, Please Try Again");
        }else{
          setPassPrompt(true);
          setPromptMsg("Successfully Signed Up");
        }

        //Now Setting up cookies for GetSTream.io
        cookies.set("token",res.data.token);
        cookies.set("username",res.data.user.username);
        cookies.set("password",res.data.hashedPassword);
        cookies.set("userId",res.data.userId);

        //Flow then goes from here to dashboard on login where we connect the user to getstream
    }

  return (
    <div className='mainLoginPageDiv'>
      <video src={LoginBg} autoPlay loop muted/>

      <div className='gameMainHeaderDiv'>
      <LiaGamepadSolid className='gameHeaderIcon'/>
        <motion.h1 initial={{y:-400,x:0}} animate={{y:0,x:0}} transition={{duration:0.5,type:'spring'}} className='gameLoginHeader text-white text-4xl'>Game SignUp Page</motion.h1>    
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
        <input onChange={(e)=>{setUsername(e.target.value)}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter Username"/>
    </div>

    <div className="mb-4">
    <div className='iconLabelLogin'>
      <HiMail style={{fontSize:'20px',marginBottom:'10px',marginRight:'10px',color:'white'}}/>
      <label style={{textShadow:'0.5px 0.5px 2px brown'}} className="block text-white text-lg font-bold mb-2" for="email">
        Email
      </label>
      </div>
      <input onChange={(e)=>{setEmail(e.target.value)}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Enter Email"/>
    </div>

    <div className="mb-6">
    <div className='iconLabelLogin'>
      <RiLockPasswordFill style={{fontSize:'20px',marginBottom:'10px',marginRight:'10px',color:'white'}}/>
      <label style={{textShadow:'0.5px 0.5px 2px brown'}} className="block text-white text-lg font-bold mb-2" for="password">
        Password
      </label>
      </div>
      <input onChange={(e)=>{setPass(e.target.value)}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="Enter Password"/>
      {passPrompt?<p className="text-white text-s italic">{promptMsg}</p>:<></>}
    </div>

    <div className="flex items-center justify-between">
      <button onClick={()=>signUpHandle()} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Sign UP
      </button>
      <button onClick={()=> navigate("/loginPage")} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Go to Log In
      </button>
    </div>

  </form>
</motion.div>

</div>
  )
}

export default SignUpPage