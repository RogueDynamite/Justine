/* eslint-disable camelcase */
/**
 * @file Defines some useful helper functions for Discord.
 * @author Nicholas De Leon
 */

import {HandlerEvent} from '@netlify/functions';
import nacl from 'tweetnacl';
import
{
  ApplicationCommandOption,
  ApplicationCommandInteractionDataOption,
  Interaction,
  InteractionResponse,
  InteractionCallbackType,
  InteractionCallbackFlags,
} from './resources';

/**
 * Given an event, verifies the signature according to the specification in
 * the Discord API.
 * See https://discord.com/developers/docs/interactions/slash-commands#security-and-authorization
 * @param {HandlerEvent} event The Netlify event that triggered the function.
 * @return {boolean} Returns true if the signature is valid.
 */
export function verifyRequest(event: HandlerEvent): boolean {
  const publicKey = process.env['DISCORD_PUBLIC_KEY'];
  const signature = event.multiValueHeaders['X-Signature-Ed25519'];
  const timestamp = event.multiValueHeaders['X-Signature-Timestamp'];
  const body = event.body;
  // If we cannot verify the signature because anything is missing, we default
  // deny the request.
  if ( publicKey === undefined ||
       timestamp === undefined ||
       signature === undefined ||
       body === null) {
    return false;
  }
  return nacl.sign.detached.verify(
      Buffer.from((timestamp[0] || '') + body),
      Buffer.from(signature[0] || '', 'hex'),
      Buffer.from(publicKey, 'hex'),
  );
}

/**
 * Given data from an Interaction, returns an object that maps the names
 * of parameters to their ApplicationCommandInteractionDataOption. Errors
 * if the data is undefined.
 * @param {ApplicationCommandInteractionDataOption[]} data Data from the
 * interaction.
 * @return {object} A mapping from the name of a parameter to its options.
 */
export function convertOptions(
    data: ApplicationCommandInteractionDataOption[] | undefined):
    {[key: string]: ApplicationCommandInteractionDataOption} {
  if (data === undefined) throw new Error('no data found');
  const obj: {[key: string]: ApplicationCommandInteractionDataOption} = {};
  data.forEach((value: ApplicationCommandInteractionDataOption, _) => {
    obj[value.name] = value;
  });
  return obj;
}

/**
 * Helper to make a basic response to an Interaction.
 * @param {string} content The message that should be displayed in the response
 * @param {boolean} hidden True if the message should be only shown the user.
 * @return {InteractionResponse} The response with the content.
 */
export function makeBasicInteractionCallback(content: string, hidden: boolean):
 InteractionResponse {
  return {
    type: InteractionCallbackType.ChannelMessageWithSource,
    data: {
      content: content,
      flags: hidden ? InteractionCallbackFlags.HIDDEN : 0,
    },
  };
}

/** A helper interface that every slash command should export. It gives us
 * information about the command that can be used to create it.
 */
export interface SlashCommandInfo {
    name: string,
    description: string,
    options?: ApplicationCommandOption[],
    default_permission?: boolean,
}

/** Contains all the information necessary to run a SlashCommand. */
export interface CommandInfo {
    info: SlashCommandInfo,
    handler(interaction: Interaction): InteractionResponse
}
