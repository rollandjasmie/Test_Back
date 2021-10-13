import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain, } from 'express-validator';

/**
 * functions that takes a schema (= Validation Chain), checks if the rules are verified, and a send the errors if there is some
 * @param schemas Validation Chains
 * @returns errors if there are
 */
export const validatorDataMissingLogin = (schemas: ValidationChain[]): any => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(schemas.map((schema) => schema.run(req)));

        const result: any = validationResult(req);
        if (result.isEmpty()) {
            return next();
        }
        return res.status(401).json({ error: true, messages: 'Email ou password est manquante' });
    };
};

//check if any of the data is missing

export const login: ValidationChain[] = [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty(),
];
