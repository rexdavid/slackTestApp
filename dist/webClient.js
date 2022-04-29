import { WebClient } from '@slack/web-api';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
// Read a token from the environment variables
const token = process.env.SLACK_BOT_TOKEN;
// Initialize
const web = new WebClient(token);
// Given some known conversation ID (representing a public channel, private channel, DM or group DM)
const channelId = 'C03DFCZKXL4';
export const postMsg = async () => {
    // Post a message to the channel, and await the result.
    // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
    const result = await web.chat.postMessage({
        text: 'Hello world!',
        channel: channelId,
    });
    // The result contains an identifier for the message, `ts`.
    console.log(`Successfully send message ${result.ts} in conversation ${channelId}`);
};
//# sourceMappingURL=webClient.js.map