import {getRandomInt} from '../src/random';
import {Handler} from '@netlify/functions';

const handler: Handler = async (_event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({message: `${getRandomInt(1, 7)}`}),
  };
};

export {handler};
