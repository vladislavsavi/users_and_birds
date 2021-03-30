import { Request, Response, NextFunction, Router } from 'express';

import { UserModel } from '../models';

const userRouter = Router();

userRouter.use((_req: Request, _res: Response, next: NextFunction) => {
    console.log('\n');
    console.log('USER Time: ', Date.now());
    next();
});

userRouter.post('/create', async (req: Request, res: Response) => {
    try {
        const { email, login, password } = req.body;
        const user = new UserModel({
            email,
            login,
            password
        });

        await user.save();
        res.send(user);
    } catch (err) {
        console.log('\n');
        console.error(err);
    }
});

userRouter.get('/get', async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.query.id);

        res.send(user);
    } catch (err) {
        console.log('\n');
        console.error(err);
    }
});

userRouter.get('/get/list', async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({});

        res.send(users);
    } catch (err) {
        console.log('\n');
        console.error(err);
    }
});

export { userRouter };