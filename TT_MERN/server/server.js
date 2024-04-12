import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authRoute from './router/auth-router.js';
import contactRoute from './router/contact-router.js'; 
import connectDB from './utils/db.js';
import errorMiddleware from './middlewares/error-middleware.js';

const app = express();
  
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);


app.use(errorMiddleware);


const PORT = process.env.PORT || 6000;

connectDB().then(() => {
      
}
);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});



