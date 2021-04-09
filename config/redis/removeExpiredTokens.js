import jwt from 'jsonwebtoken';
import moment from 'moment';
import redisClient from './redis.config';

/**
   * @description Removes expired tokens from the database
   * @returns {void}
  */
const removeExpiredTokens = async () => {
  redisClient.smembers('token', (err, userToken) => {
    userToken.forEach((token) => {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_KEY,
        {
          ignoreExpiration: true,
        },
      );
      const { exp } = decodedToken;
      if (moment(exp, 'X').format('x') < moment().format('x')) {
        redisClient.srem('token', token);
      }
    });
  });
};

export default removeExpiredTokens;
