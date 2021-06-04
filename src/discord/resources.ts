/* eslint-disable camelcase */
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

/** Timestamps are also strings. */
export type ISO8601Timestamp = string

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption*/
export interface ApplicationCommandOption {
    type: ApplicationCommandOptionType,
    name: string,
    description: string,
    required?: boolean,
    choices?: ApplicationCommandOptionChoice[],
    options?: ApplicationCommandOption[],
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptionchoice */
export interface ApplicationCommandOptionChoice {
    name: string,
    value: string | number,
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype */
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

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondata */
export interface ApplicationCommandInteractionData {
    id: snowflake,
    name: string,
    resolved?: ApplicationCommandInteractionDataResolved,
    options?: ApplicationCommandInteractionDataOption[],
    custom_id: string,
    component_type: number
}

export interface ApplicationCommandInteractionDataOption {
    name: string,
    type: ApplicationCommandOptionType,
    value?: string | number | boolean | User | Channel | Role,
    options?: ApplicationCommandInteractionDataOption[]
}

export interface ApplicationCommandInteractionDataResolved {
    users?: Map<snowflake, User>,
    members?: Map<snowflake, GuildMember>,
    roles?: Map<snowflake, Role>,
    channels?: Map<snowflake, Channel>,
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-interactiontype */
export enum InteractionType {
    Ping = 1,
    ApplicationCommand,
    MessageComponent
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction */
export interface Interaction {
    id: snowflake,
    application_id: snowflake,
    type: InteractionType,
    data?: ApplicationCommandInteractionData,
    guild_id?: snowflake,
    channel_id?: snowflake,
    member?: GuildMember,
    user?: User,
    token: string,
    version: number,
    message?: Message
}

/** https://discord.com/developers/docs/resources/user#user-object-user-structure */
export interface User {
    id: snowflake,
    username: string,
    discriminator: string,
    avatar: string | null,
    bot?: boolean,
    system?: boolean,
    mfa_enabled?: boolean,
    locale?: string,
    verified?: boolean,
    email?: string | null,
    flags?: number,
    premium_type?: number,
    public_flags?: number
}

export interface GuildMember {
    user?: User,
    nick?: string | null,
    roles: snowflake[],
    joined_at: ISO8601Timestamp,
    premium_since?: ISO8601Timestamp | null,
    deaf: boolean,
    mute: boolean,
    pending?: boolean,
    permissions?: string
}

export interface Message {
    id: snowflake,
    channel_id: snowflake,
    guild_id?: snowflake,
    author: User,
    member?: GuildMember,
    content: string,
    timestamp: ISO8601Timestamp,
    edited_timestamp: ISO8601Timestamp | null,
    tts: boolean,
    mention_everyone: boolean,
    mentions: User[],
    mention_roles: snowflake[],
    // mention_channels?: ChannelMention[],
    attatchments: Attachment[],
    // embeds: Embed[],
    // reactions?: Reaction[],
    nonce?: number | string,
    pinned: boolean,
    webhook_id?: snowflake,
    // type: MessageType,
    // activity?: MessageActivity,
    // application?: Application,
    // message_reference?: MessageReference,
    flags?: number,
    // stickers?: Sticker,
    referenced_message?: Message | null,
    // interaction?: MessageInteraction,
    thread?: Channel,
    // components?: MessageComponent[]
}

export interface Channel {
    id: snowflake,
    type: ChannelType,
    guild_id?: snowflake,
    position?: number,
    // permission_overwrites?: Overwrite,
    name?: string,
    topic?: string | null,
    nsfw?: boolean,
    last_message_id?: snowflake | null,
    bitrate?: number,
    user_limit?: number,
    rate_limit_per_user?: number,
    recipients?: User[],
    icon?: string | null,
    owner_id?: snowflake,
    application_id?: snowflake,
    parent_id?: snowflake | null,
    last_pin_timestamp?: ISO8601Timestamp | null,
    rtc_region?: string | null,
    video_quality_mode?: number,
    message_count?: number,
    member_count?: number,
    // thread_metadata?: ThreadMetadata,
    // member?: ThreadMember
}

export enum ChannelType {
    GUILD_TEXT,
    DM,
    GUILD_VOICE,
    GROUP_DM,
    GUILD_CATEGORY,
    GUILD_NEWS,
    GUILD_STORE,
    GUILD_NEWS_THREAD,
    GUILD_PUBLIC_THREAD,
    GUILD_PRIVATE_THREAD,
    GUILD_STAGE_VOICE
}

export interface Role {
    id: snowflake,
    name: string,
    color: number,
    hoist: boolean,
    position: number,
    permissions: string,
    managed: boolean,
    mentionable: boolean,
    tags?: RoleTags
}

export interface RoleTags {
    bot_id?: snowflake,
    integration_id?: snowflake,
    premium_subscriber?: null
}

export interface InteractionResponse {
    type: InteractionCallbackType,
    data?: InteractionApplicationCommandCallbackData
}

export enum InteractionCallbackType {
    Pong = 1,
    ChannelMessageWithSource = 4,
    DeferredChannelMessageWithSource,
    DeferredUpdateMessage,
    UpdateMessage
}

export interface InteractionApplicationCommandCallbackData {
    tts?: boolean,
    content?: string,
    embeds?: Embed[],
    allowed_mentions?: AllowedMentions,
    flags?: number,
    components?: Component[]
}

export enum InteractionCallbackFlags {
    HIDDEN = 1 << 6,
}

export enum AllowedMentionType {
    ROLE_MENTIONS='roles',
    USER_MENTIONS='users',
    EVERYONE_MENTIONS='everyone'
}

export interface AllowedMentions {
    parse: AllowedMentionType[],
    roles: snowflake[],
    users: snowflake[],
    replied_user: boolean
}

export interface Embed {
    title?: string,
    type?: EmbedType,
    description?: string,
    url?: string,
    timestamp?: ISO8601Timestamp,
    color?: number,
    footer?: EmbedFooter,
    image?: EmbedImage,
    thumbnail?: EmbedThumbnail,
    video?: EmbedVideo,
    provider?: EmbedProvider,
    author?: EmbedAuthor,
    fields?: EmbedField[]
}

export enum EmbedType {
    RICH = 'rich',
    IMAGE = 'image',
    VIDEO = 'video',
    GIFV ='gifv',
    ARTICLE = 'article',
    LINK ='link'
}

interface EmbedMedia {
    url?: string,
    proxy_url?: string,
    height?: number,
    width?: number
}

export interface EmbedThumbnail extends EmbedMedia {}

export interface EmbedVideo extends EmbedMedia {}

export interface EmbedImage extends EmbedMedia {}

export interface EmbedProvider {
    name?: string,
    url?: string
}

export interface EmbedFooter {
    text: string,
    icon_url?: string,
    procy_icon_url?: string
}

export interface EmbedAuthor {
    name?: string,
    url?: string,
    icon_url?: string,
    proxy_icon_url?: string
}

export interface EmbedField {
    name: string,
    value: string,
    inline?: boolean
}

export interface Attachment {
    id: snowflake,
    filename: string,
    content_type?: string,
    size: number,
    url: string,
    proxy_url: string,
    height?: number | null,
    width?: number | null
}

export enum ComponentType {
    ActionRow = 1,
    Button
}

export enum ButtonStyle {
    Primary = 1,
    Secondary = 2,
    Success = 3,
    Danger = 4,
    Link = 5
}

export interface Emoji {
    id: snowflake | null,
    name: string | null,
    roles?: snowflake[],
    user?: User,
    require_colons?: boolean,
    managed?: boolean,
    animated?: boolean,
    available?: boolean
}

export interface Component {
    type: ComponentType,
}

export interface Button extends Component {
    style?: ButtonStyle,
    label?: string,
    emoji?: Emoji,
    custom_id?: string,
    url?: string,
    disabled?: boolean,
}

export interface ActionRow extends Component {
    components?: Component[]
}
