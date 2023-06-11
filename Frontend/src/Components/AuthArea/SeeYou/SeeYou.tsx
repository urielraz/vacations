import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import notifyService from "../../../Services/NotifyService";
import "./SeeYou.css";
import useAuth from "../../../Services/useAuth";
import { NavLink } from "react-router-dom";
import logo from "../../../Assets/Images/logo.jpg";


function SeeYou(): JSX.Element {

    const { login } = useAuth();

    // const { register, handleSubmit } = useForm<CredentialsModel>();
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
        <div className="SeeYou">

            <h2>Hope to see you again!</h2>
            <hr />

            <div>
                <span>If you want to login again click here: </span>
                <NavLink to="/login"> Login</NavLink>
                <hr />
                <img src={logo} width={500} alt='logo' />


            </div>
        </div>
    );
}

export default SeeYou;
