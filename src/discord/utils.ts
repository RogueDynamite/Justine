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
  Interaction,
  InteractionResponse,
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
  const signature = event.headers['X-Signature-Ed25519'];
  const timestamp = event.headers['X-Signature-Timestamp'];
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
      Buffer.from(timestamp + body),
      Buffer.from(signature, 'hex'),
      Buffer.from(publicKey, 'hex'),
  );
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
