import dotenv from 'dotenv'
dotenv.config()
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import interFaceRouter from './routes/interface.js';
import "./database.js";
import "dotenv";

console.log(process.env.SERVER_PORT)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('port', process.env.SERVER_PORT)

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use(interFaceRouter)

app.use((req, res)=>res.redirect('/home'))

app.listen(app.get('port'), () => {
    console.log(`App On Port ${app.get('port')} :)`)
}); 

export {
    __dirname as serverDirName
}