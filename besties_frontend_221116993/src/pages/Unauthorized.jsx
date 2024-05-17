import { Link } from "react-router-dom";

export default function Unauthorized(){

    return(
        <>
            <div className="w-screen h-screen items-center flex">
                <div className="mx-auto">
                    <h1 className="font-bold text-4xl">403 Unauthorized Access</h1>
                    <Link to="/">
                        <button className="bg-neutral-200 py-1.5 px-4 rounded-md my-5 mx-auto block">Go back</button>
                    
                    </Link>
                </div>
            </div>
        </>
    )
}