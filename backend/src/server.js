import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();
console.log(' GitHub Token loaded:', process.env.GITHUB_TOKEN ? 'YES' : 'NO');

import connectDB from './db.js';
import repoRoutes from './routes/repoRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';
import './workers/analysisWorker.js'; 

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(helmet());


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

app.use(cors({
    origin: process.env.FRONTEND_URL || 'https://contri-map.vercel.app',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/repos', repoRoutes);
app.use('/api/analysis', analysisRoutes);

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

export default app;
