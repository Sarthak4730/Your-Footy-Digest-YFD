import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

    return <div className="h-screen pt-56">
        <div className="bg-purple-300 w-1/2 mx-auto h-1/2 flex flex-col justify-center items-center rounded-xl  gap-4">
            <h1 className="font-bold text-xl">LANDING Page - Your Footy Digest</h1>
            <div className="btns flex w-1/3 h-1/3 justify-evenly items-center">
                <button className="font-semibold bg-green-500 w-1/3 h-1/2 cursor-pointer hover:scale-110 transition rounded-xl" onClick={ () => { navigate("/register") } }> Register </button>
                <button className="font-semibold bg-orange-500 w-1/3 h-1/2 cursor-pointer hover:scale-110 transition rounded-xl" onClick={ () => { navigate("/login") } }> Login </button>
            </div>
        </div>
    </div>
}

export default Landing;