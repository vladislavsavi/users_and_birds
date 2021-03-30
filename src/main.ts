import express,
{
    Request,
    Response,
    Application,
    NextFunction,
} from 'express';
import db from 'mongoose';
import {json as jsonParse} from 'body-parser';

import { birdsRouter, userRouter } from './routes';

const app: Application = express();
const port: number = 8080;

db.connect('mongodb://localhost:27017/learn', {useNewUrlParser: true, useUnifiedTopology: true})

app.use(jsonParse());
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.use('/public', express.static(__dirname + '/public'));
app.use('/bird', birdsRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});