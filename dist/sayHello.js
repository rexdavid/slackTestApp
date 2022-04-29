export const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
    // you still need to listen on some port!
    port: 3000,
});
app.message('wake me up', async ({ message, client, logger }) => {
    try {
        // Call chat.scheduleMessage with the built-in client
        const result = await client.chat.postMessage({
            channel: message.channel,
            text: 'Summer has come and passed',
        });
    }
    catch (error) {
        logger.error(error);
    }
});
//# sourceMappingURL=sayHello.js.map