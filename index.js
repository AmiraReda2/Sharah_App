import express from 'express';
import { config } from 'dotenv';

import userRouter from './SRC/modules/Users/user.routes.js';
import masgRouter from './SRC/modules/Messages/message.routes.js';
import db_connection from './DB/connection.js';
import { globalResponse } from './SRC/middlewares/globalResponse.js';

 config({path:'./config/dev.config.env'});


 const app = express();
 const port = process.env.PORT; 

 app.use(express.json())
 app.use('/user', userRouter)
 app.use('/msg', masgRouter)

 app.use(globalResponse)

 db_connection()

 app.get('/', (req ,res) => {
    res.send('Hello every one !')
 })
 app.listen(port, ()=> console.log(`server is running on port ${port}!`))
