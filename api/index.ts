import express from 'express';
import serverless from 'serverless-http';
import userRoutes from '../src/routes/userRoutes';
import configRoutes from '../src/routes/configRoutes';

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/config', configRoutes);

export default serverless(app);