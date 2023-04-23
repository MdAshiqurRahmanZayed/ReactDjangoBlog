import React,{useEffect} from 'react'
import Axios from 'axios'
import Navbar  from './components/Navbar'
import Profile from './components/Profile'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import PostDetails from './components/PostDetails';
import { useStateValue } from './state/StateProvider';
import Login from './components/Login';
import Register from './components/Register';
import NewPost from './components/NewPost';
import UpdatePost from './components/UpdatePost';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
function App() {
  const [{profile},dispatch] =  useStateValue()
       useEffect(() => {
        try {
          
          const getProfile = async () => {
            await Axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/profile/',
                headers: {
                  Authorization: `token ${window.localStorage.getItem('token')}` //b7c778fca3eb31572708c20f147823fc6bb61b41
                }
              })
              .then(response => {
                dispatch({
                 type: 'ADD_PROFILE',
                 value:response.data['userdata']
                })
              })
          }
          getProfile()
        } 
        catch (error) {
          dispatch({                
                  type: 'ADD_PROFILE',
                  value: null
          })
        }
       }, [])
  return (
    <div>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home  />} />
        {
          profile !==null ?
          <>
          <Route path="/newpost" element={<NewPost />  } />
          <Route path="/profile" element={<Profile />  } />
          <Route path="/:id/update/" element={<UpdatePost />  } />
          <Route path="/:id/" element={<PostDetails  />} />
          <Route path="/user/:username/" element={<UserProfile  />} />

          </>
          :
          <>
          <Route path="/user/:username/" element={<Login  />} />
          <Route path="/:id/update/" element={<Login />  } />
          <Route path="/:id/" element={<Login  />} />
          <Route path="/" element={<Login />  } />
          <Route path="/login" element={<Login />  } />
          <Route path="/register" element={<Register />  } />
          
          </>
        }

      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  )
}

export default App
