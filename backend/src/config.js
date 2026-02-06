import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGODB_URI: process.env.MONGODB_URI,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173'
};

console.log(' Config loaded - GitHub Token:', config.GITHUB_TOKEN ? 'YES' : 'NO');
