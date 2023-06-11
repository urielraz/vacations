import React from 'react';
import VacationModel from '../../../Models/VacationModel';
import  { useEffect, useState } from 'react';
import FollowModel from '../../../Models/Follow-model';
import followService from '../../../Services/FollowService';
import useAuth from '../../../Services/useAuth';
import notifyService from '../../../Services/NotifyService';
import appConfig from '../../../Utils/AppConfig';
import { NavLink } from 'react-router-dom';
import vacationsService from '../../../Services/VacationsService';
import { useForm } from 'react-hook-form';
import "./UpdateVacation.css"



interface VacationCardProps{
    vacation: VacationModel
}

function UpdateVacation(props:VacationCardProps): JSX.Element{

    // const [follow, setFollow] = useState<FollowModel[]>([]);
    const [toggle, setToggle] = useState(false)
    const [image, setImage] = useState<any>([])
    const { isAdmin, isUser } = useAuth();
    const { register, handleSubmit, setValue} = useForm<FollowModel>()

    const [count, setCount] =useState<number>(0)





    const { getUserId } = useAuth()
    const id = getUserId()
    const vId = props.vacation.vacation_id

    // async function fid () {
        
    //     const fId = await  followService.ReturnFollowIdByUserAndVacation(id, vId)
    //     return fId
    // }


    useEffect(()=>{

        followService.getCountOfFollowersByVacation(vId).then(count=>{setCount(count)})

        
            if(props.vacation.imageName){

            fetch(appConfig.vacationsUrl + 'images/' + props.vacation.imageName)
            .then(response => response.blob())
            .then(blob=>{
                const objectURL = URL.createObjectURL(blob);
                setImage(objectURL)
            })
        }


    },[])

    const del = async()=>{

        try {
            await vacationsService.deleteVacation(vId)
            alert('Vacation Deleted!')
            window.location.reload();

        } catch (error:any) {
            alert(error.message)
        }
        
    }

    return(

        
        <div className='VacataionCard'>
            
            ID: {props.vacation.vacation_id}< br />
            description: {props.vacation.description}< br />
            destination: {props.vacation.destination}< br />
            {/* imageName: {props.vacation.imageName}< br /> */}
            dateStart: {props.vacation.dateStart.slice(0,10)}< br />
            dateEnd: {props.vacation.dateEnd.slice(0,10)}< br />
            Price: {props.vacation.price}< br />
            {/* <button onClick={() => setToggle(!toggle)} >follow</button> */}

            {
                // <>
                //     <span>{user.firstName + " " + user.lastName}</span>
                //     <span> | </span>
                <NavLink to={"/vacations/edit/" + vId}>✍</NavLink>

                
                //     <span> | </span>
                //     <NavLink to="/logout">Logout</NavLink>
                // </>
            }

            <img src={image} alt="" height='200px' />

                       

             <button onClick={del}> Delete </button>

            <hr />

            {count} followers after this vacation



        </div>
    )
}

export default UpdateVacation;