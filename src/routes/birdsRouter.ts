import { Request, Response, NextFunction, Router } from 'express';

const birdsRouter = Router();

birdsRouter.use((_req: Request, _res: Response, next: NextFunction) => {
    console.log('Time: ', Date.now());
    next();
});

birdsRouter.get('/', (_req: Request, res: Response) => {
    res.send('Birds home page');
});

birdsRouter.get('/about', (_req: Request, res: Response) => {
    res.send('About birds');
});

export { birdsRouter };