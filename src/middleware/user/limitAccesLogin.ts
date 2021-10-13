import rateLimit from "express-rate-limit";

//blocked after 5 requests for login
export const limitAccesLogin:any =rateLimit({
        windowMs:60 * 60 * 1000, // 1 hour window,
        statusCode:409,
        max: 5, // 
        message:
            "Trop de tentative, Veuiller patientez 1h ",
    });
console.log(limitAccesLogin)