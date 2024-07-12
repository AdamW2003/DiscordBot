const { CronJob } = require('cron');

function createBackgroundProcess(client) {
  return new CronJob('*/5 * * * * *', async () => {    
    console.log('Cron is executing now. Timestamp: ', new Date());
    try {
      const channel = await client.channels.fetch('1261307526885019678');
      if (channel) {
        await channel.send('🍻🍺');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });
}

module.exports = { createBackgroundProcess };