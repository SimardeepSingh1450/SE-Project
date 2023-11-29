import React, { useEffect, useState } from 'react'
import './LoginPage.css'
import {motion} from 'framer-motion';
import LoginBg from './assets/laser-beam-login.mp4'
import {LiaGamepadSolid} from 'react-icons/lia';
import {HiMail} from 'react-icons/hi'
import {RiLockPasswordFill} from 'react-icons/ri'
import {useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {StreamChat} from 'stream-chat';

const LoginPage = () => {
    const api_key = "jhw8xp9vt565";
    const cookies = new Cookies();
    const token = cookies.get('token');
    const client = StreamChat.getInstance(api_key);

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [passPrompt,setPassPrompt] = useState(false);
    const [promptMsg,setPromptMsg] = useState("");

    const connectFunction = () =>{

      if(token){
        client.connectUser({
          id:cookies.get('userId'),
          name:cookies.get('username'),
          hashedPassword:cookies.get('hashedPassword'),
        },token).then((user)=>{
          console.log('getStream Account User:',user)
        })
      }
    }
    

    const signInHandle=async()=>{
        if(email == ""){
            setPassPrompt(true);
            setPromptMsg("Please input a valid email.");
            return;
        }else{
            setPassPrompt(false);
        }

        if(pass == ""){
            setPassPrompt(true);
            setPromptMsg("Please choose a password.");
            return;
        }else{
            setPassPrompt(false);
        }

        //Authentication Handelling code
        //We make this login call int order to set uuid for the current session
        // const res = await axios.post('http://localhost:3005/user/login',{email:email,password:pass});
        
        // if(!res.data.user){
        //   setPassPrompt(true);
        //   setPromptMsg("No user found in Database.");
        // }else{
        //   //else we navigate to the dashboard and set the uuid inside localStorage
        //   navigate("/dashboard");
        // }

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const data = await fetch('http://localhost:3005/user/login', {
            method: 'POST',
            redirect: 'follow',
            credentials: 'include', // Don't forget to specify this if you need cookies
            headers: headers,
            body: JSON.stringify({email:email,password:pass})
        })


        const res = await data.json();
        console.log('Data from login fetch is :',res);
        
        if(res.doesNotExist){
          setPassPrompt(true);
          setPromptMsg("No user found in Database.");
        }else{
          //else we navigate to the dashboard and set the uuid inside localStorage
          console.log(res.msg);

          // //Then we setup GETSTREAM Cookies
          //Now Setting up cookies for GetSTream.io
          cookies.set("token",res.token);
          cookies.set("username",res.user.username);
          cookies.set("password",res.user.password);//this is hashed password
          cookies.set("userId",res.userId);

          connectFunction();

          navigate("/dashboard");
        }
    }

    // useEffect(()=>{
    //   const initialDisconnect = async()=> {
    //    await client.disconnectUser();
    //   }

    //   initialDisconnect();
    // },[])

  return (
    <div className='mainLoginPageDiv'>
      <video src={LoginBg} autoPlay loop muted/>

      <div className='gameMainHeaderDiv'>
      <LiaGamepadSolid className='gameHeaderIcon'/>
        <motion.h1 initial={{y:-400,x:0}} animate={{y:0,x:0}} transition={{duration:0.5,type:'spring'}} className='gameLoginHeader text-white text-4xl'>Game Login Page</motion.h1>    
      </div>
    
    <motion.div initial={{y:-400,x:0}} animate={{y:0,x:0}} transition={{duration:0.5,type:'spring'}} className="backdrop-filter backdrop-blur-sm md:backdrop-blur-lg w-full max-w-sm">
  <form className="loginFormDiv rounded px-8 pt-6 pb-8">

    {/* <div className="mb-4">
      <div className='iconLabelLogin'>
        <FaUser style={{fontSize:'20px',marginBottom:'15px',marginRight:'10px',color:'white'}}/> 
        <label style={{textShadow:'0.5px 0.5px 2px brown'}} className="block text-white text-lg font-bold mb-2" for="username">
        Username 
        </label>
      </div>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter Username"/>
    </div> */}

    <div className="mb-4">
    <div className='iconLabelLogin'>
      <HiMail style={{fontSize:'20px',marginBottom:'10px',marginRight:'10px',color:'white'}}/>
      <label style={{textShadow:'0.5px 0.5px 2px brown'}} className="block text-white text-lg font-bold mb-2" for="email">
        Email
      </label>
      </div>
      <input onChange={(e)=>setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Enter Email"/>
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

    <div className='login-page-bottom-alignment'>
      <div className="flex items-center justify-between">
        <button onClick={()=>signInHandle()} className="mr-3 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Sign In
        </button>
        <button onClick={()=>navigate("/signupPage")} className="ml-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Go to Sign UP
        </button>
      </div>

      {/* <button className="mt-4 inline-block align-baseline font-bold text-sm text-pink-500 hover:text-pink-600" href="#">
          Forgot Password?
        </button> */}
    </div>

  </form>
</motion.div>

</div>
  )
}

export default LoginPage