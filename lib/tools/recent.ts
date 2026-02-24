import { TOOLS_LIST } from "./registry";

const RECENT_TOOLS_STORAGE_KEY = "recentTools";
const MAX_RECENT_TOOLS = 3;

export function recordRecentToolVisit(toolId: string) {
    if (typeof window === "undefined") return;
    if (!TOOLS_LIST.some((tool) => tool.id === toolId)) return;

    const current = getRecentToolIds();
    const next = [toolId, ...current.filter((id) => id !== toolId)].slice(0, MAX_RECENT_TOOLS);
    window.localStorage.setItem(RECENT_TOOLS_STORAGE_KEY, JSON.stringify(next));
}

export function getRecentToolIds(): string[] {
    if (typeof window === "undefined") return [];

    try {
        const raw = window.localStorage.getItem(RECENT_TOOLS_STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter((id): id is string => typeof id === "string");
    } catch {
        return [];
    }
}
