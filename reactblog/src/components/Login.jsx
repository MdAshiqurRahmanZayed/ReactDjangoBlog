import axios from 'axios';
import React, {
     useState
} from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
     const [email, setEmail] = useState(null);
     const [username, setUsername] = useState(null);
     const [password, setPassword] = useState(null);

     const loginNow = async() =>{
         await axios({
               method:'post',
               url: 'http://127.0.0.1:8000/login/',
               data:
               {
                    // 'email':email,
                    'username':username,
                    'password':password
               }
          })
          .then(response=>{
               window.localStorage.setItem('token', response.data['token'])
               window.location.href = '/' 
          })
          .catch(() =>{
               alert("your password or username is invalid",)
          })
     }


  return (

<div className="container">
    <div class="content-section">
        <fieldset class="form-group">
            <legend class="border-bottom mb-4">Log In</legend>
            <div>
                {/* <div class="form-group">
                    <label >Email</label>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)}  class="form-control" placeholder="Email" />
                </div> */}
                <div class="form-group">
                    <label >Username</label>
                    <input type="text" onChange={(e)=>setUsername(e.target.value)}  class="form-control" placeholder="Username" />
                </div>
                <div class="form-group">
                    <label >Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" class="form-control" placeholder="Password" />
                </div>
            </div>
        </fieldset>
        <div class="form-group">
            <p class="btn btn-outline-info mt-2" onClick={loginNow} >Login</p>
        </div>
        <div class="border-top pt-3">
            <small class="text-muted">
                Need An Account?
          <Link class="ml-2" to="/register/">Sign Up Now</Link>
            </small>
        </div>
    </div>
</div >


  )
}

export default Login
