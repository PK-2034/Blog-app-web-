import { useEffect, useState, useContext } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { ImCross } from "react-icons/im"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import {URL} from "../url"
import { UserContext } from "../context/UserContext"

const EditPost = () => {
    const postId = useParams().id
    const {user} = useContext(UserContext)
    const[title,setTitle] = useState("")
    const[desc,setDesc] = useState("")
    const [file, setFile] = useState(null)
    const[cat,setCat] = useState("")
    const[cats,setCats] = useState([])
    const navigate = useNavigate()

    const fetchPost = async () => {
        try{
            const res = await axios.get(URL+"/api/posts/"+postId)
            setTitle(res.data.title)
            setDesc(res.data.desc)
            setFile(res.data.photo)
            setCats(res.data.categories)
        } catch(err){
            console.log(err)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const post = {
            title,
            desc,
            username:user.username,
            userId:user._id,
            categories:cats
        }

        if(file){
            const data = new FormData()
            const filename = Date.now()+file.name
            data.append("img",filename)
            data.append("file",file)
            post.photo = filename

            //img upload
            try{
                const imgUpload = await axios.post(URL+"/api/upload",data)
                //console.log(imgUpload.data)
            } catch(err){
                console.log(err)
            }
        }

        //post upload
        try{
            const res = await axios.put(URL+"/api/posts/"+postId,post,{withCredentials:true})
            navigate("/posts/post/"+res.data._id)
            //console.log(res.data)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchPost()
    },[postId])

    const addCategory = () => {
        let updatedCats = [...cats]
        updatedCats.push(cat)
        setCat("")
        setCats(updatedCats)
    }

    const deleteCategory = (i) => {
        let updatedCats = [...cats]
        updatedCats.splice(i)
        setCats(updatedCats)
    }
    return(
        <div>
            <Navbar/>
            <div className="px-6 md:px-[200px] mt-8">
                <h1 className="font-bold md:text-2xl text-xl mt-8 text-indigo-800">Update a Post</h1>
                <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
                    <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder="Enter post Title" className="px-4 py-2 border-2 border-coral-700 outline-0"/>
                    <input onChange={(e) => setFile(e.target.files[0])} type="file" className="px-4 w-[25%]" />
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-4 md:space-x-8">
                            <input value={cat} onChange={(e)=>setCat(e.target.value)} className="px-4 py-2 border-2 border-coral-700 outline-0" placeholder="Enter post Category" type="text"/>
                            <div onClick={addCategory} className="bg-coral-700 text-white rounded-md px-4 py-2 font-semibold cursor-pointer">Add</div>
                        </div>

                        {/*Categories*/}
                        <div className="flex px-4 mt-3">
                        {cats?.map((c,i)=>(
                            <div key={i} className="flex justify-center items-center space-x-2 mr-4 bg-teal-200 px-2 py-1 rounded-md mt-2">
                            <p className="text-lg text-bold font-serif">{c}</p>
                            <p onClick={()=>deleteCategory(i)} className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"><ImCross/></p>
                            </div>
                        ))}
                        
                        </div>
                    </div>
                    <textarea onChange={(e)=>setDesc(e.target.value)} value={desc} rows={15} cols={30} className="px-4 py-2 outline-none" placeholder="Enter Post Description"/>
                    <button onClick={handleUpdate} className="bg-coral-700 w-full md:w-[20%] rounded-lg mx-auto text-black font-semibold px-4 py-2 md:text-xl text-lg ">UPDATE</button>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default EditPost