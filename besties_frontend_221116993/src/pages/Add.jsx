import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Navbar from "../componenents/Navbar";

export default function Add(){
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);


  const findUser = async data =>{
    const request = await axios.get(`http://localhost:6969/api/get/${data.username}`)
    if(cookies.currentUser.username != request.data.username){
        let check = []
        cookies.currentUser.friends.forEach(element => {
            if(element == request.data.id){
                check.push(element)
            }
        });
        if(check.length < 1){
            setUser(request.data)
        }

    }
  }

  const addUser = async () =>{
    const request = await axios.put(`http://localhost:6969/api/friend/${cookies.currentUser.id}/${user.id}`)
    alert(`${user.username} is now your friend !`);

  }

    return(
        <>
            <Navbar />

            <div>
                <Link to={"/home"}>
                    <img src="/back.png" className="h-8 w-10 mt-28 ml-20" />
                
                </Link>
                <div className="w-full h-screen items-center flex -mt-28">
                    <div className="mx-auto text-center">
                        {
                            user ? 
                            <>
                                <div className="mb-20">
                                    <div className="h-20 w-20 bg-neutral-400 mx-auto rounded-full text-neutral-400">.</div>
                                    <p>{user.username}</p>
                                    <button onClick={addUser} style={{ color: "#00BE00"  }} className="p-1 px-3 border border-solid border-neutral-200 my-5 rounded-xl">Add friend</button>
                                </div>
                            
                            </>
                            :
                            null
                        }
                        
                        <form onSubmit={handleSubmit(findUser)}>
                            <input {...register("username")} required type="username" placeholder="Username" className="border-b border-neutral-300 w-full focus:outline-none" />
                            <button className="p-1 px-3 bg-neutral-200 my-5 rounded-xl">Find</button>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}