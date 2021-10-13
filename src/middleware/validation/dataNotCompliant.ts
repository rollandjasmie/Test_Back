import { Request, Response, NextFunction } from 'express';
import { body, validationResult,ValidationChain,} from 'express-validator';

/**
 * functions that takes a schema (= Validation Chain), checks if the rules are verified, and a send the errors if there is some
 * @param schemas Validation Chains
 * @returns errors if there are
 */
export const dataNotCompliant = (schemas: ValidationChain[]): any => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(schemas.map((schema) => schema.run(req)));

        const result: any = validationResult(req);
        if (result.isEmpty()) {
            return next();
        }

        return res.status(401).json({error:true,messages:'L\'une des données obligatoire ne sont pas conformes'});
    };
};

//check if any of the data is missing
export const checkMailAndpassword: ValidationChain[] = [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6, max: 50 }).withMessage('password must be between 6 and 50 characters'),
    body('password').isStrongPassword()
];

    