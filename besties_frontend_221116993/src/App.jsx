import axios from "axios"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { setIndex } from "./app/indexSlice";
import { useCookies } from 'react-cookie';
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [cookies, setCookie] = useCookies(['currentUser']);
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    // Check if currentUser cookie exists
    if (cookies.currentUser) {
      navigate("/home");
    }
  }, [cookies.currentUser, navigate]);

  const submitForm = async (data) => {
    const request = await axios.get(`http://localhost:6969/api/get/${data.username}`);
    const result = request.data;

    if (result && result.password === data.password) {
      dispatch(setIndex(result))
      setCookie('currentUser',result)
      navigate("/home");
    }else if (!result){
      setMessage("Account not found !")
    }else{
      setMessage("Incorrect password !")
    }
  };

  return (
    <>
      <div className="w-5/6 mx-auto place-content-center flex items-center justify-center h-screen ">
        <div className=" w-3/12">
          <h1 style={{ color: "#00BE00" }} className="text-2xl text-center font-bold">
            LOGIN
          </h1>
          <br />
          <form method="POST" onSubmit={handleSubmit(submitForm)}>
            <div>
              <input {...register("username")} className="border-b border-neutral-300 w-full focus:outline-none" placeholder="Username" type="text" />
            </div>
            <br />
            <div>
              <input {...register("password")} className="border-b border-neutral-300 w-full focus:outline-none" placeholder="Password" type="password" />
            </div>
            <br />
            {
              message ? <div className="w-full bg-red-400 p-1.5 pl-3 text-white">{message}</div> : null
            }
            
            <button type="submit" className="p-1.5 px-4 bg-neutral-200 rounded-md my-5 w-full">
              Login
            </button>{" "}
            <br />
          </form>
          <Link to={"/register"}>
            <button className="p-1.5 px-4 bg-neutral-200 rounded-md w-full">Register</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default App;
