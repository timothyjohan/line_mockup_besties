import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
export default function Navbar(){
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
    const navigate = useNavigate();
    
    const logout = () =>{
        removeCookie(['currentUser'])
        navigate("/")
    }
    return(
        <>
            <div className='fixed w-full top-0 z-40'>
                <div className="w-5/6 mx-auto py-5 grid grid-cols-3 items-center text-center">
                    <h1 className="text-xl font-medium">Welcome, {cookies.currentUser.username} !</h1>
                    <h1 style={{ color: "#00BE00" }} className='text-xl font-bold'>Besties</h1>
                    <div>
                        <button className='mx-5'>Reload</button>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
                    <hr className=' mx-auto drop-shadow-md' />

            </div>
        </>
    )
}