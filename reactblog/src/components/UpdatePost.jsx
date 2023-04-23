import React, {
     useEffect,useState
} from 'react'
import axios, { Axios  } from 'axios'
import { Navigate,useNavigate, useParams } from 'react-router-dom'
import { useStateValue } from '../state/StateProvider'

function UpdatePost() {
     const baseUrl = 'http://127.0.0.1:8000/api/'
     const [title, setTitle] = useState('');
     const [description, setDescription] = useState('');
     const [image1, setImage1] = useState(null);
     const [image, setImage] = useState('');
     const {id} = useParams()
     const[{profile},{}]  = useStateValue()
     const navigate = useNavigate()
     useEffect(()=>{
          const getPost = async()=>{
               await axios({
                    method:"GET",
                    url:`${baseUrl}${id}/`,
                    headers: {
                         Authorization: `token ${window.localStorage.getItem('token')}` 
                    }
               })
               .then(response=>{
                    if (response.data?.user?.id === profile.id ) {
                         
                         setTitle(response.data?.title)
                         setDescription(response.data?.description)
                         setImage(response.data?.image)        
                    }
                    else{
                         navigate('/')
                    }

               })
               
          }
          getPost()
     },[])
     

     const UpdateedPost = async()=>{
          let formField = new FormData()
          formField.append('title', title)
          formField.append('description', description)
          if (image1 !== null) {
               formField.append('image', image1)
          }

          await axios({
               method:"PUT",
               url:`${baseUrl}${id}/`,
               data:formField,
               headers: {
                    Authorization: `token ${window.localStorage.getItem('token')}` 
               }
          })
          .then(response=>{
               navigate(`/${id}`)
          })
     }
  return (

<div className="container">
    <h1>Update</h1>
    <div className="p-3">
        <div class="form-group">
          
            <label>Title</label>
            <input type="text" onChange={(e)=>setTitle(e.target.value)} class="form-control" value={title} />
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea  class="form-control" rows="5" onChange={(e)=>setDescription(e.target.value)} value={description}></textarea>
        </div>
        <div class="form-group">
            <label>Ulpode Image</label><br />
            <img className="update__image"  src={image} alt="" srcset="" />
            <input
            onChange = {
                 (e) => setImage1(e.target.files[0])
            } 
                className="form-control"
                type="file" />
        </div>
    </div>
    <div>
        <p  className="btn btn-info" onClick={UpdateedPost} >Update</p>
    </div>
</div>


  )
}

export default UpdatePost
