import {Link, useNavigate} from "react-router-dom"
import Footer from "../components/Footer"
import { useContext, useState } from "react"
import axios from 'axios'
import {URL} from '../url'
import { UserContext } from "../context/UserContext"

const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const {setUser} = useContext(UserContext)

    const navigate = useNavigate()

    const handleLogin = async () => {
        try{
            const res = await axios.post(URL+"/api/auth/login",{email,password},{withCredentials:true})
            //console.log(res.data)
            setUser(res.data)
            navigate("/")
        } catch(err){
            setError(true)
            console.log(err)
        }
    }

    return(
        <>
        <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <Link to = "/"><img src="https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png" className="w-[40%] h-[40%]"/></Link>
        <h3 className="text-blue-800 hover:text-black"><Link to = "/register">Register</Link></h3>
        </div>
        <div className="w-full flex justify-center items-center h-[90vh]">
            <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
                <img src="https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png" className="w-[65%] h-[65%]"/>
                <h1 className="text-xl font-bold font-mono text-left text-indigo-700">Log in to your Account</h1>
                <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-coral-700 outline-0" type="text" placeholder="Enter your Email"/>
                <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-coral-700 outline-0" type="password" placeholder="Enter your Password"/>
                <button onClick={handleLogin} className="w-full px-4 py-4 text-lg font-bold text-white bg-coral-700 rounded-lg hover:bg-blue-600 hover:text-black">LogIn</button>
                {error && <h3 className="text-red-500 text-sm">Something went Wrong!</h3>}
                <div className="flex justify-center items-center space-x-4">
                    <p>New Here?</p>
                    <p className="text-blue-800 hover:text-black"><Link to="/register">Register</Link></p>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Login