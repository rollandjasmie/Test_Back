import express from 'express';
import userRoutes from './routes/users';
import refreshTokens from './routes/refreshTokens';
import rateLimit from 'express-rate-limit';

require('dotenv').config();
/** PORT AND HOSTNAME */
const hostname = process.env.SERVER_HOSTNAME;
const port = process.env.SERVER_PORT;

const app = express();

/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/** Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'x-access-token,Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});


/** use api doc */
app.use(express.static('apidoc'));




/** Routes go user */
app.use('/', userRoutes);

/** Routes go refreshTokens */
app.use('/token', refreshTokens);




/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});


app.listen(process.env.PORT || 5000);
