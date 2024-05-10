import 'module-alias/register';
import * as cron from 'node-cron';
import reminders from '@/data/reminders';
import env from '@/helpers/env';

// Adjust the cron expressions to run every 30 minutes
for (const [cronTime, text] of reminders) {
  // Update the cron expression to run every 30 minutes
  const updatedCronTime = cronTime

  cron.schedule(updatedCronTime, async () => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        api_key: env.NEYNAR_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        embeds: [
          {
            url: "www.atlascasts.com"
          },
  {
            url: "https://i.ibb.co/M5n4hGW/Atlas-Logo.gif"
          }
        ],
        signer_uuid: env.NEYNAR_UUID,
        text: text
      })
    };
  
    try {
      const response = await fetch('https://api.neynar.com/v2/farcaster/cast', options);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
    } catch (err) {
      console.error('Error:', err);
    }
  });

  // Log the scheduled tasks
  console.log('Scheduled:', updatedCronTime, text);
}

// Log a message indicating the application has started
console.log('App started!');