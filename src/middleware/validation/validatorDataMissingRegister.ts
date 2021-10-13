import { Request, Response, NextFunction } from 'express';
import { body, validationResult,ValidationChain,} from 'express-validator';

/**
 * functions that takes a schema (= Validation Chain), checks if the rules are verified, and a send the errors if there is some
 * @param schemas Validation Chains
 * @returns errors if there are
 */
export const validatorDataMissingRegister = (schemas: ValidationChain[]): any => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(schemas.map((schema) => schema.run(req)));

        const result: any = validationResult(req);
        if (result.isEmpty()) {
            return next();
        }
        return res.status(401).json({error:true,messages:'L\'une ou plusieurs des données obligatoire sont manquantes'});
    };
};

//check if any of the data is missing
export const register: ValidationChain[] = [
    body('email').notEmpty().isEmail().trim(),
    body('password').notEmpty().trim() ,
    body('firstname').notEmpty().trim(),
    body('lastname').notEmpty().trim(),
    body('date_naissance').notEmpty().trim(),
    body('sexe').notEmpty().trim()
];




