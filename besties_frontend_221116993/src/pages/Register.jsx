import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Register(){
    const{register, handleSubmit} = useForm()
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(null)


    const submitRegis = async (data, e) =>{
        if(data.conf_pass != data.password){
            setMessage("Password mismatched !")
            return
        }else{
            await axios.post(`http://localhost:6969/api/${data.username}/${data.password}/${data.phone}`)
            setMessage(null)
            setSuccess(`${data.username} registered succesfully !`)
            
        }
        e.target.clear()
    }

    return(
        <>
            <div className="w-5/6 mx-auto place-content-center flex items-center justify-center h-screen ">
                <div className=" w-3/12">
                    <h1 style={{color: "#00BE00"}} className="text-2xl text-center font-bold">REGISTER</h1>
                    <br />
                    <form onSubmit={handleSubmit(submitRegis)}>
                        <div>
                            <input {...register("username")} className="border-b border-neutral-300 w-full focus:outline-none" placeholder="Username" type="text" />
                        </div>
                        <br />
                        <div>
                            <input className="border-b border-neutral-300 w-full focus:outline-none" required {...register("password")} placeholder="Password" type="password" />
                        </div>
                        <br />
                        <div>
                            <input className="border-b border-neutral-300 w-full focus:outline-none" required {...register("conf_pass")} placeholder="Confirm Password" type="password" />
                        </div>
                        <br />
                        <div>
                            <input className="border-b border-neutral-300 w-full focus:outline-none" required {...register("phone")} placeholder="Phone Number" type="phone"/>
                        </div>
                        <br />
                        {
                            message ? <div className="w-full bg-red-400 p-1.5 pl-3 text-white">{message}</div> : null
                        }
                        {
                            success ? <div className="w-full bg-green-400 p-1.5 pl-3 text-white">{success}</div> : null
                        }
                        <button type="submit" className="p-1.5 px-4 bg-neutral-200 rounded-md w-full my-5">Register</button><br />
                    </form>

                    <Link to={"/"}><button className="p-1.5 px-4 bg-neutral-200 rounded-md w-full">Login</button></Link>

                   
                    
                    

                </div>

            </div>
        </>
    )
}