import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import FriendList from '../componenents/FriendList';
export default function ActualHome(){
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
    const [friends, setFriends] = useState([])
    

    const fetchFriends = async () =>{
        let request = await axios.get(`http://localhost:6969/api/get/allFriends/${cookies.currentUser.username}`)
        setFriends(request.data.friends)
    }

    useEffect(()=>{
        fetchFriends()
    },[])


    return(
        <>
            <div className="w-5/6 mx-auto grid grid-cols-5 h-screen">
                <div className="col-span-2 border-r-2 border-neutral-200 border-solid mt-20">
                    <div className=" w-11/12 mx-auto mt-5 flex justify-between">
                        <h1 className="text-xl font-medium">Home</h1>
                        <button className="">Add Friend</button>
                    </div>


                    <div className='mt-5'>

                        {
                            friends.length < 1 ? 
                            <>
                                <h1 className='text-center'>You don't have any friends yet </h1>
                            </> 
                            : 
                            friends.map((element) => {
                                return <FriendList {...element} />
                            })
                        }

                        

                    </div>

                </div>
                <div className="bg-yellow- col-span-3 mt-20">
                    <div className='place-content-center flex items-center justify-center h-full'>
                        <h1 className='font-medium'>No chats selected</h1>
                        
                    </div>
                </div>
            </div>
        </>
    )
}