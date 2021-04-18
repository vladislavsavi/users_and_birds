import express,
{
    Request,
    Response,
    Application,
    NextFunction,
} from 'express';
import db from 'mongoose';
import cors from 'cors';
import { json as jsonParse } from 'body-parser';
import passport from 'passport';
import dotenv from 'dotenv';

import { birdsRouter, userRouter, authRouter, swaggerRouter } from './routes';
import './authenticate';

dotenv.config();

const app: Application = express();
const port: number = 8080;
const port_db = process.env.NODE_ENV === 'production' ? process.env.DB_PORT : 27018;
const db_host = process.env.NODE_ENV === 'production' ? process.env.DB_CONTAINER : '0.0.0.0';

db.connect(`mongodb://${db_host}:${port_db}/data_base`, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors());
app.use(jsonParse());
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.use('/public', express.static(__dirname + '/public'));
app.use('/bird', birdsRouter);
app.use('/swagger-ui', swaggerRouter);
app.use('/user', passport.authenticate('jwt', { session: true }), userRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
