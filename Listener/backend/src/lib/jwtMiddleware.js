import jwt from 'jsonwebtoken';
import User from '../models/user';

const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  if (!token) {
    console.log("토큰 쿠키에 없음");
    return next(); // 토큰이 없음
}
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username,
      totalTime: user.totalTime,
      level: user.level
    };
    // 토큰 3.5일 미만 남으면 재발급
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      ctx.cookies.set('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
        httpOnly: true
      });
    }
    return next();
  } catch (e) {
    // 토큰 검증 실패
    console.log(e);
    return next();
  }
};

export default jwtMiddleware;