import Axios  from 'axios'
import React from 'react'
import {
  useEffect,
  useState
} from 'react'
import { useStateValue } from '../state/StateProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const [{profile},dispatch] =  useStateValue()
const [fname, setFname] = useState(profile?.user.first_name);
const [lname, setLname] = useState(profile?.user.last_name);
const [image, setImage] = useState(null);
const [content, setcontent] = useState(profile?.about);
console.log(profile);
const [reload, setReload] = useState('');
const navigate  = useNavigate()
useEffect(()=>{
          const getProfile = async () => {
              await Axios({
                      method: 'get',
                      url: 'http://127.0.0.1:8000/profile/',
                      headers: {
                          Authorization: `token ${window.localStorage.getItem('token')}` 
                      }
                  })
                  .then(response => {
                      dispatch({
                          type: 'ADD_PROFILE',
                          value: response.data['userdata']
                      })
                  })
          }
          getProfile()
},[reload])

const userDataUpdate = async()=>{
    await axios({
        method:"post",
        url: "http://127.0.0.1:8000/user-data-update/",
        data:{
            'first_name':fname,
            'last_name':lname,
        },
        headers: {
            Authorization: `token ${window.localStorage.getItem('token')}`
        }
    })
    .then(response=>{
        // console.log(response.data);
        setReload(response)
    })
}
console.log(content);
const updateImage = async()=>{
    let formField = new FormData()
    if (image !==null) {
        formField.append('image',image)
    }
    formField.append('about',content)
    await axios({
        method:'post',
        url: 'http://127.0.0.1:8000/profile-data-update/',
        data:formField,
        headers: {
            Authorization: `token ${window.localStorage.getItem('token')}`
        }
    })
    .then(response=>{
        setReload(response.data)
    })
}
  return (

<div className="container">
    <div>
        <div class="content-section">
            <div class="media">
                <img class="rounded-circle account-img" src={`http://127.0.0.1:8000${profile?.image}`} />
                <div class="media-body">
                    <h2 class="account-heading">{profile?.user.username}</h2>
                    <small class="form-text text-muted">Username name is Fiexd</small>
                    <p class="text-secondary">{profile?.user.email}</p>
                    <p>{profile?.user.first_name} {profile?.user.last_name}</p>
                </div>
            </div>
            <form method="POST" enctype="multipart/form-data">

                <fieldset class="form-group">
                    <legend class="border-bottom mb-4">Profile Info</legend>
                   
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" onChange={e=>setFname(e.target.value)} value={fname} class="form-control"  />
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" onChange={e=>setLname(e.target.value)} value={lname} class="form-control"  />
                    </div>
                        
                </fieldset>
                <div class="form-group">
                    <p class="btn btn-outline-info mt-2" onClick={userDataUpdate}>Update</p>
                </div>
                 <div class="form-group">
                        <label>Uplode Profile Picture</label>
                        <div class="row">
                            <div class="col">
                                <input onChange={e=>setImage(e.target.files[0])}  type="file" class="form-control" />
                            </div>
                            <div class="form-group">
                            <label >About yourself</label>
                            <textarea onChange={(e)=>setcontent(e.target.value)}  placeholder="About" class="form-control" rows="5" value={content}>
                                
                            </textarea>
                        </div>
                            <div class="col">
                                <p onClick={updateImage} className="btn btn-info mt-4">Update</p>
                            </div>
                        </div>
                    </div>
            </form>
        </div>
    </div>
    {/* <div className="">
        <h2>Time Line</h2>
        <div className="">
            {
                profile?.posts?.map((post, i) => (
                    <SingleArticle key={i} post={post} profile={profile} />
                ))
            }
        </div>
    </div> */}
</div>


  )
}

export default Profile