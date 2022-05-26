import app from './app.js';

// When a user msgs in the bot added channel, send a message in a predefined channel asking them to introduce themselve
export const event = async () => {
  app.event('message', async ({ event, client, logger }) => {
    try {
      // Call chat.postMessage with the built-in clients
      const result = await client.chat.postMessage({
        channel: 'C03DFCZKXL4',
        //@ts-ignore
        text: `Hi <@${event.user}>! Please introduce yourself!`,
        //@ts-ignore
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'You have a new request:\n*<fakeLink.toEmployeeProfile.com|Fred Enriquez - New device request>*',
            },
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: '*Type:*\nComputer (laptop)',
              },
              {
                type: 'mrkdwn',
                text: '*When:*\nSubmitted Aut 10',
              },
              {
                type: 'mrkdwn',
                text: '*Last Update:*\nMar 10, 2015 (3 years, 5 months)',
              },
              {
                type: 'mrkdwn',
                text: "*Reason:*\nAll vowel keys aren't working.",
              },
              {
                type: 'mrkdwn',
                text: '*Specs:*\n"Cheetah Pro 15" - Fast, really fast"',
              },
            ],
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  emoji: true,
                  text: 'Approve',
                },
                style: 'primary',
                value: 'click_me_123',
                action_id: 'approve_123',
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  emoji: true,
                  text: 'Deny',
                },
                style: 'danger',
                value: 'click_me_123',
                action_id: 'deny_123',
              },
            ],
          },
        ],
      });
      logger.info(result);
      logger.info(event);
    } catch (error) {
      logger.error(error);
    }
  });

  app.action('approve_123', async ({ body, ack, say }: any) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the APPROVE button`);
  });

  app.action('deny_123', async ({ body, ack, say }: any) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the DENY button`);
  });
};
