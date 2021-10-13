import mysql from 'mysql2';

//file with database connection configuration and connection/query functions

// Load variable from .env
const MYSQL_HOST: string = process.env.MYSQL_HOST || 'localhost';
const MYSQL_DATABASE: string = process.env.MYSQL_DATABASE || 'test_back_db';
const MYSQL_USER: string = process.env.MYSQL_USER || 'root';
const MYSQL_PASSWORD: string = process.env.MYSQL_PASSWORD || '';

// Options for mySQL connexion
const MySqlOptions: any = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
};

//With Promises
/**
 * Connects to the database
 * @returns a connection to the database
 */
const Connect = async (): Promise<any> =>
    new Promise<mysql.Connection>((resolve, reject) => {
        const connection: any = mysql.createConnection(MySqlOptions);

        connection.connect((error: any) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(connection);
        });
    });

/**
 * function to query the database
 * @param connection the connection from previous function
 * @param query the sql query string
 * @param params the parameters for the '?' in the query string
 * @returns the sql result for the query
 */
const Query = async (connection: mysql.Connection, query: string, params: any[]): Promise<any> =>
    new Promise<any>((resolve, reject) => {
        connection.query(query, params, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
        connection.end();
    });

export { Connect, Query };
