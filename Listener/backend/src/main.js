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
  origin: (ctx) => {
    return '*';
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));

app.use(async (ctx, next) => {
  // Content-Type 헤더 설정
  ctx.set('Content-Type', 'application/json');

  // 다음 미들웨어로 제어를 넘김
  await next();
});

app.use(bodyParser());
app.use(jwtMiddleware);

app.use(router.routes()).use(router.allowedMethods());

const port = PORT;
app.listen(port, () => {
    console.log("Listening to port" + port);
});
