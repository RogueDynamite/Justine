/**
 * @file Defines the /random command.
 * @author Nicholas De Leon
 */

import {
  ApplicationCommandOptionType,
  InteractionResponse,
  Interaction,
} from '../discord/resources';
import {
  SlashCommandInfo,
  CommandInfo,
  convertOptions,
  makeBasicInteractionCallback,
} from '../discord/utils';
import {ArgumentError} from '../utils/errors';
import {
  generateNumbers,
  RandomNumberGenerator,
} from '../utils/number_generators';

/**
 * Returns random numbers in the range specified in the Interaction.
 * @param {Interaction} interaction The Discord interaction that invoked the
 * command.
 * @return {InteractionResponse} An InteractionResponse object with the
 * number(s) that was/were rolled.
 */
function discordHandler(interaction: Interaction): InteractionResponse {
  // Acquire values from the interaction.
  const map = convertOptions(interaction.data?.options);
  const min = map['min']?.value as number || 0;
  const max = map['max']?.value as number || 6;
  const rolls = map['rolls']?.value as number || 1;
  const hidden = map['hidden']?.value as boolean;
  // Check for errors.
  if (rolls < 1 || rolls > 100) {
    throw new ArgumentError('rolls must be between 1 and 100');
  }
  // Return the interaction with the numbers if everything is OK.
  let content: string = '';
  const numbers = generateNumbers(rolls, new RandomNumberGenerator(min, max));
  if (rolls === 1) content = `You rolled a ${numbers[0]}.`;
  else content = 'Here are your numbers!\n' + numbers;
  return makeBasicInteractionCallback(content, hidden);
}

const slashCommandInfo: SlashCommandInfo = {
  name: 'random',
  description: 'Gives random numbers in the specified range.',
  options: [
    {
      name: 'min',
      description: 'The lower bound of the range, inclusive. Default: 0',
      type: ApplicationCommandOptionType.INTEGER,
      required: false,
    },
    {
      name: 'max',
      description: 'The upper bound of the range, inclusive. Default: 6',
      type: ApplicationCommandOptionType.INTEGER,
      required: false,
    },
    {
      name: 'rolls',
      description: 'Number of random numbers to generate. Default: 1',
      type: ApplicationCommandOptionType.INTEGER,
      required: false,
    },
    {
      name: 'hidden',
      description: 'If true, the results will be hidden. Default: false',
      type: ApplicationCommandOptionType.BOOLEAN,
      required: false,
    },
  ],
};

export const commandInfo: CommandInfo = {
  info: slashCommandInfo,
  handler: discordHandler,
};
