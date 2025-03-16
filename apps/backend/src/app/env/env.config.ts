export const environmentDEV = {
    production: false,
    port: 3000,
    database: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        databaseUrl: process.env.DATABASE_URL
    }
}