import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain, } from 'express-validator';

/**
 * functions that takes a schema (= Validation Chain), checks if the rules are verified, and a send the errors if there is some
 * @param schemas Validation Chains
 * @returns errors if there are
 */
export const validationChangePassword = (schemas: ValidationChain[]): any => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(schemas.map((schema) => schema.run(req)));

        const results: any = validationResult(req);
        if (results.isEmpty()) {
            return next();
        }

        //send a message for data not valide
        for (const result of results.errors) {
            if (result.param === "currentPassword") {
                return res.status(401).json({
                    error:true,
                    message:"Besoin de votre mot de passe actuel"
                });
            } else if (result.param === "newPassword") {
                return res.status(401).json({
                    error: true,
                    message: "Nouveau mot de passe requit"
                });
            } else if (result.param === "confirmPassword" && result.msg === "Invalid value") {
                return res.status(401).json({
                    error: true,
                    message: "Confirmation de mot de passe requit"
                });
            } else if (result.param === "confirmPassword" && result.msg === "Passwords must be same") {
                return res.status(401).json({
                    error: true,
                    message: "Les mots de passe ne sont pas identiques"
                });
            }
        }
        
    };
};

//check if any of the data is missing
export const changePassword: ValidationChain[] = [
    body('currentPassword').isString().notEmpty(),
    body('newPassword').isString().notEmpty().trim(),
    body('confirmPassword').isString().notEmpty().custom(async (confirmPassword, { req }) => {
        const newPassword = req.body.newPassword

        // If password and confirm password not same
        // don't allow to sign up and throw error
        if (newPassword !== confirmPassword) {
            throw new Error('Passwords must be same')
        }
    }).trim()
];