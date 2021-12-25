import mysql from 'serverless-mysql';

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST as string,
        port: parseInt(process.env.MYSQL_PORT as string),
        database: process.env.MYSQL_DATABASE as string,
        user: process.env.MYSQL_USER as string,
        password: process.env.MYSQL_PASSWORD as string
    }
});

export default async function executeQuery(query: string, values?: any[]) {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error) {
        return { error };
    }
};