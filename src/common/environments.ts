export const environment = {
    server: {
        name: process.env.SERVER_NAME || 'Blog EJS',
        version: process.env.SERVER_VERSION || '0.1.0',
        port: process.env.SERVER_PORT || 3000
    },
    db: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: parseInt(process.env.DB_PORT) || 5432,
        database: process.env.DB_DATABASE || 'blog_ejs',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres'
    }
};
