import express from 'express';
import configRoutes from '../src/routes/configRoutes';
import userRoutes from '../src/routes/userRoutes';

const app = express();

app.use(express.json());

app.use('/configs', configRoutes);
app.use('/users', userRoutes);

// Vercel expects a default export of the handler
export default app; 