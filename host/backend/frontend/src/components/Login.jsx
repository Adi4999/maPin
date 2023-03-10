import { useState,useRef } from 'react'
import './login.css'
import {Room,Cancel} from "@material-ui/icons"
import axios from 'axios'
 
 export default function Login({setShowLogin,setCurrentUser}) {
  const myStorage= window.localStorage
    const [failure,setFailure]=useState(false)
    const nameRef= useRef()
    const emailRef= useRef()
    const passwordRef= useRef()

    const handleSubmit=async(e)=>{
e.preventDefault();
const user={
    username:nameRef.current.value,

    password:passwordRef.current.value,
}

try{
const res=  await axios.post('/users/login',user)
myStorage.setItem("user",res.data.username)
setCurrentUser(res.data.username)
setShowLogin(false)


 setFailure(false)
}
catch(err){

    console.log("Registration error",err)
    setFailure(true)
}
}
   return (
     <div className='loginContainer'>
        <div className="logo">
<Room></Room>
Mapin
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text"  placeholder='username' ref={nameRef}/>
         
            <input type="password" placeholder='password' ref={passwordRef}/>
            <button className='loginBtn'>Login</button>
            
         {failure &&
         <span className='failure'>Something went wrong</span>
         }
            
        </form>
        <Cancel className="loginCancel" onClick={()=>setShowLogin(false)} />
     </div>
   )
 }
 
