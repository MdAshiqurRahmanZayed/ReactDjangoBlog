import React, {
     useEffect,
     useState
} from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
import Axios from 'axios'
import { useStateValue } from '../state/StateProvider'
import axios from 'axios'
function PostDetails() {
     const [{profile},{}] =  useStateValue()
     const baseUrl = 'http://127.0.0.1:8000/api/'
     const [post, setPost] = useState(null);
     const {id} = useParams()
     const [check, setDelete] = useState(false);
     const navigate = useNavigate()
     useEffect(()=>{
          const getPost = async()=>{
               await axios({
                    method:"GET",
                    url:`${baseUrl}${id}/`,
                    headers: {
                         Authorization: `token ${window.localStorage.getItem('token')}` //b7c778fca3eb31572708c20f147823fc6bb61b41
                    }
               })
               .then(response=>{
                    setPost(response.data)
               })
          }
          getPost()
     },[])

     const deletePost = async ()=>{
          
          await axios({
               method:'delete',
               url: `${baseUrl}${id}/`,
               headers: {
                    Authorization: `token ${window.localStorage.getItem('token')}` //b7c778fca3eb31572708c20f147823fc6bb61b41
               }
          })
          .then(response=>{
               navigate('/')
          })
          .catch(_=>{
               alert('somthing is wrong')
          })
     }

  return (
    <div className="container">
    <article class="media content-section">
         <img class="rounded-circle article-img" src={`http://127.0.0.1:8000${post?.user?.image}`} />

        <div class="media-body">
            <div class="article-metadata">
                <a class="mr-2 text-decoration-none" href="">{post?.user?.user?.first_name} {post?.user?.user?.last_name}</a><br />
                <small class="text-muted">Created At:{post?.date}</small>
                         {
                              profile?.user['id'] === post?.user?.user?.id && 
                              (

                        <div>
                            <Link class="btn btn-success btn-sm mt-1 mb-1 mx-2" to={`/${post?.id}/update/`}>Update</Link>
                            <Link class="btn btn-danger btn-sm mt-1 mb-1" onClick={deletePost} >Delete</Link>
                        </div>
                              )
                         }
              
                  

            </div>
            <h2 class="article-title">{post?.title}</h2>
            <img className="article_content_image" src={post?.image} alt="" />
            <p class="article-content">{post?.description}</p>
        </div>
    </article>

</div>
  )
}

export default PostDetails
