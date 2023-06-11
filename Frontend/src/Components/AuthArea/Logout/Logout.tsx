import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import useAuth from "../../../Services/useAuth";

function Logout(): JSX.Element {

    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        notifyService.success("Bye Bye...");
        navigate("/SeeYou");
    }, []);

    return null;
}

export default Logout;
