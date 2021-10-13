import { Request,Response } from "express";
import { Connect, Query } from '../config/mysql';
import db from '../config/db';
import paramsUser from "../interface/user";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';



// Load env variables
const accessTokenSecret: string = process.env.JWT_ACCESS_TOKEN_SECRET || 'encryptedsecret';
const accessTokenExpiryTime: string = process.env.JWT_ACCESS_TOKEN_EXPIRETIME || '2H';
const refreshTokenExpiryTime: string = process.env.JWT_REFRESH_TOKEN_EXPIRETIME || '1Y';
const refreshTokenSecret: string = process.env.JWT_REFRESH_TOKEN_SECRET || 'encryptedsecret2';


/**
 * function to page index
 * @param req 
 * @param res 
 */
//
const index = (req: Request, res: Response) => {
    res.status(200).json();
};

/**
 * function to register
 * @param req 
 * @param res 
 */
const register = (req: Request, res: Response): void => {
    let { firstname, lastname, email, password, date_naissance, sexe }: paramsUser = req.body;

    bcryptjs.hash(password, 10, (hashError: any, hash: any) :any => {
        if (hashError) {
            return res.status(401).json({
                message: hashError.message,
                error: hashError
            });
        }

        let query: string = `INSERT INTO user (firstname, lastname, email, password, date_naissance, sexe) VALUES (?,?,?,?,?,?)`;

        Connect()
            .then((connection: any) => {
                Query(connection, query, [firstname, lastname, email, hash, date_naissance, sexe])
                    .then((result: any) => {
                        //create token and refreshToken
                        let token: any = jwt.sign({ email: email, id: result.insertId }, accessTokenSecret, {
                            expiresIn: accessTokenExpiryTime
                        });
                        let refresh_token: any = jwt.sign({ email: email, id: result.insertId }, refreshTokenSecret, {
                            expiresIn: refreshTokenExpiryTime
                        });
                        const createdAt: any = new Date()

                        return res.status(201).json({
                            error: false,
                            message: 'L\'utulistauer a bien été créé avec succès',
                            tokens: {
                                token: token,
                                refresh_token: refresh_token,
                                createdAt: createdAt
                            },
                        });
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
    });
};
/**
 * function to login, verify password and email and give tokens to the user
 * @param req
 * @param res
 * @param next
 */
const login = (req: Request, res: Response): void => {

    let { email, password }: { email: string; password: string } = req.body;

    let query = `SELECT * FROM user WHERE email like ?`;

    Connect()
        .then((connection) => {
            Query(connection, query, [email])
                .then((users: any) => {
                    if (!users.length) return res.status(401).json({ message: 'Votre email ou password est erroné' });
                    bcryptjs.compare(password, users[0].password, async (error, result) => {
                        if (error) {
                            return res.status(401).json({
                                errors: error
                            });
                        } else if (!result) {
                            return res.status(401).json({
                                message: 'Votre email ou password est erroné'
                            });
                        } else if (result) {
                            let token: any = jwt.sign({ id: users[0].iduser }, accessTokenSecret, {
                                expiresIn: accessTokenExpiryTime
                            });
                            let refresh_token: any = jwt.sign({ id: users[0].iduser }, refreshTokenSecret, {
                                expiresIn: refreshTokenExpiryTime
                            });

                            return res.status(200).json({
                                error: false,
                                message: 'L\'utulistauer a  été authentifié  succès',
                                tokens: {
                                    token: token,
                                    refresh_token: refresh_token,
                                    createdAt: users[0].createdAt
                                },
                            });
                        }
                    });
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

/**
 * function to get one user 
 * @param req
 * @param res
 */
//
const getUser = async  (req: Request, res: Response) : Promise<any> => {
    let id: string = req.params.id;
    //verification if id exist'
    const verification: any = await db.query('SELECT iduser FROM user WHERE iduser=?', [id]);
    if (verification.length === 0) {
        return res.status(404).send({ message: "id n'existe pas" })
    };
    if (id ) {
        //get user 
        const query:string = 'SELECT firstname, lastname, email,date_naissance,sexe,createdAt FROM user WHERE iduser=?'
        const user:any = await db.query(query,[id])
        return res.status(200).json({
            error: false,
            firstname:user[0].firstname,
            lastname:user[0].lastname,
            email:user[0].email,
            date_naissance:user[0].date_naissance,
            sexe:user[0].sexe,
            createdAt:user[0].createdAt
        })
    };
};

/**
 * function to update one user 
 * @param req
 * @param res
 */
//
const UpdateUser = async (req: Request, res: Response): Promise<any> => {

    //body parse
    let { firstname, lastname, date_naissance, sexe }: paramsUser = req.body; 
    req.body = { firstname, lastname, date_naissance, sexe };

    //id user
    let iduser: string = req.params.id;

    //verification if id exist
    const verification: any = await db.query('SELECT iduser FROM user WHERE iduser=?', [iduser]);
    if (verification.length === 0) {
        return res.status(404).send({ message: "id n'existe pas" })
    };

    try {
        //update user 
        if (iduser) {
            //query mysql
            let query: string = 'UPDATE user SET ';

            //params for request mysql
            let params: any[] = [];

            //check all value in req.body and push in @query and params
            Object.keys(req.body).forEach(function (key) {
                if (req.body[key]) {
                    query += key + ' = ?, ';
                    params.push(req.body[key]);
                }
            });

            //delete last comma in query
            query = query.slice(0, -2);

            query += ' WHERE iduser = ?';
            params.push(req.params.id);

            //requet for update 
            await db.query(query, params)

            res.status(200).json({
                error:false,
                message:"L'utilisateur a été modifiée succès"
            })
        };
    } catch{
        return res.status(401).json({ 
            error: true,
            messages: "Aucune donnée n'a été envoyée"
         });
    }
   
};


/**
 * function to update password one user
 * @param req
 * @param res
 */
//
const changePassword = async (req: Request, res: Response): Promise<any> => {

    //body parse
    let { currentPassword, newPassword }: paramsUser = req.body;

    //id user
    let iduser: string = req.params.id;

    //verification if user exist
    const user: any = await db.query('SELECT iduser,password FROM user WHERE iduser=?', [iduser]);
    if (user.length === 0) {
        return res.status(404).send({ message: "utilisateur n'existe pas" })
    };

    try {
        //check if the password matches the user
        bcryptjs.compare(currentPassword, user[0].password, async (error, result) => {
            if (error) {
                return res.status(401).json({
                    errors: error
                });
            } else if (!result) {
                return res.status(401).json({
                    message: 'Entrez un mot de passe correct et réessayez'
                });
            } else if (result) {
                bcryptjs.hash(newPassword, 10, async (hashError: any, hash: any) :Promise<any> => {
                    if (hashError) {
                        return res.status(401).json({
                            message: hashError.message,
                            error: hashError
                        });
                    }
                    /**update user*/

                    //query mysql
                    let query: string = 'UPDATE user SET password=? WHERE iduser=?';

                    //requet for update 
                    await db.query(query, [hash,iduser])

                    res.status(200).json({
                        error: false,
                        message: "Le mot de passe a été modifiée succès"
                    })
                });

            }
        });

    } catch(error) {
        return res.status(401).json({
            error: error
        });
    }

};


/**
 * function to get all user
 * @param req
 * @param res
 */
//
const getAllUser = async (req: Request, res: Response): Promise<any> => {
    //query mysql
    let query:string = 'SELECT firstname,lastname,email,sexe FROM user';
    // const users : any = await db.query(query,[])
    // return res.status(200).json({error:false,users:users})
    Connect()
        .then((connection) => {
            Query(connection, query, [])
                .then((users: any) => {
                    if (!users.length) return res.status(401).json({
                        error:true,
                        message: 'Aucun utilisateur'
                    });
                    return res.status(200).json({ error: false, users: users })

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
            });
        });

};

const logout = async (req: Request, res: Response): Promise<any> => {

    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ error: false, message: "L'utilisateur a été déconnecté succès" });
};




export default { index, register, login, getUser, UpdateUser, changePassword, getAllUser, logout}