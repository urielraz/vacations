import "./Home.css";
import logo from "../../../Assets/Images/logo.jpg";
import useAuth from "../../../Services/useAuth";
import { useNavigate } from "react-router-dom";
import  { useEffect, useState ,useContext} from 'react';
import notifyService from "../../../Services/NotifyService";
// import { useContext } from "react";


import AuthContext from "../../../Context/AuthContext";
import UserModel from "../../../Models/UserModel";


function Home(): JSX.Element {
    const { auth } = useContext(AuthContext);
    const user: UserModel = auth.user;

    // const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user)
        if(!user){
            // notifyService.error("You must logged in!");

            navigate("/login");
            return
        }

     }, []);
    

    return (
        <div className="Home">
            {/* <h3>החופשה הבאה שלך מתחילה כאן</h3> */}
            <img src={logo} width={800} alt='logo' />
            
        </div>
    );
}

export default Home;
