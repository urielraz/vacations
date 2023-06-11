import axios from "axios";
import { useReducer } from "react"
import AuthContext from "../../../Context/AuthContext";
import { authReducer, AuthState } from "../../../Context/AuthReducer";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";



function Layout(): JSX.Element {

    const [auth, setAuth] = useReducer(authReducer, new AuthState());

    axios.interceptors.request.use(request => {
        if (auth.token) request.headers = { authorization: "Bearer " + auth.token }
        return request;
    });


    return (
        <div className="Layout">
            <AuthContext.Provider value={{ auth, setAuth }}>
                <Header />
                <main>
                    <Routing />
                </main>
            </AuthContext.Provider>
        </div>
    );
}

export default Layout;
