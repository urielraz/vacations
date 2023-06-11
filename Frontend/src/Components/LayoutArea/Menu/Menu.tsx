import { log } from "console";
import { NavLink } from "react-router-dom";
import useAuth from "../../../Services/useAuth";
import "./Menu.css";

function Menu(): JSX.Element {

    const { isLoggedIn } = useAuth();
    const { isAdmin } = useAuth();


    return (
        <div className="Menu">
            <NavLink to="/home">Home</NavLink>

            {isLoggedIn() &&
                <>
                    <span> | </span>
                    <NavLink to="/vacations">Vacations</NavLink>
                </>
            }

            {
                isAdmin() &&
                <>
                <span> | </span>
                <NavLink to="/add">Add</NavLink>
                <span> | </span>
                <NavLink to="/Reports">Reports</NavLink>
                </>
            }

        </div>
    );
}

export default Menu;
