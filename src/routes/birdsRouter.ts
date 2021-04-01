import { Request, Response, NextFunction, Router } from 'express';

import {BirdModel} from '../models';

const birdsRouter = Router();

birdsRouter.use((_req: Request, _res: Response, next: NextFunction) => {
    console.log('Time: ', Date.now());
    next();
});

birdsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const bird = await BirdModel.findById(req.query.id);

        res.send(bird);
    } catch (err) {
        console.log('\n');
        console.error(err);
    }
});

birdsRouter.get('/list', async (_req: Request, res: Response) => {
    try {
        const birds = await BirdModel.find({});
        
        res.send(birds);
    } catch (err) {
        console.log('\n');
        console.error(err);
        res.send(err);
    }
});

birdsRouter.post('/create', async (req: Request, res: Response) => {
    try {
        const bird = await BirdModel.create(req.body);

        res.send(bird);
    } catch (err) {
        console.log('\n');
        console.error(err);
    }
});

birdsRouter.put('/update', async (req: Request, res: Response) => {
    try {
        const {name, description} = req.body;
        await BirdModel.update({_id: req.body.id}, {name, description});
        res.send();
    } catch (err) {
        console.log('\n');
        console.error(err);
        res.send(err);
    }
});

export { birdsRouter };