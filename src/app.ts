import pkg from '@slack/bolt';
import dotenv from 'dotenv';
import { event } from './event.js';
import { postMsg } from './webClient.js';

dotenv.config({ path: '.env' });
const { App } = pkg;

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: false, // not using websocket, using http method instead
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
app.action('button_click', async ({ body, ack, say }: any) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});


// The echo command simply echoes on command. The requestURL should match the requestURL specified in the events section of your app's configuration
app.command('/echo', async ({ command, ack, respond, say }) => {
  // Acknowledge command request
  await ack();

  //either can be used
  await respond(`${command.text}`);
  await say(`${command.text}`);
});

setTimeout(() => {
  postMsg();
}, 2000);

export default app;

//IIFE
(async () => {
  //set up listeners
  await event();
  // Start your app
  await app.start();

  console.log('⚡️ Bolt app is running!!');
})();
