import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";
import VacationsList from "../../VacationsArea/vacationList/VacationList";
import Add from "../../VacationsArea/Add/Add";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import SeeYou from "../../AuthArea/SeeYou/SeeYou";
import Reports from "../../VacationsArea/Reports/Reports";
// import Reports from "../../VacationsArea/Reports/Reports";
// import { Reports2 } from "../../VacationsArea/Reports/Reports2";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/SeeYou" element={<SeeYou />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/home" element={<Home />} />
                <Route path="/vacations" element={<VacationsList />} />
                <Route path="/vacations/edit/:id" element={<EditVacation />} />
                <Route path="/add" element={<Add />} />
                {/* <Route path="/update" element={<UpdateVacation />} /> */}
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/reports" element={<Reports />} />

            </Routes>
        </div>
    );
}

export default Routing;
