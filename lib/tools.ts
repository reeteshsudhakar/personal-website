export type ToolItem = {
    id: string;
    title: string;
    description: string;
    href: string;
};

export const TOOLS_LIST: ToolItem[] = [
    {
        id: "yaml-json-converter",
        title: "YAML ↔ JSON",
        description: "Convert YAML to JSON or JSON to YAML with validation, copy, and download.",
        href: "/tools/yaml-json-converter",
    },
    {
        id: "jwt-decoder",
        title: "JWT Decoder",
        description: "Decode JWT header and payload, inspect claims, and check expiration timestamps.",
        href: "/tools/jwt-decoder",
    },
    {
        id: "json-to-ts-types",
        title: "JSON → TS Types",
        description: "Generate TypeScript interfaces and types from JSON structures.",
        href: "/tools/json-to-ts-types",
    },
    {
        id: "uuid-generator",
        title: "UUID Generator",
        description: "Generate one or many UUID v4 values and copy or download the list.",
        href: "/tools/uuid-generator",
    },
    {
        id: "curl-to-fetch",
        title: "Curl → fetch",
        description: "Convert common cURL commands into fetch API code snippets.",
        href: "/tools/curl-to-fetch",
    },
    {
        id: "regex-tester",
        title: "Regex Tester",
        description: "Test regular expressions against text with live matches and capture groups.",
        href: "/tools/regex-tester",
    },
    {
        id: "base64-tool",
        title: "Base64 Tool",
        description: "Encode and decode Base64 and Base64URL strings quickly.",
        href: "/tools/base64-tool",
    },
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
