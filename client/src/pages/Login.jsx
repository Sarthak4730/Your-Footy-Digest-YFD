import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice.js";

const Login = () => {
    const dispatch = useDispatch();
    const {user, loading, error} = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData( (prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        } );
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        dispatch(login(formData));
    }

    return <>
        {user && <p>{user}</p>}
        <form className="bg-blue-400 w-1/3 flex flex-col h-96 mx-auto mt-40 justify-evenly items-center" onSubmit={handleSubmit}>
          <input className="w-1/2 rounded-2xl px-4 h-10 bg-white" type="email" placeholder="Enter Email" name="email" value={formData.email} onChange={handleChange}/>
          <input className="w-1/2 rounded-2xl px-4 h-10 bg-white" type="password" placeholder="Enter Password" name="password" value={formData.password} onChange={handleChange}/>
          <button className="bg-yellow-200 w-1/4 h-10 font-bold rounded-2xl cursor-pointer" type="submit" disabled={loading}>Login</button>
          {error && <p>{error}</p>}
        </form>
    </>
}

export default Login;