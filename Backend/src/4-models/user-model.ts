import Joi from "joi";
import RoleModel from "./role-model";

class UserModel {
    
    public user_id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public role: RoleModel;


    public constructor(user: UserModel) {
        this.user_id = user.user_id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;

    }

    public static validationSchema = Joi.object({
        user_id: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(30),
        lastName: Joi.string().required().min(2).max(30),
        username: Joi.string().required().min(4).max(30),
        password: Joi.string().optional().min(4),
        role: Joi.forbidden()

    });

    public validate(): string {
        const result = UserModel.validationSchema.validate(this);
        return result.error?.message;
    }

}

export default UserModel;