import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

async function startServer() {
    await mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.bewrwoe.mongodb.net/${process.env.DB__NAME}?retryWrites=true&w=majority`)
        .then(() => console.log('DB ok'))
        .catch((err) => console.log(err))

    app.listen(process.env.PORT, (error) => {
        if (error) {
            console.log(error);
        }
        console.log('Server ok');
    });
};
startServer();