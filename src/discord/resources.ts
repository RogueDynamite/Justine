/**
 * @file A file that defines many of the common data types in the Discord API
 * that are used by the bot.
 * @author Nicholas De Leon
 */

/** We are using version 9 of the Discord API. */
const versionNumber = 9;
export const DISCORD_API_URL = `https://discord.com/api/v${versionNumber}`;

/** We represent Snowflake IDs with strings. */
export type snowflake = string;

/** See https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption*/
export interface ApplicationCommandOption {
    type: ApplicationCommandOptionType,
    name: string,
    description: string,
    required?: boolean,
    choices?: ApplicationCommandOptionChoice[],
    options?: ApplicationCommandOption[],
}

/** See https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptionchoice */
export interface ApplicationCommandOptionChoice {
    name: string,
    value: string | number,
}

/** See https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype */
export enum ApplicationCommandOptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP,
    STRING,
    INTEGER,
    BOOLEAN,
    USER,
    CHANNEL,
    ROLE,
    MENTIONABLE
}

export enum InteractionType {
    Ping = 1,
    ApplicationCommand,
    MessageComponent
}

// export interface Interaction {
//     id: snowflake,
//     application_id: snowflake,
//     type: InteractionType,
//     data?: ApplicationCommandInteractionData,
//     guild_id?: snowflake,
//     channel_id?: snowflake,
//     member?: GuildMember,
//     user?: User,
//     token: string,
//     version: number,
//     message?: Message
// }
