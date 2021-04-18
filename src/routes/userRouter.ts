import { Request, Response, NextFunction, Router } from 'express';
import passport from 'passport';

import { UserModel } from '../models';

const userRouter = Router();

userRouter.use((_req: Request, _res: Response, next: NextFunction) => {
    console.log('\n');
    console.log('USER Time: ', Date.now());
    next();
});

/**
 * @swagger
 * /user?id={id}:
 *   get:
 *     summary: Get user by id
 *     description: This will return the user if you have a session token
 *     tags:
 *       - /user
 *     responses:
 *       200:
 *         description: that user
 *         schema:
 *           type: object
 *           properties:
 *             bird:
 *               type: object
 *               description: that user
 */
userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.query.id);

        res.send(user);
    } catch (err) {
        console.log('\n');
        console.error(err);
    }
});

/**
 * @swagger
 * /user/list:
 *   get:
 *     summary: Get a list of users
 *     description: This will return a list of users if you have a session token
 *     tags:
 *       - /user
 *     responses:
 *       200:
 *         description: list of users
 *         schema:
 *           type: object
 *           properties:
 *             bird:
 *               type: object
 *               description: list of users
 */
userRouter.get('/list', async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({});

        res.send(users);
    } catch (err) {
        console.log('\n');
        console.error(err);
    }
});

export { userRouter };