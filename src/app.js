import express from 'express'
import cors from 'cors'
//  modules


const APP = express();
// App


APP.use(cors());
APP.use(express.json());
// middlewares


export default APP;
