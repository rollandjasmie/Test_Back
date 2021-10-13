import mysql from 'mysql2/promise';

require('dotenv').config();

// Load variable from .env
const MYSQL_HOST: any = process.env.MYSQL_HOST ;
const MYSQL_DATABASE: any = process.env.MYSQL_DATABASE ;
const MYSQL_USER: any = process.env.MYSQL_USER ;
const MYSQL_PASSWORD: any = process.env.MYSQL_PASSWORD ;
const MYSQL_PORT: any = process.env.MYSQL_PORT ;

// Options for mySQL connexion
// file to be able to query the database with async... await syntax
const MySqlOptions: any = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    port: MYSQL_PORT
};


/**
 * function to be able to query the database with async... await syntax
 * @param sql sql query
 * @param params params for the '?' in the query
 * @returns result of sql query
 */

const query = async function (sql: string, params: any[]): Promise<any> {
    const connection: any = await mysql.createConnection(MySqlOptions);
    const [results]: any = await connection.execute(sql, params);

    return results;
};

export default { query };
