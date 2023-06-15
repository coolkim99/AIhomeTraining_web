require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api';
import jwtMiddleware from './lib/jwtMiddleware'
//import createFakeData from './createFakeData';

const { PORT, MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Atlas에 연결되었습니다.');
  })
  .catch(error => {
    console.error('MongoDB Atlas 연결 오류:', error);
  });

const app = new Koa();
const cors = require('koa2-cors');
const router = new Router();
router.use('/api', api.routes());
router.options('*', (ctx) => {
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    ctx.status = 200;
})
app.use(cors({
    origin: (ctx) =>{
        return '*';
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  }));
app.use(bodyParser());
app.use(jwtMiddleware);


app.use(router.routes()).use(router.allowedMethods());

const port = 5000;
app.listen(5000, () => {
    console.log("Listening to port" + port);
});
