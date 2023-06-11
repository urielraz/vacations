import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";
import useAuth from "../../../Services/useAuth";
import { NavLink } from "react-router-dom";

function Login(): JSX.Element {

    const { login } = useAuth();

    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function submit(credentials: CredentialsModel) {
        try {
            await login(credentials);
            notifyService.success("Welcome Back!");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(submit)}>

                <label>
                    <span>Username:</span>
                    <input type="text" {...register("username")} required autoFocus />
                </label>

                <label>
                    <span>Password:</span>
                    <input type="password" {...register("password")} required />
                </label>
                <button>Login</button>

            </form>

            <hr />

            <div>
                <span>Not registered yet?</span>
                <NavLink to="/register">Register Now</NavLink>

            </div>
        </div>
    );
}

export default Login;
