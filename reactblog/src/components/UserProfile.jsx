import React, {
     useEffect,
     useState
} from 'react'
import { useStateValue } from '../state/StateProvider'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function UserProfile() {
       const [profile, setProfile] = useState(null);
       const {username} =useParams()
       useEffect(()=>{
          const getProfile = async()=>{
               await axios({
                    method:"get",
                    url: `http://127.0.0.1:8000/post-user-profile/${username}/`
               })
               .then(res=>(
                    console.log(res.data),
                    setProfile(res.data)
               ))
          }
          getProfile()
       },[])

  return (
<div className="container">
    <div>
        <div class="content-section">
          {
               profile !== null ?

               <>
            <div class="media">
                < img class = "rounded-circle account-img"
                src = {
                     `http://127.0.0.1:8000${profile?.userdata?.image}`
                }
                />
                <div class="media-body">
                    <p class="text-secondary">{profile?.userdata?.user.email}</p>
                    <p>
                         <b>
                         {profile?.userdata?.user.first_name} {profile?.userdata?.user.last_name}
                         </b>
                    </p>
                    <p>{profile?.userdata?.about}</p>
                </div>
            </div>
               </>
               :
               <>

               </>
          }
           
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

export default UserProfile
