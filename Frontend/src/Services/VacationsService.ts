import axios from "axios";
// import FollowModel from "../Models/Follow-model";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";

class VacationsService {

    public async getAllVacations(): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
        const vacations = response.data;
        return vacations;
    }
    // public async GetImageByVacation(vacation_id:number): Promise<string> {
    //     const response = await axios.get<string>(appConfig.vacationsUrl + 'images/' + );
    //     const vacations = response.data;
    //     return vacations;
    // }

    public async addVacation(vacation:any):Promise<VacationModel>{
        const response = await axios.post(appConfig.vacationsUrl, vacation);
        const newVacation = response.data;
        return newVacation;
    }
    // public async addFollow(follow:FollowModel):Promise<FollowModel>{
    //     const response = await axios.post(appConfig.followUrl, follow);
    //     const newFollow = response.data;
    //     return newFollow;
    // }
    // public async deleteFollow(follow:number):Promise<void>{
    //     await axios.delete(appConfig.followUrl + follow)
    // }
    public async deleteVacation(vacation_id:number):Promise<void>{
        await axios.delete(appConfig.vacationsUrl + vacation_id)
    }

    public async updateVacation(vacation:any):Promise<VacationModel>{
        const response = await axios.patch(appConfig.vacationsUrl + vacation.vacation_id, vacation);
        const newVacation = response.data;
        return newVacation;
    }

    public async  getOneVacation(vacation_id: number): Promise<VacationModel> {
        const response = await axios.get<VacationModel>(appConfig.vacationsUrl + vacation_id);
        const vacation = response.data;
        return vacation;
    }

}

const vacationsService = new VacationsService();

export default vacationsService;
