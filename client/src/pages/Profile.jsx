import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProfilePosts from "../components/ProfilePosts"
import axios from "axios"
import { URL, IF } from "../url"
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"


const Profile = () => {
    const param = useParams().id
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {user,setUser} = useContext(UserContext)
    const navigate = useNavigate()
    const [updated,setUpdated] = useState(false)
    const [posts,setPosts] = useState([])
    
    const fetchProfile=async ()=>{
        try{
           const res=await axios.get(URL+"/api/users/"+user._id)
           setUsername(res.data.username)
           setEmail(res.data.email)
           setPassword(res.data.password)
        } catch(err){
            console.log(err)
        }
    }

    const handleUserUpdate = async () =>{
        setUpdated(false)
        try{
            const res = await axios.put(URL+"/api/users/"+user._id,{username,email,password},{withCredentials:true})
            setUpdated(true)
        } catch(err){
            console.log(err)
            setUpdated(false)
        }
    }

    const handleUserDelete = async () =>{
        try{
            const res = await axios.delete(URL+"/api/users/"+user._id,{withCredentials:true})
            setUser(null)
            navigate("/")
        } catch(err){
            console.log(err)
        }
    }

    const fetchUserPosts=async ()=>{
        try{
          const res=await axios.get(URL+"/api/posts/user/"+user._id)
          // console.log(res.data)
          setPosts(res.data)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchProfile()
    },[param])

    useEffect(()=>{
        fetchUserPosts()
    },[param])

    return(
        <div>
            <Navbar/>
            <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
                <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
                    <h1 className="text-xl font-bold text-blue-700 mb-4">Your Posts:</h1>
                    {posts?.map((p)=>(
                        <ProfilePosts key={p._id} p={p}/>
                    ))}
                </div>
                <div className="md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
                <div className="flex flex-col space-y-4 items-start">
                <h1 className="text-xl font-bold text-blue-700 mb-4 mx-auto">Profile</h1>
                    <input onChange={(e)=>setUsername(e.target.value)} value={username} className="px-4 py-2 text-blue-500 border-2 border-coral-700 outline-0" placeholder="Your UserName" type="text"/>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className="px-4 py-2 text-blue-500 border-2 border-coral-700 outline-0" placeholder="Your EMail" type="email"/>
                    {/*<input onChange={(e)=>setPassword(e.target.value)} value={password} className="px-4 py-2 text-blue-500 border-2 border-coral-700 outline-0" placeholder="Your Password" type="password"/>*/}
                    <div className="flex items-center space-x-4 mt-8">
                        <button onClick={handleUserUpdate} className="bg-coral-700 hover:text-white hover:bg-blue-600 rounded-lg text-black font-semibold px-4 py-2">UPDATE</button>
                        <button onClick={handleUserDelete} className="bg-coral-700 hover:text-white hover:bg-blue-600 rounded-lg text-black font-semibold px-4 py-2">DELETE</button>
                    </div>
                    {updated && <h3 className="text-green-500 text-sm text-center mt-4 ">USER UPDATED!!!</h3>}
                </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Profile