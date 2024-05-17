import { Link, Outlet } from "react-router-dom";
import Navbar from "../componenents/Navbar";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import FriendList from '../componenents/FriendList';

export default function Home(){
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
    const [friends, setFriends] = useState([])
    const [friendSearch, setFriendSearch] = useState([])
    


    const fetchFriends = async () =>{
        let request = await axios.get(`http://localhost:6969/api/get/allFriends/${cookies.currentUser.username}`)
        setFriends(request.data.friends)
        setFriendSearch(request.data.friends)
    }

    useEffect(()=>{
        fetchFriends()
    },[])

    const findFriend = (keyword) =>{
        const newFriends = friends.filter(element => element.username.toLowerCase().includes(keyword.toLowerCase()));
        setFriendSearch(newFriends)
    }

    return(
        <>
            <Navbar/>
            <div className="w-5/6 mx-auto grid grid-cols-5 h-screen ">
                <div className="col-span-2 border-r-2 border-neutral-200 border-solid mt-20">
                    <div className=" w-11/12 mx-auto mt-5 flex justify-between">
                        <h1 className="text-xl font-medium">Home</h1>
                        
                        <Link to={"/add"}>
                            <button className="">Add Friend</button>

                        </Link>
                    </div>
                    <div>
                    <input onChange={(e) => findFriend(e.target.value)} className="border-b border-neutral-300 w-5/6 focus:outline-none mt-8" placeholder="Search . . ." type="text" />

                    </div>


                    <div className='mt-5'>

                        {
                            friends.length < 1 ? 
                            <>
                                <h1 className='text-center'>You don't have any friends yet </h1>
                            </> 
                            : 
                            friendSearch.map((element) => {
                                return <Link to={`/chat/${cookies.currentUser.id}/${element.id}`}><FriendList element = {element} currentUser = {cookies.currentUser}/></Link>
                            })
                        }

                        

                    </div>

                </div>
                <div className="col-span-3 mt-20">
                    <Outlet/>
                </div>
            </div>
            
            
        </>
    )
}