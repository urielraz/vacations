import express, {Request, Response, NextFunction } from "express";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import FollowModel from "../4-models/Follow-model";
import VacationModel from "../4-models/VacationModel";
import dataLogic from "../5-logic/data-logic";
import followersLogic from "../5-logic/followers-logic";

const router = express.Router() 

router.get('/followers/:user_id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const user_id = +request.params.user_id;
        const data = await followersLogic.GetAllFollowersByUser(user_id);
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})
router.get('/followers/getCountOfFollowersByVacation/:vacation_id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const vacation_id = +request.params.vacation_id;
        const data = await followersLogic.getCountOfFollowersByVacation(vacation_id);
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})
router.get('/followers/:user_id([0-9]+)/:vacation_id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const user_id = +request.params.user_id;
        const vacation_id = +request.params.vacation_id;
        const data = await followersLogic.ReturnFollowIdByUserAndVacation(user_id, vacation_id);
        response.json(data)
        
    } catch (error) {
        next(error)
    }

})

router.post('/followers',verifyLoggedIn, async( request: Request, response : Response, next : NextFunction ) => {

    try {
        
        // Take the image from Files and append it to thh body

        const follow = new FollowModel(request.body);
        const newFollow = await followersLogic.addfollower(follow);
        response.status(201).json(newFollow)
    } catch (error) {
        next(error)
    }

})

router.delete('/followers/:vacation_id([0-9]+)',verifyLoggedIn, async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const vacation_id = +request.params.vacation_id
        await followersLogic.removeFollower(vacation_id);
        response.sendStatus(204)
        
    } catch (error) {
        next(error)
    }

})

router.delete('/followers/:user_id([0-9]+)/:vacation_id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {

    try {
        const user_id = +request.params.user_id;
        const vacation_id = +request.params.vacation_id;
        await followersLogic.removeFollowIdByUserAndVacation(user_id, vacation_id);
        response.sendStatus(204)
        
    } catch (error) {
        next(error)
    }

})



export default router;