import { useEffect, useState } from "react";
import "./Add.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";


function Add(): JSX.Element {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: {errors}} = useForm<VacationModel>()

    
    
    
    
    
    
    // const fileChange =(e:any)=>{
        //     console.log(e.target.files[0]);
        //     if(e.target && e.target.files[0])
        //     formData.append("file", e.target.files[0])
        
        
    // }
    const save = async (e:VacationModel):Promise<void> => {
        try {
            console.log(e);
            
            const formData = new FormData();
            formData.append("description", e.description)
            formData.append("destination", e.destination)
            formData.append("image", e.image[0])
            formData.append("dateStart", e.dateStart)
            formData.append("dateEnd", e.dateEnd)
            formData.append("price", e.price.toString())

            // {...register("image")}

            await vacationsService.addVacation(formData)
            notifyService.success("Add Vacation succses!");

            navigate('/vacations');
        } catch (error: any) {
            alert( error.message )
        }
    }

   
    

    return (
        <div className="Add">

            <h2>Add New Vacation</h2>

            <form onSubmit={handleSubmit(save)}>

           

                <label>
                    <span>description</span>
                    <input type="text" name="description" {...register('description')} required minLength={2} />
                    

                </label>

                <label>
                    <span>destination</span>
                    <input type="text" name="destination" {...register('destination')} required/>
                </label>

                <label>
                    <span>image</span>
                    <input type="file"  name="image" {...register("image")}  />
                </label>    

                <label>
                    <span>dateStart</span>
                    <input type="date" name="dateStart" {...register('dateStart')} required/>
                </label>
                <label>
                    <span>dateEnd</span>
                    <input type="date" name="dateEnd"  {...register('dateEnd')} required/>
                </label>
                <label>
                    <span>Price</span>
                    <input type="number" name="price" step='0.01' {...register('price')} required/>
                </label>
               

                <button>Send</button>


            </form>
			
        </div>
    );
}

export default Add;
