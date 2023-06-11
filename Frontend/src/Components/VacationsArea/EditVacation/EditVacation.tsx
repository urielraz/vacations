import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/useAuth";
import notifyService from "../../../Services/NotifyService";
import useAuth from "../../../Services/useAuth";
import vacationsService from "../../../Services/VacationsService";
import VacationModel from "../../../Models/VacationModel";

// TODO: Replace all EditUser thing with watch credit card or something of a sort because we don't need to GET user via route params due to Redux.

function EditVacation(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();
    // const { getOneVacation, updateVacation } = vacationsService


    useEffect(() => {
        const vacation_id = +params.id;
        vacationsService.getOneVacation(vacation_id)
            .then(vaction => {
                setValue("vacation_id", vaction.vacation_id);
                setValue("description", vaction.description);
                setValue("destination", vaction.destination);
                setValue("image", vaction.image);
                setValue("dateStart", vaction.dateStart);
                setValue("dateEnd", vaction.dateEnd);
                setValue("price", vaction.price);
            })
            .catch(err => notifyService.error(err));
    }, []);

    async function submit(vacation: VacationModel) {
        console.log(vacation)
        try {

            await vacationsService.updateVacation(vacation);
            notifyService.success("Vacation Update!");

            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="EditVacation">

            <form onSubmit={handleSubmit(submit)}>

                <input type="hidden" {...register("vacation_id")} />

                <label>
                <span>description</span>
                    <input type="text" {...register('description')} required minLength={2} />
                    
                </label>

                <label>
                    <span>destination</span>
                    <input type="text" {...register('destination')}required />
                </label>

                <label>
                    <span>image</span>
                    <input type="file"  {...register('image')}/>
                </label>
               

                <label>
                    <span>dateStart</span>
                    <input type="date"   {...register('dateStart')}/>
                </label>

                <label>
                    <span>dateEnd</span>
                    <input type="date"  {...register('dateEnd')}/>
                </label>

                <label>
                    <span>Price</span>
                    <input type="number" step='0.01' {...register('price')} required/>
                </label>
               

                <button>Update</button>

            </form>

        </div>
    );
}

export default EditVacation;
