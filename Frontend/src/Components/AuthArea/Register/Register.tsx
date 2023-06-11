import "./Register.css";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import useAuth from "../../../Services/useAuth";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

function Register(): JSX.Element {

    const { registerUser } = useAuth();

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function submit(user: UserModel) {
        try {
            await registerUser(user);
            notifyService.success("Welcome!");
            navigate("/home");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    

    return (
        <div className="Register">

            <form onSubmit={handleSubmit(submit)}>

                <label>
                    <span>First Name:</span>
                    <input type="text" {...register("firstName")} required autoFocus />
                </label>

                <label>
                    <span>Last Name:</span>
                    <input type="text" {...register("lastName")} required />
                </label>

                <label>
                    <span>Username:</span>
                    <input type="text" {...register("username")} required />
                </label>

                <label>
                    <span>Password:</span>
                    <input type="password" {...register("password")} required />
                </label>

        
                <button>Register</button>

            </form>

        </div>
    );
}

export default Register;