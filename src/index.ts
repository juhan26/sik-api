import express from 'express';
import sequelize from './models';
import userRoutes from './routes/userRoutes';
import configRoutes from './routes/configRoutes';

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/config', configRoutes);


const PORT = 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
