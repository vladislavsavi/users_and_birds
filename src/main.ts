import express,
{
    Request,
    Response,
    Application,
    NextFunction,
} from 'express';
import db from 'mongoose';
import {json as jsonParse} from 'body-parser';
import passport from 'passport';
import dotenv from 'dotenv';

import { birdsRouter, userRouter, authRouter } from './routes';
import './authenticate';

dotenv.config()

const app: Application = express();
const port: number = 8080;
const port_db = process.env.NODE_ENV === 'production' ? process.env.DB_PORT : 27018

db.connect(`mongodb://localhost:${port_db}/data_base`, {useNewUrlParser: true, useUnifiedTopology: true})

app.use(jsonParse());
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.use('/public', express.static(__dirname + '/public'));
app.use('/bird', birdsRouter);
app.use('/user', passport.authenticate('jwt', {session: false}), userRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});