import { Request, Response, NextFunction } from 'express';
import {Connect,Query} from '../../config/mysql';


/**
 * Checks in the database if the email given in the request body already exists (is already being used by a user)
 * @param req
 * @param res
 * @param next
 */
export const emailAlreadyExists = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const email:string = req.body.email
    const query:string = `SELECT email FROM user where email=?`;


    Connect()
        .then((connection: any) => {
            Query(connection, query, [email])
                .then((result: any) => {
                    if (result.length) {
                        return res.status(401).json({
                            erreur:true,
                            message: 'Email déjà existe'
                        })
                    };
                    next();
                })
                .catch((error: any) => {
                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                });
        })
        .catch((error: any) => {

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};
