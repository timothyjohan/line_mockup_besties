import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom"
import { io } from "socket.io-client";

export default function Chat(){
    const paramID = useParams()
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
    const [friend, setFriend] = useState()
    const [chats, setChats] = useState([])
    const [pin, setPin] = useState(false)
    const [reaction, setReaction] = useState(false)
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const chatContainerRef = useRef(null);
    if(paramID.idUser != cookies.currentUser.id){
        navigate("/error")
    }
    // Initialize socket only if it hasn't been created yet
    const [socket, setSocket] = useState(null);

    const createSocketConnection = () => {
        const newSocket = io("http://localhost:6969");
        setSocket(newSocket);

        newSocket.on("receive_message", (data) => {
            console.log(data.message);
            fetchChat();
        });
    };


    const fetchChat = async () => {
        const request = await axios.get(`http://localhost:6969/api/get/user/${paramID.idFriend}`);
        const chatReq = await axios.get(`http://localhost:6969/api/chats/${paramID.idUser}/${paramID.idFriend}`);
        setFriend(request.data);
        setChats(chatReq.data.chats);
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const displayPinned = async () =>{
        setPin(!pin)
        if(!pin){
            const chatReq = await axios.get(`http://localhost:6969/api/chats/pinned/${paramID.idUser}/${paramID.idFriend}`);
            setChats(chatReq.data.chats);
        }else{
            const chatReq = await axios.get(`http://localhost:6969/api/chats/${paramID.idUser}/${paramID.idFriend}`);
            setChats(chatReq.data.chats);
            
        }
    }

    useEffect(()=>{
        scrollToBottom()
    },[chats])

    useEffect(() => {
        // Connect to Socket.IO if not already connected
        if (!socket) {
            createSocketConnection();
        }
        
        fetchChat();
    }, [paramID, socket]);

    const sendMessage = async (data, e) => {
        await axios.post(`http://localhost:6969/api/chats/${paramID.idUser}/${paramID.idFriend}/${data.message}`);
        
        if (socket) {
            socket.emit("send_msg", { message: `${data.message}` });
        }

        e.target.reset();
    };

    const togglePin = async (id) =>{
        const request = await axios.post(`http://localhost:6969/pin/chat/${id}`)
        
    }

    
    return(
        <>
            <div style={{backgroundColor: "#8CABD8"}} className="py-2 ">
            <nav className="flex items-center justify-between ml-3">
                <div className="flex">
                    <Link to={"/home"}>
                        <img className="mt-3 h-5 w-7" src="/back.png" alt="" />
                    </Link>
                    
                    {!friend ? (
                        <h1>Loading . . .</h1>
                    ) : (
                        <h1 className="text-xl p-2 font-medium">{friend.username}</h1>
                    )}

                </div>
                <button>
                    <div className="flex" onClick={displayPinned}>
                        <p className="font-medium">Pinned</p>
                        <img src="/pin.png" className="w-5 h-5 mx-5" />

                    </div>
                </button>
            </nav>
                <hr style={{borderColor: "#8CABF8"}} className="drop-shadow-md"/>
                <div style={{height: "70vh"}} className="overflow-x-auto" ref={chatContainerRef}>

                    {
                        chats.map((elements)=>{
                            // console.log(elements);
                            if(elements.from == paramID.idUser){
                                
                                return(
                                    <>
                                        <div className="">
                                            <div onDoubleClick={()=>togglePin(elements.id)} style={{backgroundColor: "#79E278"}} className="m-8 ml-auto bg-white p-2 px-3 w-fit max-w-lg rounded-3xl rounded-tr-none">
                                                {elements.context}
                                            </div>
                                            <div className="flex">
                                                <div className={`border border-solid 20 rounded-xl ml-auto mr-2 px-4 -mt-5 bg-white transition-all ${reaction ? 'scale-100' : 'scale-0' } `}>😀 😂 😍 X</div>
                                                <div onClick={()=>setReaction(!reaction)} className="border border-neutral-700 border-solid h-4 w-4 rounded-full mr-10 -mt-5 text-transparent">.</div>
                                                
                                            </div>
                                            

                                        </div>
                                    </>
                                )
                            }else{
                                return(
                                    <>
                                        <div onDoubleClick={()=>togglePin(elements.id)} className="m-8 bg-white p-2 px-3 w-fit max-w-lg rounded-3xl rounded-tl-none">
                                            {elements.context}
                                        </div>
                                    </>
                                )
                            }
                        })
                    }
                    
                </div>
                
            </div>
            <form onSubmit={handleSubmit(sendMessage)}>
                <div className="w-full grid grid-cols-10 mt-5">
                        <button className="text-xl font-bold text-gray-600 mx-3">+</button>
                        <button className="text-xl font-bold text-gray-600 mx-3"><img className="w-8 h-8 mx-auto" src="/image.png" alt="" srcset="" /></button>
                        <input type="text" placeholder="Write something . . ." {...register("message")} className="bg-neutral-200 mx-auto col-span-7 w-full rounded-xl p-2 focus:outline-none"/>
                        <button type="submit" style={{ backgroundColor: "#79E278" }} className="rounded-xl ml-4">Send</button>
                </div>

            </form>
        </>
    )
}