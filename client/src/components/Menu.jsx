import { UserContext } from "../context/UserContext"
import { useContext } from "react"
import axios from 'axios'
import {URL} from '../url'
import { Link, useNavigate } from "react-router-dom"

const Menu = () => {
    const {user} = useContext(UserContext)
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()
    const handleLogout = async () => {
        try{
            const res = await axios.get(URL+"/api/auth/logout",{withCredentials:true})
            //console.log(res)
            setUser(null)
            navigate("/login") 
        } catch(err){
            console.log(err)
        }
    }

    return(
        <div className="bg-indigo-100 w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 rounded-md md:right-32 rounde-md p-4 space-y-4">
            {!user && <h3 className="text-black text-sm hover:text-blue-800 cursor-pointer"><Link to="/login">LogIn</Link></h3>}
            {!user && <h3 className="text-black text-sm hover:text-blue-800 cursor-pointer"><Link to="/register">Register</Link></h3>}
            {user && <h3 className="text-black text-sm hover:text-blue-800 cursor-pointer"><Link to={"/profile/"+user._id}>Profile</Link></h3>}
            {user && <h3 className="text-black text-sm hover:text-blue-800 cursor-pointer"><Link to="/write">Write</Link></h3>}
            {user && <h3 className="text-black text-sm hover:text-blue-800 cursor-pointer"><Link to={"/myblogs/"+user._id}>My Blogs</Link></h3>}
            {user && <h3 onClick={handleLogout} className="text-black text-sm hover:text-blue-800 cursor-pointer"><Link to="/login">LogOut</Link></h3>}
        </div>
    )
}

export default Menu