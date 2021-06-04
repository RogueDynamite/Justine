import {Handler} from '@netlify/functions';
import {nameToCommand} from '../src/commands';
import {Logger} from 'tslog';
import {
  Interaction,
  InteractionCallbackType,
  InteractionType,
} from '../src/discord/resources';
import {
  makeBasicInteractionCallback,
  verifyRequest,
} from '../src/discord/utils';
import {
  ServerError,
  ArgumentError,
} from '../src/utils/errors';

export const handler: Handler = async (event, _context) => {
  const log = new Logger();
  log.info('event', event);
  // We only allow POST requests with a body.
  if (event.httpMethod != 'POST') {
    log.info('event was not a POST request');
    return {statusCode: 405};
  } else if (event.body === null) {
    log.info('event body was null');
    return {statusCode: 400};
  } else if (verifyRequest(event)) {
    log.info('request has an invalid signature');
    return {statusCode: 401};
  }
  const interaction = JSON.parse(event.body) as Interaction;
  // ACK if the request is a PING.
  if (interaction.type === InteractionType.Ping) {
    log.info('ping received');
    return {
      statusCode: 200,
      body: JSON.stringify({type: InteractionCallbackType.Pong}),
      headers: {'Content-Type': 'application/json'},
    };
  }
  try {
    // Try to find the command specified in the request.
    if (interaction.data && nameToCommand[interaction.data.name]) {
      const commandInfo = nameToCommand[interaction.data.name];
      return {
        statusCode: 200,
        body: JSON.stringify(commandInfo?.handler(interaction)),
        headers: {'Content-Type': 'application/json'},
      };
    }
    // In the rare case we end up here, we send a 400 error to indicate that
    // we could not find the command.
    return {statusCode: 400};
  } catch (e) {
    // If the handler returned an error, we give a hidden message back to
    // the user with the error.
    let msg = '';
    if (e instanceof ServerError) {
      log.error(e);
      msg = 'The server encountered an error while handling your command.';
    } else if (e instanceof ArgumentError) {
      msg = `Invalid arguments for this command: ${e.message}.`;
    } else {
      msg = `Error: ${e.message || e}.`;
    }
    return {
      statusCode: 200,
      body: JSON.stringify(
          makeBasicInteractionCallback(msg, true),
      ),
      headers: {'Content-Type': 'application/json'},
    };
  }
};
