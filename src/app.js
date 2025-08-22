import express from 'express'
import cors from 'cors'
//  modules


const APP = express();
// App


APP.use(cors()); // enabling cors from all urls //
APP.use(express.json({ limit: "16kb" }));
APP.use(express.urlencoded({ extended: true, limit: "16kb" }))
APP.use(express.static("public"));
// middlewares

import router from '../routes/user.routes.js';

// routes modules  //

// routes declaration //
APP.use('/api/v1/users/', router);


export default APP;
