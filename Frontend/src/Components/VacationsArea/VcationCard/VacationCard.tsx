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
import "./VacationCard.css"
// import Follow from '../Follow/Follow';



interface VacationCardProps{
    vacation: VacationModel
}

function VcationCard(props:VacationCardProps): JSX.Element{

    // const [follow, setFollow] = useState<FollowModel[]>([]);
    const [toggle, setToggle] = useState(false)
    const [image, setImage] = useState<any>([])
    const { isAdmin, isUser } = useAuth();
    const [btnFollow, setBtnFollow] = useState(false);
    const { register, handleSubmit, setValue} = useForm<FollowModel>()
    const [followers, setFollowers] = useState<number>(0);
    const [newFollowers, setNewFollowers] = useState<FollowModel>();
    const [textBtn, setTextBtn] = useState<string>( '+ Follow' );
    const [className, setClassName] = useState('follow-button')

    const [count, setCount] =useState<number>(0)






    const { getUserId } = useAuth()
    const uId = getUserId()
    const vId = props.vacation.vacation_id




    useEffect(()=>{
        // let id=0
        // followService.ReturnFollowIdByUserAndVacation(uId, vId).then(f=> id=f)

        // console.log(id)
        
        // if(id){
        //     setToggle(true)
        // }
        // else{
        //     setToggle(false )
        // }
        followService.getCountOfFollowersByVacation(vId).then(count=>{setCount(count)})

        console.log(count);
        

        followService.ReturnFollowIdByUserAndVacation(uId, vId)
        .then(followers =>{
            setFollowers(followers);
            // console.log(followers);
            setValue("id", followers);

            
            followers && setTextBtn('Following');
            followers && setClassName(className + ' click');
        })
        .catch(err => notifyService.error(err)) 

        setValue("user_id", uId);
        setValue("vacation_id", vId);
        
     
        if(props.vacation.imageName){

            fetch(appConfig.vacationsUrl + 'images/' + props.vacation.imageName)
            .then(response => response.blob())
            .then(blob=>{
                const objectURL = URL.createObjectURL(blob);
                setImage(objectURL)
            })
        }

     
     


    },[])

    // async function blabla() {
        
    //     const id = await followService.ReturnFollowIdByUserAndVacation(uId,vId)
    //     console.log(id);
        
        
    // setValue("id",id );
   
               
    // }
    // blabla()


     
    // const follow = async () => { 
    //     if(!btnFollow && !followers){
    //         setBtnFollow(true);
    //     try {
    //         const newFollowers = await followService.addFollow();
    //         setNewFollowers(newFollowers);
    //         setClassName(className + ' click'); 
    //         setTextBtn('Following');                      
    //     } catch (error) {
    //         notifyService.error(error);
    //     } finally{
    //         return;
    //     }};

    //     setBtnFollow(false);
        
    //     try {
    //         await followService.followDown(newFollowers?.followId || followers);
    //         setFollowers(0);
    //         setNewFollowers(null);
    //         setClassName('follow-button')
    //         setTextBtn('+ Follow');
    //     } catch (error) {
    //         notifyService.error(error);
    //     }
    // };

    

    const follow2 = async(follow:FollowModel)=>{
        console.log(follow);
        
        if(!btnFollow && !followers){
            setBtnFollow(true);
        try {
            const newFollowers = await followService.addFollow(follow);
            notifyService.success("follow added!");
            // window.location.reload();

            setNewFollowers(newFollowers);
            setClassName(className + ' click'); 
            setTextBtn('Following');                      
        } catch (error) {
            notifyService.error(error);
        } finally{
            return;
        }};

        setBtnFollow(false);
        
        try {
            await followService.deleteFollow(newFollowers?.id|| followers);
            notifyService.error("follow deleted!");
            setFollowers(0);
            setNewFollowers(null);
            setClassName('follow-button')
            setTextBtn('+ Follow');
        } catch (error) {
            notifyService.error(error);
        }
        // try {

        //     // const followID:number = await followService.ReturnFollowIdByUserAndVacation(id, vId)
        //     // console.log(followID)
        //     if(!toggle){
        //         await followService.ReturnFollowIdByUserAndVacation(uId, vId)
        //         console.log("נמחק")
        //         notifyService.success("follow deleted!");
        //         setToggle(true)
        //         // window.location.reload();
                
        //         // alert('delet follow!')
        //     }
        //     else{
                
        //         await followService.addFollow(follow)
        //         notifyService.success("follow added!");
        //         console.log("נוסף!")
        //         setToggle(false)
        //         // alert('follow!')
        //     }

        // } catch (error:any) {
        //     alert(error.message)
        // }

    }

    return(

        
        <div className='VacataionCard'>
            
            description: {props.vacation.description}< br />
            destination: {props.vacation.destination}< br />
            dateStart: {props.vacation.dateStart.slice(0,10)}< br />
            dateEnd: {props.vacation.dateEnd.slice(0,10)}< br />
            Price: {props.vacation.price}< br />


            <img src={image} alt="" height='200px' />

            {
            <form onSubmit={handleSubmit(follow2)}>

                 <label>
                    <input hidden type="number" {...register('id')} />
                </label>
                 <label>
                    <input hidden type="number" {...register('user_id')} />
                </label>

                <label>
                    <input hidden type="number" {...register('vacation_id')} />
                </label>
      
                {/* <button onClick={() => setToggle(!toggle)}>Set {toggle && 'Un'}Follow</button> */}
                
                
                {/* <button onClick={  vacation.map( v => <VcationCard key={v.vacation_id} vacation={v} /> }>Set {toggle && 'Un'}Follow</button> */}

                <button className={className}>{textBtn}</button>

            </form>
            }
             
            <hr />

            {count} followers after this vacation
        </div>
    )
}

export default VcationCard;