/**
 * @file Builds the bot.
 * @author Nicholas De Leon
 */

import {nameToCommand} from './src/commands';
import {createCommand} from './src/discord/api';
import {SlashCommandInfo} from './src/discord/utils';

const commands: Promise<void>[] = [];
for (const name in nameToCommand) {
  if (nameToCommand.hasOwnProperty(name)) {
    commands.push(createCommand(nameToCommand[name]?.info as SlashCommandInfo));
  }
}

Promise.all(commands);
