/**
 * @file Implements functions that interact with the Discord API.
 * @author Nicholas De Leon
 */

import {SlashCommandInfo} from './utils';
import {DISCORD_API_URL} from './resources';
import axios from 'axios';

const appID = process.env['DISCORD_APPLICATION_ID'];

/**
 * Creates a new global slash command.
 * https://discord.com/developers/docs/interactions/slash-commands#create-global-application-command
 * @param {SlashCommandInfo} info The information needed to create the command.
 */
export async function createCommand(info: SlashCommandInfo) {
  const createCommandURL = `${DISCORD_API_URL}/applications/${appID}/commands`;
  await axios.post(createCommandURL, info);
}
