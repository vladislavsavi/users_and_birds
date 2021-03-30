import passport from 'passport';
import { Strategy,ExtractJwt } from 'passport-jwt'

import {UserModel} from '../models';

passport.use(
    new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret',
        issuer: 'accounts.examplesoft.com',
        audience: 'yoursite.net'
    }, async (jwt_payload, done) => {
        console.log(jwt_payload);
        try {
            console.log(jwt_payload);
            const user = await UserModel.find(jwt_payload).exec();
            done(user);
        } catch (err) {
            console.error(err);
        }
    })
);