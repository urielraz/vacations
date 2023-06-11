import axios from "axios";
import FollowModel from "../Models/Follow-model";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";
import { useContext } from 'react';
import FollowContext from "../Context/FollowContext";

class FollowService {
    

    public async GetAllFollowersByUser(user_id : number): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(appConfig.followUrl + user_id);
        const followers = response.data;
        return followers;
    }
    public async getCountOfFollowersByVacation(vacation_id:number): Promise<number>  {
        const response = await axios.get<number>(appConfig.followUrl + "getCountOfFollowersByVacation" + "/" + vacation_id);
        const followers = response.data;
        return followers;
    }
    public async ReturnFollowIdByUserAndVacation(user_id : number, vacation:number): Promise<number> {
        const response = await axios.get<number>(appConfig.followUrl + user_id + "/" + vacation);
        const follow = response.data;
        return follow;
    }

    public async addFollow(follow:FollowModel):Promise<FollowModel>{
        const response = await axios.post(appConfig.followUrl, follow);
        const newFollow = response.data;
        return newFollow;
    }
    public async deleteFollow(follow:number):Promise<void>{
        await axios.delete(appConfig.followUrl + follow)
    }
    public async deleteFollowIdByUserAndVacation(user_id : number, vacation:number):Promise<void>
     {
        await axios.delete(appConfig.followUrl + user_id + "/" + vacation)

        // const response = await axios.get<number>(appConfig.followUrl + user_id + "/" + vacation);
        // const follow = response.data;
        // return follow;
    }


}

const followService = new FollowService();

export default followService;

// const { follow, setFollow } = useContext(FollowContext)

// function useFollow(){

//     async function GetAllFollowersByUser(user_id : number): Promise<VacationModel[]> {
//         const response = await axios.get<VacationModel[]>(appConfig.followUrl + user_id);
//         const followers = response.data;
//         return followers;
//     }
//     async function ReturnFollowIdByUserAndVacation(user_id : number, vacation:number): Promise<number> {
//         const response = await axios.get<number>(appConfig.followUrl + user_id + "/" + vacation);
//         const follow = response.data;
//         return follow;
//     }

//     async function addFollow(follow:FollowModel):Promise<FollowModel>{
//         const response = await axios.post(appConfig.followUrl, follow);
//         const newFollow = response.data;
//         return newFollow;
//     }
//     async function deleteFollow(follow:number):Promise<void>{
//         await axios.delete(appConfig.followUrl + follow)
//     }

//     return{
//         GetAllFollowersByUser,
//         ReturnFollowIdByUserAndVacation,
//         addFollow,
//         deleteFollow
        
//     }
// }
// export default useFollow;