import axios from 'axios';
import React, { useState } from 'react'
import {
     Link,
     useNavigate
} from 'react-router-dom'
const Register = () => {
     const [email, setEmail] = useState(null);
     const [username, setUsername] = useState(null);
     const [password1, setPassword1] = useState(null);
     const [password2, setPassword2] = useState(null);
     const navigate = useNavigate()
     const registerNow=()=>{
          if (password1===password2) {
               axios({
                    method:'post',
                    url: 'http://127.0.0.1:8000/register/',
                    data:{
                         'email': email,
                         'username':username,
                         'password': password1,
                    }
               })
               .then(response=>{
                    // console.log(response.data);
                    alert('User is successfully created')
                    navigate('/login')
               })
               .catch(_ =>{
                    alert('something is wrong')
               })
          }
          else{
               alert('password not matching')
          }
     }
  return (
<div className="container">
    <div class="content-section">
        <fieldset class="form-group">
            <legend class="border-bottom mb-4">Register Now</legend>
            <div>
                <div class="form-group">
                    <label>Email:</label>
                    <input  onChange={(e)=>setEmail(e.target.value)} type="email" class="form-control" placeholder="Email" />
                </div>
                <div class="form-group">
                    <label>Username:</label>
                    <input  onChange={(e)=>setUsername(e.target.value)} type="text" class="form-control" placeholder="Username" />
                </div>
                <div class="form-group">
                    <label >Password:</label>
                    <input onChange={(e)=>setPassword1(e.target.value)}  type="password"  class="form-control" placeholder="Password" />
                </div>

                <div class="form-group">
                    <label>Confirm Password:</label>
                    <input onChange={(e)=>setPassword2(e.target.value)}  type="password"  class="form-control" placeholder="Password" />
                </div>
            </div>
        </fieldset>
        <div class="form-group">
            <p class="btn btn-outline-info mt-2" onClick={registerNow} >Register</p>
        </div>
        <div class="border-top pt-3">
            <small class="text-muted">
                Have An Account?
               <Link class="ml-2" to="/login">SignIn In Now</Link>
            </small>
        </div>
    </div>
</div >


  )
}

export default Register
