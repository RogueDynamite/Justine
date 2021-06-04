import {Handler} from '@netlify/functions';
import {nameToCommand} from '../src/commands';
import {
  Interaction,
  InteractionCallbackType,
  InteractionType,
} from '../src/discord/resources';
import {
  makeBasicInteractionCallback,
  verifyRequest,
} from '../src/discord/utils';

export const handler: Handler = async (event, _context) => {
  // We only allow POST requests with a body.
  if (event.httpMethod != 'POST') return {statusCode: 405};
  else if (event.body === null) return {statusCode: 400};
  // Only allow authenticated requests from Discord to access the functions.
  else if (verifyRequest(event)) return {statusCode: 401};
  const interaction = JSON.parse(event.body) as Interaction;
  // ACK if the request is a PING.
  if (interaction.type === InteractionType.Ping) {
    return {
      statusCode: 200,
      body: JSON.stringify({type: InteractionCallbackType.Pong}),
    };
  }
  try {
    // Try to find the command specified in the request.
    if (interaction.data && nameToCommand[interaction.data.name]) {
      const commandInfo = nameToCommand[interaction.data.name];
      return {
        statusCode: 200,
        body: JSON.stringify(commandInfo?.handler(interaction)),
      };
    }
    // In the rare case we end up here, we send a 400 error to indicate that
    // we could not find the command.
    return {statusCode: 400};
  } catch (e) {
    // If the handler returned an error (due to some bad arguments), we give
    // a hidden message back to the user.
    return {
      statusCode: 200,
      body: JSON.stringify(
          makeBasicInteractionCallback(`Error: ${e.message}`, true),
      ),
    };
  }
};
