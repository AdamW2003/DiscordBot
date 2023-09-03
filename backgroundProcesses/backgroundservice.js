const { CronJob } = require('cron');
console.log('this will log before job instantiation');
const backgroundProcess = new CronJob('*/1 * * * *', () => {
  console.log('cron is executing now. timestamp: ', new Date());
})
console.log('this will log after job instantiation');
module.exports = { backgroundProcess };