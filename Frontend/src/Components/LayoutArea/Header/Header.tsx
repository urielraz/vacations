import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Menu from "../Menu/Menu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <Menu />
            <h1>Vacations</h1>
            <AuthMenu />
        </div>
    );
}

export default Header;
