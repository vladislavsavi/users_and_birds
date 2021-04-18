import { Request, Response, NextFunction, Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { config } from '../config';

const authRouter = Router();

authRouter.use((_req: Request, _res: Response, next: NextFunction) => {
    console.log('\n');
    console.log('AUTH Time: ', Date.now());
    next();
});

/**
 * @swagger
 *  
 * /auth/signup:
 *   post:
 *     produces:
 *       - application/json
 *     summary: Registration
 *     description: Return user description
 *     tags:
 *       - /auth
 *     parameters:
 *       - name: email
 *         in: json
 *         required: true
 *         type: string
 *       - name: password
 *         in: json
 *         required: true
 *         type: string
 */
authRouter.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        res.json({
            message: 'Signup successful',
            user: req.user
        });
    }
);

/**
 * @swagger
 *
 * /auth/login:
 *  post:
 *     produces:
 *       - application/json
 *     summary: Authorization
 *     description: Return user token and user description
 *     tags:
 *       - /auth
 *     parameters:
 *       - name: email
 *         in: json
 *         required: true
 *         type: string
 *       - name: password
 *         in: json
 *         required: true
 *         type: string
 */
authRouter.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user) => {
                try {
                    if (err || !user) {
                        const error = new Error('An error occurred.');

                        return next(error);
                    }

                    req.login(
                        user,
                        { session: true },
                        async (error) => {
                            if (error) return next(error);

                            const body = { _id: user._id, email: user.email };
                            const token = jwt.sign({ user: body }, config.SECRET_KEY);


                            const { _id: id, email } = user;


                            return res.json({ token, userData: { id, email } });
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
);

export { authRouter };