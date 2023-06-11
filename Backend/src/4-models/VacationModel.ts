import Joi from "joi";
import { UploadedFile } from "express-fileupload";


class VacationModel{
    
    public vacation_id:number;

    public description:string;

    public destination:string;

    public image: UploadedFile;
    public imageName: string;

    public dateStart:string;

    public dateEnd:string;

    public price:number;

    public followers:number;

    public constructor(vacation:VacationModel){
        this.vacation_id = vacation.vacation_id;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
        this.dateStart = vacation.dateStart;
        this.dateEnd = vacation.dateEnd;
        this.price = vacation.price;
        this.followers = vacation.followers;
    }
    public static validationSchema = Joi.object({
        vacation_id: Joi.number().integer().positive(),

        description: Joi.string().min(2).max(25).required(),

        destination: Joi.string().min(2).max(25).required(),
        
        image: Joi.object().optional(),
        imageName: Joi.string().optional(),
        
        dateStart: Joi.string().required(),

        dateEnd: Joi.string().required(),

        price: Joi.number().min(0).required(),

        followers: Joi.number(),
    })

    public validation(){
        const result = VacationModel.validationSchema.validate(this)
        return result.error?.message;
    }


}
export default VacationModel