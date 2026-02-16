export type ToolItem = {
    id: string;
    title: string;
    description: string;
    href: string;
};

export const TOOLS_LIST: ToolItem[] = [
    {
        id: "json-formatter",
        title: "JSON Formatter & Validator",
        description: "Validate JSON as you type and format it with pretty print.",
        href: "/tools/json-formatter",
    },
    {
        id: "url-encoder",
        title: "URL Encoder & Decoder",
        description: "Encode strings to URL-safe format or decode URL-encoded strings back to normal text.",
        href: "/tools/url-encoder",
    },
    {
        id: "timestamp-converter",
        title: "Timestamp Converter",
        description:
            "Convert between epoch timestamps (seconds, milliseconds, microseconds, nanoseconds) and human-readable date/time in UTC and local timezone.",
        href: "/tools/timestamp-converter",
    },
];
