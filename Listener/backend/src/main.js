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
app.use(cors({
    origin: '*', // 액세스를 허용할 도메인으로 변경
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  }));
app.use(bodyParser());
app.use(jwtMiddleware);


app.use(router.routes()).use(router.allowedMethods());

const port = 5000;
app.listen(5000, () => {
    console.log("Listening to port" + port);
});
