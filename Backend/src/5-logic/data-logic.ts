import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import fileHendler from "../2-utils/fileHendler";
import { v4 as uuidv4 } from "uuid";

import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import VacationModel from "../4-models/VacationModel";
import path from "path"

import fs from "fs"

async function getAllVacations(): Promise<VacationModel[]> {
    const sql = `SELECT * FROM vacations`;
    const data = await dal.execute( sql )
    return data;
}

async function getOneVacation(vacation_id: number): Promise<VacationModel> {
    const sql = `SELECT * FROM vacations WHERE vacation_id = ${vacation_id}`;
    const vacations = await dal.execute(sql);
    if (vacations.length === 0) throw new ResourceNotFoundErrorModel(vacation_id);
    const vacation = vacations[0];
    return vacation;
}

async function addNewVacation(vacation:VacationModel): Promise<VacationModel> {

    const err = vacation.validation();

    if(err) throw new ValidationErrorModel(err)

    console.log(vacation)

    if (vacation.image) {
        vacation.imageName = await fileHendler.saveFile(vacation.image);
        delete vacation.image;
    }

    const sql = `INSERT INTO vacations VALUES (DEFAULT,'${vacation.description}','${vacation.destination}','${vacation.imageName}','${vacation.dateStart}','${vacation.dateEnd}',${vacation.price})`;

    const info:OkPacket =  await dal.execute( sql )
    vacation.vacation_id = info.insertId;
    return vacation;
}

async function GetAllVacationsByUser(user_id:number): Promise<VacationModel[]> {
    const sql = `SELECT * FROM vacations WHERE user_id = ${user_id}`;
    const data = await dal.execute( sql )
    return data;
}
// async function GetImageByVacation(vacation_id:number): Promise<any> {
//     const sql = `SELECT imageName FROM vacations WHERE vacation_id = ${vacation_id}`;
//     const data = await dal.execute( sql )
//     return data;
// }

async function deleteVacation(id:number): Promise<void> {
     
    const sql = `DELETE FROM vacations WHERE vacation_id = ${id}`;
    const info:OkPacket = await dal.execute( sql );

    if( info.affectedRows === 0){
        throw new ResourceNotFoundErrorModel( id )
    }

}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    console.log(vacation)

    if (vacation.image) {
        // Delete file
        if (fs.existsSync("./src/1-assets/images/" + vacation.imageName)) {
           fs.unlinkSync("./src/1-assets/images/" + vacation.imageName)
       }
        vacation.imageName = await fileHendler.saveFile(vacation.image);
        delete vacation.image;


        // vacation.imageName = await fileHendler.saveFile(vacation.image);
        // delete vacation.image;
    }

    // const sql = `INSERT INTO vacations VALUES (DEFAULT,'${vacation.description}','${vacation.destination}','${vacation.imageName}','${vacation.dateStart}','${vacation.dateEnd}',${vacation.price})`;

    // const info:OkPacket =  await dal.execute( sql )
    // vacation.vacation_id = info.insertId;


    //

    const err = vacation.validation();

    if(err) throw new ValidationErrorModel(err)

    // console.log(vacation);
    
    // if (vacation.image) {

       

        // // Extract ext 
        // const ext = path.extname(vacation.image.name);
        // vacation.imageName = uuidv4() + ext;
        // await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        // delete vacation.image;
    // }


    
    const sql = `UPDATE vacations SET description = '${vacation.description}', destination = '${vacation.destination}', imageName = '${vacation.imageName}', dateStart = '${vacation.dateStart}', dateEnd = '${vacation.dateEnd}', price = ${vacation.price} WHERE vacation_id = ${vacation.vacation_id}`
    ;


    const info:OkPacket =  await dal.execute( sql )
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacation_id);
    return vacation;
}



export default {
    getAllVacations,
    addNewVacation,
    GetAllVacationsByUser,
    deleteVacation,
    updateVacation,
    // GetImageByVacation,
    getOneVacation

}