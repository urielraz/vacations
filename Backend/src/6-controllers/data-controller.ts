import express, {Request, Response, NextFunction } from "express";
import path from "path";
import fileHendler from "../2-utils/fileHendler";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import { FileNotFoundErrorModel } from "../4-models/error-models";
import VacationModel from "../4-models/VacationModel";
import dataLogic from "../5-logic/data-logic";

const router = express.Router() 

router.get('/vacations', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const data = await dataLogic.getAllVacations();
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})

// router.get('/vacations/:vacation_id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

//     try {
//         const vacation_id = +request.params.vacation_id;
//         const data = await dataLogic.GetImageByVacation(vacation_id);
//         response.json(data)
        
//     } catch (error) {
//         next(error)
//     }

// })

router.get('/vacations/:vacation_id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const vacation_id = +request.params.vacation_id;
        const data = await dataLogic.getOneVacation(vacation_id);
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})
router.get('/vacations/images/:imageName',  async (request: Request, response: Response, next: NextFunction) => {
    try {

        // get image name from the Route
        const imageName = request.params.imageName;

        // Check if file exists
        if (!fileHendler.fileExists(imageName)) throw new FileNotFoundErrorModel(imageName)

        // get absolute path of file in os
        const absolutePath = path.join(__dirname, '..', '1-assets', 'images', imageName)

        // responde the file to the front
        response.sendFile(absolutePath);


    } catch (error) {
        next(error)
    }
});


router.get('/vacations-by-user/:user_id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const user_id = +request.params.user_id;
        const data = await dataLogic.GetAllVacationsByUser(user_id);
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})

router.post('/vacations', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        
        // Take the image from Files and append it to thh body
        request.body.image = request.files?.image;


        const vacation = new VacationModel(request.body);
        const newVacation = await dataLogic.addNewVacation(vacation);
        response.status(201).json(newVacation)
    } catch (error) {
        next(error)
    }

})

router.delete('/vacations/:vacation_id([0-9]+)',verifyAdmin, async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const vacation_id = +request.params.vacation_id
        await dataLogic.deleteVacation(vacation_id);
        response.sendStatus(204)
        
    } catch (error) {
        next(error)
    }

})
router.patch("/vacations/:vacation_id", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacation_id = +request.params.vacation_id;
        request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body);
        const updatedVacation = await dataLogic.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});
export default router;