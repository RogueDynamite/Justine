import {Handler} from '@netlify/functions';
import {verifyRequest} from '../src/discord/utils';

export const handler: Handler = async (event, _context) => {
  // We only allow POST requests with a body.
  if (event.httpMethod != 'POST') return {statusCode: 405};
  else if (event.body == null) return {statusCode: 400};
  // Only allow authenticated requests from Discord to access the functions.
  else if (verifyRequest(event)) return {statusCode: 401};
  const requestJSON = JSON.parse(event.body);
  // ACK if the request is a PING.
  if (requestJSON.type === 1) {
    return {statusCode: 200, body: JSON.stringify({type: 1})};
  }

  return {statusCode: 200};
};
