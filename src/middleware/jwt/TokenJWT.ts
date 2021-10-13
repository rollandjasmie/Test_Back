import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import db from '../../config/db'

require('dotenv').config();

const accessTokenSecret: string = process.env.JWT_ACCESS_TOKEN_SECRET || 'JKh78gh8kh';
const refreshTokenSecret: string = process.env.JWT_REFRESH_TOKEN_SECRET || 'encryptedsecret2';
const accessTokenExpiryTime: string = process.env.JWT_ACCESS_TOKEN_EXPIRETIME || '2H';




/**
 * Checks if a valid token is provided
 * @param req
 * @param res
 * @param next
 * @returns unauthorised error status if no valid token is provided
 */
export const verificationToken = (req: Request, res: Response, next: NextFunction): any => {

    let token: string = req.headers.authorization?.split(' ')[1] || '';

    if (token) {
        jwt.verify(token, accessTokenSecret, (error: any, decoded: any) => {
            if (error) {
                if (error.message === "jwt expired") {
                    return res.status(401).json({
                        error: true,
                        message: "Votre token n'ai plus valide,veuillez le réinitinaliser"
                    });
                }else if(error.message === "jwt malformed"){
                    return res.status(401).json({
                        error: true,
                        message: "Le token envoyer n'existe pas"
                    });

                }else{
                    return res.status(401).json({
                        error: true,
                        message: "Le token envoyer n'est pas conforme"
                    });
                }
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};


export const refreshTokens = (req: Request, res: Response):any => {

    let token: string = req.headers.authorization?.split(' ')[1] || '';

    if (token) {
        jwt.verify(token, refreshTokenSecret, async (error: any, decoded: any) :Promise<any> => {
            if (error) {
                if (error.message === "jwt expired") {
                    return res.status(401).json({
                        error: true,
                        message: "Votre token n'ai plus valide,veuillez le réinitinaliser"
                    });
                } else if (error.message === "jwt malformed") {
                    return res.status(401).json({
                        error: true,
                        message: "Le token envoyer n'existe pas"
                    });

                } else {
                    return res.status(401).json({
                        error: true,
                        message: "Le token envoyer n'est pas conforme"
                    });
                }
            } else {
                /** checked if the user still exists */

                let iduser: string = decoded.id;
                //verification if user exist from id
                const verification: any = await db.query('SELECT iduser FROM user WHERE iduser=?', [iduser]);
                if (verification.length === 0) {
                    return res.status(404).send({ message: "Le token n'est plus valide" })
                };
                console.log(iduser)
                //create new toker for user 
                let token: any = jwt.sign({ id: iduser }, accessTokenSecret, {
                    expiresIn: accessTokenExpiryTime
                });

                return res.status(200).json({
                    error: false,
                    tokens: {
                        token: token,
                    },
                });
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

