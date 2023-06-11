import Joi from "joi";
import RoleModel from "./role-model";

class FollowModel {
    
    public id: number;
    public user_id: number;
    public vacation_id: number;


    public constructor(follow: FollowModel) {
        this.id = follow.id;
        this.user_id = follow.user_id;
        this.vacation_id = follow.vacation_id;

    }

}

export default FollowModel;