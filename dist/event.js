import app from "./app.js";
// When a user msgs in the bot added channel, send a message in a predefined channel asking them to introduce themselves
export const event = async () => {
    app.event('message', async ({ event, client, logger }) => {
        try {
            // Call chat.postMessage with the built-in client
            const result = await client.chat.postMessage({
                channel: 'C03DFCZKXL4',
                //@ts-ignore
                text: `Welcome to the team, <@${event.user}>! 🎉 You can introduce yourself in this channel.`,
            });
            logger.info(result);
            logger.info(event);
        }
        catch (error) {
            logger.error(error);
        }
    });
};
//# sourceMappingURL=event.js.map