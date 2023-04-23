import React from 'react'
import { Link,Navigate, useNavigate } from 'react-router-dom'
function SinglePost({post}) {
  const navigate = useNavigate()
   
       const truncate = (str) => {
         return str.length > 200 ? str.substring(0, 200) + "..."  : str;
       }
  return (
    <div>
      <div class="media content-section">
    <img class="rounded-circle article-img" src={`http://127.0.0.1:8000${post?.user?.image}`} />
    <div class="media-body">
        <div class="article-metadata">
            
          <Link class="mr-2 text-decoration-none " to={`/user/${post?.user?.user?.username}/`}>
            {post?.user?.user?.first_name} {post?.user?.user?.last_name}
            </Link>
             <br />
          <small class="text-muted">Created at:{post?.date}</small>
        </div>
        <h2>
          <Link class="article-title text-decoration-none" to={`/${post?.id}/`} >{post?.title}</Link>
        </h2>
        
          {/* <p class="article-content">{post?.description}</p>
          <br /> */}
          <p class="article-content">{truncate(post?.description)} </p>
          
         
    </div>
</div>
    </div>
  )
}

export default SinglePost
