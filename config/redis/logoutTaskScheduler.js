import cron from 'node-cron';
import removeExpiredTokens from './removeExpiredTokens';

const scheduler = cron.schedule('* 59 23 * * *', removeExpiredTokens);

export default scheduler;
