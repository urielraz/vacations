import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import { ResourceNotFoundErrorModel, UnauthorizedError, ValidationErrorModel } from "../4-models/error-models";
import UserModel from "../4-models/user-model";
import CredentialsModel from "../4-models/credentials-model";
import FollowModel from "../4-models/Follow-model";
import VacationModel from "../4-models/VacationModel";


async function GetAllFollowersByUser(user_id:number): Promise<VacationModel[]> {
    const sql = `SELECT vacations.vacation_id, vacations.description, vacations.destination, vacations.imageName, vacations.dateStart, vacations.dateEnd, vacations.price
    FROM vacations
    INNER JOIN followers
    ON vacations.vacation_id = followers.vacation_id
    WHERE followers.user_id = ${user_id}`;
    const data = await dal.execute( sql )
    return data;
}

async function getCountOfFollowersByVacation(vacation_id:number): Promise<number> {
    
    const sql = `SELECT COUNT ( DISTINCT user_id ) AS "COUNT" FROM followers WHERE vacation_id = ${vacation_id}`;
    const data = await dal.execute( sql )
    return data[0].COUNT;
}
async function ReturnFollowIdByUserAndVacation(user_id:number, vacation:number): Promise<number> {
    const sql = `SELECT * FROM followers WHERE user_id = ${user_id} AND vacation_id = ${vacation}`;
    const data = await dal.execute( sql )
    console.log(data[0]?.id)
    return data[0]?.id;
}


async function addfollower(follow: FollowModel): Promise<FollowModel> {


    const sql = `INSERT INTO followers VALUES(DEFAULT, ${follow.user_id}, ${follow.vacation_id})`;

    const info:OkPacket = await dal.execute(sql);
    follow.id = info.insertId;
    
    return follow;
}

async function removeFollower(follow: number): Promise<void> {

    const sql = `DELETE FROM followers WHERE id = ${follow}`;
    const info:OkPacket = await dal.execute( sql );

    if( info.affectedRows === 0){
        throw new ResourceNotFoundErrorModel( follow)
    }
}

async function removeFollowIdByUserAndVacation(user_id:number, vacation:number): Promise<void> {
    const sql = `DELETE FROM followers WHERE user_id = ${user_id} AND vacation_id = ${vacation}`;
    const info:OkPacket = await dal.execute( sql );

    if( info.affectedRows === 0){
        throw new ResourceNotFoundErrorModel(0)
    }
}



export default {
    addfollower,
    removeFollower,
    GetAllFollowersByUser,
    ReturnFollowIdByUserAndVacation,
    removeFollowIdByUserAndVacation,
    getCountOfFollowersByVacation
}