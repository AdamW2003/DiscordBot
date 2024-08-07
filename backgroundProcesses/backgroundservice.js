const { CronJob } = require('cron');

async function fetchCheese() {
  try {
    const fetch = await import('node-fetch');
    const response = await fetch.default('https://cheese-api.onrender.com/random');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cheese fact:', error);
    return null;
  }
}

function createBackgroundProcess(client) {
  return new CronJob('*/10 * * * * *', async () => {
    console.log('Cron is executing now. Timestamp: ', new Date());
    try {
      const channel = await client.channels.fetch('1261307526885019678');
      if (channel) {
        const cheese = await fetchCheese();
        if (cheese) {
          await channel.send({
            content: `My name is Mr. Chedda and I love cheese! :cheese:\nI especially love ${cheese.name}\ncheese from ${cheese.milk}`,
            files: [{
              attachment: cheese.image, // Assuming cheese.image is a valid URL to the image
              name: 'cheese.jpg'
            }]
          });
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });
}

module.exports = { createBackgroundProcess };
