import mysql from 'mysql2/promise';

require('dotenv').config();

// Load variable from .env
const MYSQL_HOST: string = process.env.MYSQL_HOST || 'localhost';
const MYSQL_DATABASE: string = process.env.MYSQL_DATABASE || 'test_back_db';
const MYSQL_USER: string = process.env.MYSQL_USER || 'root';
const MYSQL_PASSWORD: string = process.env.MYSQL_PASSWORD || '';

// Options for mySQL connexion
// file to be able to query the database with async... await syntax
const MySqlOptions: any = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
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
