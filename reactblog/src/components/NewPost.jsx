import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function NewPost() {
     const baseUrl = 'http://127.0.0.1:8000/api/'

     const [title, settitle] = useState(null);
     const [content, setcontent] = useState(null);
     const [image, setimage] = useState(null);
     const navigate = useNavigate()

     const addNewPost = async()=>{
          let formField = new FormData()
          formField.append('title',title)
          formField.append('description',content)
          if (image!==null) {
               formField.append('image',image)
          }
          await axios({
               method:'post',
               url:baseUrl,
               data:formField,
               headers: {
                    Authorization: `token ${window.localStorage.getItem('token')}` 
               }
          })
          .then(response=>{
               // console.log(response.data);
               navigate('/')
          })
     }
     

  return (

<div className="container">
    <div class="form-group">
        <label >Title</label>
        <input onChange={(e)=>settitle(e.target.value)} type="text" class="form-control" placeholder="Post title" />
    </div>
    <div class="form-group">
        <label >Description</label>
        <textarea onChange={(e)=>setcontent(e.target.value)}  placeholder="Description" class="form-control" rows="5"></textarea>
    </div>
    <div class="form-group">
        <label >Image</label>
        <input onChange={(e)=>setimage(e.target.files[0])} type="file" class="form-control" />
    </div>
    <p  className="btn btn-info mt-3" onClick={addNewPost}>New Post</p>
</div>

  )
}

export default NewPost
