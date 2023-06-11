import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";
import UserModel from "../../../Models/UserModel";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const { auth } = useContext(AuthContext);
    const user: UserModel = auth.user;

    return (
        <div className="AuthMenu">
            {
                !user &&
                <>
                    <span>Hello Guest</span>
                    <span> | </span>
                    <NavLink to="/login">Login</NavLink>
                    <span> | </span>
                    <NavLink to="/register">Register</NavLink>
                </>
            }
            {
                user &&
                <>
                    <span>{"Weclcom "+ user.firstName + " " + user.lastName +"!"}</span>
                    <span> | </span>
                    <NavLink to="/logout">Logout</NavLink>
                </>
            }
        </div>
    );
}

export default AuthMenu;
