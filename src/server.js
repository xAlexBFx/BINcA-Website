import dotenv from 'dotenv'
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import interFaceRouter from './routes/interface.js';
import "./database.js";
import "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('port', process.env.SERVER_PORT)

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use(interFaceRouter)

app.use((req, res)=>res.redirect('/home'))

const serverLink = `http://${process.env.SERVER_IP}:${app.get('port')}`

app.listen(app.get('port'), `${process.env.SERVER_IP}`, () => {
    console.log(`API at ${serverLink} :)`)
}); 

export {
    __dirname as serverDirName
}