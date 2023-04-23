import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import SinglePost from './SinglePost';

function Posts() {
     const baseUrl = 'http://127.0.0.1:8000/all-posts/'
     const [posts, setPosts] = useState(null);
     useEffect(()=>{
          const getPost = async()=>{
               await Axios({
                    method:"GET",
                    url:baseUrl,
               
               })
               .then(response=>{
                    setPosts(response.data);
               })
               .catch(e=>{
                    alert("something is wrong ",e)
               })
          }
          getPost();
     },[]);
  return (
    <div className='mb-3'>
      {
               posts !== null ?
               <div className="">
                    {
                         posts.map((data,i)=>(
                              <SinglePost post={data} key={i}/>
                              ))
                         }
               </div>
               :
               <div className="">
                    <h1>Post not found</h1>
               </div>
     }
      
    </div>
  )
}

export default Posts
