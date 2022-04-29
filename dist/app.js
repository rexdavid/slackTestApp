import pkg from '@slack/bolt';
import dotenv from 'dotenv';
import { event } from './event.js';
import { postMsg } from './webClient.js';
dotenv.config({ path: '.env' });
const { App } = pkg;
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: false,
    appToken: process.env.SLACK_APP_TOKEN,
    port: 5001,
});
// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say({
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    //@ts-ignore
                    text: `Hey there <@${message.user}>!`,
                },
                accessory: {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        text: 'Click Me',
                    },
                    action_id: 'button_click',
                },
            },
        ],
        //@ts-ignore
        text: `Hey there <@${message.user}>!`,
    });
});
app.action('button_click', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
});
setTimeout(() => {
    postMsg();
}, 2000);
export default app;
// // When a user msgs in the bot added channel, send a message in a predefined channel asking them to introduce themselves
// app.event('message', async ({ event, client, logger }) => {
//   try {
//     // Call chat.postMessage with the built-in client
//     const result = await client.chat.postMessage({
//       channel: 'C03DFCZKXL4',
//       //@ts-ignore
//       text: `Welcome to the team, <@${event.user}>! 🎉 You can introduce yourself in this channel.`,
//     });
//     logger.info(result);
//     logger.info(event);
//   } catch (error) {
//     logger.error(error);
//   }
// });
//IIFE
(async () => {
    await event();
    // Start your app
    await app.start();
    console.log('⚡️ Bolt app is running!');
})();
//# sourceMappingURL=app.js.map