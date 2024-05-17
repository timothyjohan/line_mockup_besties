import axios from "axios";
import { useEffect, useState } from "react";

export default function FriendList(props){
    // console.log(props);
    const [latest, setLatest] = useState([])
    const fetchChat = async () =>{
        const chatReq = await axios.get(`http://localhost:6969/api/chats/${props.currentUser.id}/${props.element.id}`);
        setLatest(chatReq.data.chats)
    }
    useEffect(()=>{
        fetchChat()
        // console.log(latest[latest.length-1]);
    },[])
    return(
        <>
            <div className='w-5/6 h-16 p-2 px-4 border border-solid border-neutral-300 rounded-md mb-5'>
                <div className="grid grid-cols-10">
                    <h1 className="col-span-9">{props.element.username}</h1>
                    <div className="float-right text-right bg-gray-300 w-4 h-4 text-white rounded-full">.</div>

                </div>
                <p className='text-sm text-neutral-400'>{latest < 1 ? `Click to start chatting with ${props.element.username}` : latest[latest.length-1].context }</p>
            </div>
        </>
    )
}