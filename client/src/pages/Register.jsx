import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { register } from "../features/auth/authSlice.js";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, error} = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [eyeClosed, setEyeClosed] = useState(true);    

    const handleChange = (e) => {
        setFormData( (prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        } );
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await dispatch( register(formData) ).unwrap();
            navigate("/select-favs");
        } catch (err) {
            console.error("Registration Failed - Error: ", err);
        }
    }

    return <div className="h-screen flex flex-col items-center justify-evenly">
        <h1 className="text-3xl font-bold">Register a new account</h1>

        <form className="bg-blue-400 w-80 md:w-1/3 flex flex-col h-96 mx-auto justify-evenly items-center rounded-xl" onSubmit={handleSubmit}>
          <input className="text-sm w-64 md:w-1/2 rounded-2xl px-4 h-10 bg-white" type="text" placeholder="Enter Username" name="username" value={formData.username} onChange={handleChange}/>
          <input className="w-64 md:w-1/2 rounded-2xl px-4 h-10 bg-white" type="email" placeholder="Enter Email" name="email" value={formData.email} onChange={handleChange}/>
          <div className="password-box w-64 relative">
            <input className="w-full rounded-2xl px-4 h-10 bg-white" type={eyeClosed ? "password" : "text"} placeholder="Enter Password" name="password" value={formData.password} onChange={handleChange}/>
            <button type="button" className="absolute text-2xl right-2.5 top-2.5 cursor-pointer" onClick={ () => setEyeClosed(prev => !prev) }> {eyeClosed ? <LuEyeClosed/> : <LuEye/>} </button>
          </div>
          <button className="bg-yellow-200 w-1/3 md:w-1/4 h-10 font-bold rounded-2xl cursor-pointer hover:scale-110 transition" type="submit" disabled={loading}>Register</button>
          {error && <span className="text-red-500 bg-black font-bold w-1/2 text-center p-2">{error}</span>}
        </form>

        <p>Already have an account? <Link className="font-bold underline text-violet-600 text-xl" to="/login">Login</Link></p>
    </div>
}

export default Register;