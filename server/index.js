import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

import authRoute from "./routes/auth.js";
import postRoute from "./routes/post.js";
import conversationRoute from "./routes/conversation.js"


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('uploadsPost'));
app.use(express.static('uploadsUser'));

app.use('/auth', authRoute);
app.use('/post', postRoute);
app.use('/conversation', conversationRoute);

async function startServer() {
    await mongoose.connect(`${process.env.DATABASE}`)
        .then(() => console.log('DB ok'))
        .catch((err) => console.log(err));

    app.listen(process.env.PORT, (error) => {
        if (error) {
            console.log(error);
        }
        console.log('Server ok');
    });
};
startServer();