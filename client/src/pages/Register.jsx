import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice.js";

const Register = () => {
    const dispatch = useDispatch();
    const {loading, error} = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        username: "",
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
        dispatch(register(formData));
    }

    return <>
        <form className="bg-blue-400 w-1/3 flex flex-col h-96 mx-auto mt-40 justify-evenly items-center" onSubmit={handleSubmit}>
          <input className="w-1/2 rounded-2xl px-4 h-10 bg-white" type="text" placeholder="Enter Username" name="username" value={formData.username} onChange={handleChange}/>
          <input className="w-1/2 rounded-2xl px-4 h-10 bg-white" type="email" placeholder="Enter Email" name="email" value={formData.email} onChange={handleChange}/>
          <input className="w-1/2 rounded-2xl px-4 h-10 bg-white" type="password" placeholder="Enter Password" name="password" value={formData.password} onChange={handleChange}/>
          <button className="bg-yellow-200 w-1/4 h-10 font-bold rounded-2xl cursor-pointer" type="submit" disabled={loading}>Register</button>
          {error && <p>{error}</p>}
        </form>
    </>
}

export default Register;