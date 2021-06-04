/**
 * @file Defines the error types the bot can encounter.
 * @author Nicholas De Leon
 */

/** Represents an error in the server's operation. */
export class ServerError extends Error {}

/** Represents an error with the user's arguments to a command. */
export class ArgumentError extends Error {}
