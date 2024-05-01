import 'module-alias/register';
import * as cron from 'node-cron';
import reminders from '@/data/reminders';
import neynar from '@/helpers/neynar';
import env from '@/helpers/env';

// Adjust the cron expressions to run every 30 minutes
for (const [cronTime, text] of reminders) {
  // Update the cron expression to run every 30 minutes
  const updatedCronTime = '*/30 * * * *'; // '*/30' means every 30th minute

  cron.schedule(updatedCronTime, async () => {
    try {
      await neynar.v2.publishCast(env.NEYNAR_UUID, text);
      console.log('Scheduled:', cronTime, text);
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);
    }
  });

  // Log the scheduled tasks
  console.log('Scheduled:', updatedCronTime, text);
}

// Log a message indicating the application has started
console.log('App started!');
