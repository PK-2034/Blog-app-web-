import {Link, useLocation, useNavigate} from "react-router-dom"
import { BsSearch } from "react-icons/bs"
import { FaBars } from "react-icons/fa"
import { useContext, useState } from "react"
import Menu from "../components/Menu"
import { UserContext } from "../context/UserContext"


const Navbar = () => {

    const [prompt,setPrompt] = useState("")
    const [menu,setMenu] = useState(false)
    const navigate = useNavigate()
    const path = useLocation().pathname
    //console.log(prompt)

    const showMenu = () => {
        setMenu(!menu)
    }

    const {user} = useContext(UserContext)
    console.log(user)
    return(
        <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <Link to = "/"><img src="https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png" className="w-[40%] h-[40%]"/></Link>
        {path==="/" && <div className="flex items-center justify-center space-x-0">
        <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} className="cursor-pointer"><BsSearch/></p>
        <input onChange={(e)=>setPrompt(e.target.value)} className="outline-none px-3 py-1" placeholder="Search a Post" type="text"/>
        </div>}
        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
            {user? <h3 className="text-blue-800"><Link to="/write">Write</Link></h3> :<h3 className="text-blue-800"><Link to = "/login">Login</Link></h3>}
            {user? <div onClick={showMenu}> <p className="cursor-pointer relative"><FaBars/></p>{menu && <Menu/>} </div>:<h3 className="text-blue-800"><Link to = "/register">Register</Link></h3>}        
        </div>
        <div onClick={showMenu} className="md:hidden text-lg">
            <p className="cursor-pointer relative"><FaBars/></p>
            {menu && <Menu/>}
        </div>    
        </div>
    )
}

export default Navbar