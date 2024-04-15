import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRoute from './router/auth-router.js';
import contactRoute from './router/contact-router.js'; 
import serviceRoute from './router/service-router.js';
import imagesRoute from './router/images-router.js';
import connectDB from './utils/db.js';
import errorMiddleware from './middlewares/error-middleware.js';


const app = express();


const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

app.use("/api/upload", serviceRoute);
app.use("/api/getImages", imagesRoute);


app.use(errorMiddleware);


const PORT = process.env.PORT || 6000;

connectDB().then(() => {
      
}
);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});



