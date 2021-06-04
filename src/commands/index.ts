/**
 * @file Exports the functions that are used for bot commands.
 * @author Nicholas De Leon
 */

import {CommandInfo} from '../discord/utils';
import {commandInfo as random} from './random';

/** A mapping from the name of a command to its CommandInfo.
 * Edit this map to add new functions to the bot!
 */
export const nameToCommand: {[key: string]: CommandInfo} = {
  random: random,
};
