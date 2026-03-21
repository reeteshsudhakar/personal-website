"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { ChevronLeft, ChevronRight, Search, ZoomIn, ZoomOut } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ToolPageHeader } from "@/components/ToolPageHeader/ToolPageHeader";
import { cn } from "@/lib/utils";

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

type TreeNode = {
    id: string;
    path: string;
    keyLabel: string;
    label: string;
    type: "object" | "array" | "string" | "number" | "boolean" | "null";
    depth: number;
    preview: string;
    childCount: number;
    children: TreeNode[];
};

type LayoutNode = {
    id: string;
    path: string;
    label: string;
    type: TreeNode["type"];
    preview: string;
    depth: number;
    x: number;
    y: number;
    width: number;
    height: number;
    childCount: number;
    isCollapsed: boolean;
    isMatch: boolean;
};

type LayoutEdge = {
    id: string;
    from: string;
    to: string;
};

type LayoutGraph = {
    nodes: LayoutNode[];
    edges: LayoutEdge[];
    width: number;
    height: number;
    matchCount: number;
};

type Viewport = {
    x: number;
    y: number;
    scale: number;
};

type MetricCardData = {
    label: string;
    value: string | number;
    tooltip: string;
};

const CAMERA_ANIMATION_MS = 280;

const SAMPLE_JSON = `{
  "order": {
    "id": "ord_1042",
    "status": "processing",
    "customer": {
      "id": 42,
      "name": "Reetesh",
      "segments": ["beta", "newsletter"],
      "address": {
        "city": "Austin",
        "state": "TX"
      }
    },
    "items": [
      {
        "sku": "keyboard-01",
        "quantity": 1,
        "price": 129.99
      },
      {
        "sku": "mouse-02",
        "quantity": 2,
        "price": 39.5
      }
    ],
    "shipping": {
      "provider": "UPS",
      "events": [
        {
          "step": "label_created",
          "timestamp": "2026-03-17T10:00:00Z"
        },
        {
          "step": "picked_up",
          "timestamp": "2026-03-17T14:30:00Z"
        }
      ]
    }
  }
}`;

const NODE_WIDTH = 220;
const NODE_HEIGHT = 64;
const HORIZONTAL_GAP = 150;
const VERTICAL_GAP = 30;
const GRAPH_PADDING = 40;
const GRAPH_FRAME_HEIGHT = 640;

function getValueType(value: JsonValue): TreeNode["type"] {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    switch (typeof value) {
        case "string":
            return "string";
        case "number":
            return "number";
        case "boolean":
            return "boolean";
        default:
            return "object";
    }
}

function getValuePreview(value: JsonValue): string {
    if (value === null) return "null";
    if (Array.isArray(value)) return `${value.length} item${value.length === 1 ? "" : "s"}`;
    if (typeof value === "object")
        return `${Object.keys(value).length} key${Object.keys(value).length === 1 ? "" : "s"}`;
    if (typeof value === "string") return value.length > 48 ? `"${value.slice(0, 45)}..."` : JSON.stringify(value);
    return String(value);
}

function buildTree(value: JsonValue, path: string = "root", keyLabel: string = "root", depth: number = 0): TreeNode {
    const type = getValueType(value);
    const children: TreeNode[] = [];

    if (Array.isArray(value)) {
        value.forEach((item, index) => {
            children.push(buildTree(item, `${path}[${index}]`, `[${index}]`, depth + 1));
        });
    } else if (value !== null && typeof value === "object") {
        Object.entries(value).forEach(([key, nested]) => {
            children.push(buildTree(nested, `${path}.${key}`, key, depth + 1));
        });
    }

    return {
        id: path,
        path,
        keyLabel,
        label: keyLabel,
        type,
        depth,
        preview: getValuePreview(value),
        childCount: children.length,
        children,
    };
}

function matchesSearch(node: TreeNode, normalizedQuery: string): boolean {
    if (!normalizedQuery) return false;
    return [node.path, node.keyLabel, node.preview, node.type].join(" ").toLowerCase().includes(normalizedQuery);
}

function layoutTree(root: TreeNode, collapsedPaths: Set<string>, query: string): LayoutGraph {
    const normalizedQuery = query.trim().toLowerCase();
    const nodes: LayoutNode[] = [];
    const edges: LayoutEdge[] = [];
    let rowIndex = 0;
    let matchCount = 0;

    const walk = (node: TreeNode): number => {
        const isCollapsed = collapsedPaths.has(node.path);
        const isMatch = matchesSearch(node, normalizedQuery);
        if (isMatch) matchCount += 1;

        const x = GRAPH_PADDING + node.depth * (NODE_WIDTH + HORIZONTAL_GAP);
        let y = GRAPH_PADDING + rowIndex * (NODE_HEIGHT + VERTICAL_GAP);

        if (!isCollapsed && node.children.length > 0) {
            const childPositions = node.children.map((child) => {
                const childY = walk(child);
                edges.push({
                    id: `${node.id}->${child.id}`,
                    from: node.id,
                    to: child.id,
                });
                return childY;
            });

            y = childPositions.reduce((sum, value) => sum + value, 0) / childPositions.length;
        } else {
            rowIndex += 1;
        }

        nodes.push({
            id: node.id,
            path: node.path,
            label: node.keyLabel,
            type: node.type,
            preview: node.preview,
            depth: node.depth,
            x,
            y,
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
            childCount: node.childCount,
            isCollapsed,
            isMatch,
        });

        return y;
    };

    walk(root);

    const maxDepth = nodes.reduce((max, node) => Math.max(max, node.depth), 0);
    const width = GRAPH_PADDING * 2 + NODE_WIDTH + maxDepth * (NODE_WIDTH + HORIZONTAL_GAP);
    const height = Math.max(
        420,
        GRAPH_PADDING * 2 + Math.max(1, rowIndex) * (NODE_HEIGHT + VERTICAL_GAP) - VERTICAL_GAP,
    );

    return { nodes, edges, width, height, matchCount };
}

function fitGraph(graph: LayoutGraph, width: number, height: number): Viewport {
    const safeWidth = Math.max(width - 48, 240);
    const safeHeight = Math.max(height - 48, 240);
    const scale = Math.min(safeWidth / graph.width, safeHeight / graph.height, 1);
    const normalizedScale = Number(Math.max(0.25, scale).toFixed(3));
    return {
        scale: normalizedScale,
        x: (width - graph.width * normalizedScale) / 2,
        y: (height - graph.height * normalizedScale) / 2,
    };
}

function centerNodeInViewport(
    node: LayoutNode,
    width: number,
    height: number,
    scale: number,
    inspectorOffset: number = 0,
): Viewport {
    const viewportWidth = Math.max(width - inspectorOffset, 160);
    const centerX = node.x + node.width / 2;
    const centerY = node.y + node.height / 2;

    return {
        scale,
        x: Math.round(viewportWidth / 2 - centerX * scale + Math.max(inspectorOffset / 2, 0)),
        y: Math.round(height / 2 - centerY * scale),
    };
}

function getOverviewViewport(graph: LayoutGraph, width: number, height: number, isInspectorOpen: boolean): Viewport {
    const shouldFitEntireGraph = graph.nodes.length <= 80 && graph.width <= width * 2 && graph.height <= height * 2.25;

    if (shouldFitEntireGraph) {
        return fitGraph(graph, width, height);
    }

    const rootNode = graph.nodes.find((node) => node.path === "root") ?? graph.nodes[0];
    if (!rootNode) {
        return fitGraph(graph, width, height);
    }

    const targetScale = graph.nodes.length > 220 || graph.height > height * 4 || graph.width > width * 5 ? 0.42 : 0.58;

    return centerNodeInViewport(rootNode, width, height, targetScale, isInspectorOpen ? 360 : 0);
}

function isSameViewport(a: Viewport, b: Viewport): boolean {
    return a.x === b.x && a.y === b.y && a.scale === b.scale;
}

function previewSelectedValue(root: JsonValue, path: string): string {
    if (path === "root") return JSON.stringify(root, null, 2);

    const segments = path
        .replace(/^root\.?/, "")
        .split(/(?=\[)|\./)
        .filter(Boolean);

    let current: JsonValue = root;
    for (const segment of segments) {
        if (segment.startsWith("[")) {
            const index = Number(segment.replace(/\[|\]/g, ""));
            if (!Array.isArray(current) || Number.isNaN(index)) return "Unavailable";
            current = current[index] as JsonValue;
        } else {
            if (current === null || Array.isArray(current) || typeof current !== "object") return "Unavailable";
            current = current[segment] as JsonValue;
        }
    }

    return JSON.stringify(current, null, 2);
}

function tryParseJson(str: string): { ok: true; value: unknown } | { ok: false; error: string; line?: number } {
    if (str.trim() === "") return { ok: true, value: null };
    try {
        const value = JSON.parse(str);
        return { ok: true, value };
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Invalid JSON";
        let lineNumber: number | undefined;
        const lineMatch = errorMessage.match(/line (\d+)/i);
        if (lineMatch) {
            lineNumber = parseInt(lineMatch[1], 10);
        } else {
            const positionMatch = errorMessage.match(/position (\d+)/i);
            if (positionMatch) {
                const position = parseInt(positionMatch[1], 10);
                const lines = str.substring(0, Math.min(position, str.length)).split("\n");
                lineNumber = lines.length;
            } else {
                const columnMatch = errorMessage.match(/column (\d+)/i);
                if (columnMatch) {
                    const approximateLine = Math.ceil(str.length / 80);
                    if (approximateLine > 0) lineNumber = approximateLine;
                }
            }
        }

        return {
            ok: false,
            error: errorMessage,
            line: lineNumber,
        };
    }
}

type JsonMetrics = {
    lines: number;
    size: number;
    sizeFormatted: string;
    topLevelKeys: number;
    totalKeys: number;
    maxDepth: number;
    arrayCount: number;
    objectCount: number;
    stringCount: number;
    numberCount: number;
    booleanCount: number;
    nullCount: number;
};

function calculateMetrics(jsonStr: string, value: JsonValue): JsonMetrics {
    const lines = jsonStr === "" ? 0 : jsonStr.split("\n").length;
    const size = new TextEncoder().encode(jsonStr).length;
    const sizeFormatted =
        size < 1024
            ? `${size} B`
            : size < 1024 * 1024
            ? `${(size / 1024).toFixed(2)} KB`
            : `${(size / (1024 * 1024)).toFixed(2)} MB`;

    let topLevelKeys = 0;
    let totalKeys = 0;
    let maxDepth = 0;
    let arrayCount = 0;
    let objectCount = 0;
    let stringCount = 0;
    let numberCount = 0;
    let booleanCount = 0;
    let nullCount = 0;

    function traverse(obj: JsonValue, depth: number = 0): void {
        maxDepth = Math.max(maxDepth, depth);

        if (obj === null) {
            nullCount++;
            return;
        }

        if (Array.isArray(obj)) {
            arrayCount++;
            obj.forEach((item) => traverse(item, depth + 1));
            return;
        }

        if (typeof obj === "object") {
            objectCount++;
            const keys = Object.keys(obj);
            if (depth === 0) {
                topLevelKeys = keys.length;
            }
            totalKeys += keys.length;
            keys.forEach((key) => {
                traverse((obj as Record<string, JsonValue>)[key], depth + 1);
            });
            return;
        }

        switch (typeof obj) {
            case "string":
                stringCount++;
                break;
            case "number":
                numberCount++;
                break;
            case "boolean":
                booleanCount++;
                break;
        }
    }

    if (value !== null) {
        traverse(value);
    }

    return {
        lines,
        size,
        sizeFormatted,
        topLevelKeys,
        totalKeys,
        maxDepth,
        arrayCount,
        objectCount,
        stringCount,
        numberCount,
        booleanCount,
        nullCount,
    };
}

export default function JsonFormatterPage() {
    const [raw, setRaw] = useState(SAMPLE_JSON);
    const [search, setSearch] = useState("");
    const [selectedPath, setSelectedPath] = useState("root");
    const [collapsedPaths, setCollapsedPaths] = useState<Set<string>>(new Set());
    const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0, scale: 1 });
    const [hasCustomViewport, setHasCustomViewport] = useState(false);
    const [isInspectorOpen, setIsInspectorOpen] = useState(true);
    const [graphFrameSize, setGraphFrameSize] = useState({ width: 0, height: GRAPH_FRAME_HEIGHT });
    const { resolvedTheme } = useTheme();
    const graphFrameRef = useRef<HTMLDivElement | null>(null);
    const dragState = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);
    const viewportRef = useRef<Viewport>({ x: 0, y: 0, scale: 1 });
    const animationFrameRef = useRef<number | null>(null);
    const parsed = useMemo(() => tryParseJson(raw), [raw]);
    const isValid = parsed.ok;
    const metrics = isValid && parsed.ok ? calculateMetrics(raw, parsed.value as JsonValue) : null;
    const tree = useMemo(() => {
        if (!isValid || !parsed.ok) return null;
        return buildTree(parsed.value as JsonValue);
    }, [isValid, parsed]);
    const graph = useMemo(
        () => (tree ? layoutTree(tree, collapsedPaths, search) : null),
        [tree, collapsedPaths, search],
    );
    const selectedNode = graph?.nodes.find((node) => node.path === selectedPath) ?? null;
    const selectedValue = isValid && parsed.ok ? previewSelectedValue(parsed.value as JsonValue, selectedPath) : "";
    const summaryCards: MetricCardData[] = metrics
        ? [
              {
                  label: "Size",
                  value: metrics.sizeFormatted,
                  tooltip: "UTF-8 byte size of the current JSON text.",
              },
              {
                  label: "Lines",
                  value: metrics.lines,
                  tooltip: "Number of lines in the editor right now.",
              },
              {
                  label: "Total Keys",
                  value: metrics.totalKeys,
                  tooltip: "Count of all object keys across the payload. Array indices are not counted as keys.",
              },
              {
                  label: "Max Depth",
                  value: metrics.maxDepth,
                  tooltip: "Deepest nesting level in the parsed JSON. Root starts at depth 0.",
              },
              {
                  label: "Objects",
                  value: metrics.objectCount,
                  tooltip: "Number of object nodes in the parsed structure.",
              },
              {
                  label: "Arrays",
                  value: metrics.arrayCount,
                  tooltip: "Number of array nodes in the parsed structure.",
              },
          ]
        : [];

    useEffect(() => {
        viewportRef.current = viewport;
    }, [viewport]);

    const stopViewportAnimation = useCallback(() => {
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    }, []);

    const animateViewportTo = useCallback(
        (target: Viewport, duration: number = CAMERA_ANIMATION_MS) => {
            stopViewportAnimation();

            const start = viewportRef.current;
            if (isSameViewport(start, target)) return;

            const startedAt = performance.now();
            const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

            const tick = (now: number) => {
                const progress = Math.min(1, (now - startedAt) / duration);
                const eased = easeInOutCubic(progress);
                const nextViewport = {
                    x: Math.round(start.x + (target.x - start.x) * eased),
                    y: Math.round(start.y + (target.y - start.y) * eased),
                    scale: Number((start.scale + (target.scale - start.scale) * eased).toFixed(4)),
                };

                setViewport(nextViewport);

                if (progress < 1) {
                    animationFrameRef.current = requestAnimationFrame(tick);
                    return;
                }

                viewportRef.current = target;
                animationFrameRef.current = null;
            };

            animationFrameRef.current = requestAnimationFrame(tick);
        },
        [stopViewportAnimation],
    );

    useEffect(() => {
        if (!graphFrameRef.current) return undefined;

        const element = graphFrameRef.current;
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (!entry) return;
            setGraphFrameSize({
                width: entry.contentRect.width,
                height: entry.contentRect.height,
            });
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!graph || graphFrameSize.width === 0 || hasCustomViewport) return;
        const nextViewport = getOverviewViewport(graph, graphFrameSize.width, graphFrameSize.height, isInspectorOpen);
        setViewport((current) => (isSameViewport(current, nextViewport) ? current : nextViewport));
    }, [graph, graphFrameSize, hasCustomViewport, isInspectorOpen]);

    useEffect(() => () => stopViewportAnimation(), [stopViewportAnimation]);

    useEffect(() => {
        setHasCustomViewport(false);
    }, [raw, collapsedPaths]);

    useEffect(() => {
        if (!graph) {
            setSelectedPath("root");
        }
    }, [graph]);

    const handleFormat = useCallback(() => {
        if (!parsed.ok) return;
        setRaw(JSON.stringify(parsed.value, null, 2));
    }, [parsed]);

    const handleFlatten = useCallback(() => {
        if (!parsed.ok) return;
        setRaw(JSON.stringify(parsed.value));
    }, [parsed]);

    const errorMessage = parsed.ok
        ? "Valid JSON"
        : parsed.line
        ? `Error at line ${parsed.line}: ${parsed.error}`
        : parsed.error;

    const toggleCollapsed = useCallback((path: string) => {
        setCollapsedPaths((current) => {
            const next = new Set(current);
            if (next.has(path)) {
                next.delete(path);
            } else {
                next.add(path);
            }
            return next;
        });
    }, []);

    const handleResetView = useCallback(() => {
        if (!graph) return;
        animateViewportTo(getOverviewViewport(graph, graphFrameSize.width, graphFrameSize.height, isInspectorOpen));
        setHasCustomViewport(false);
    }, [animateViewportTo, graph, graphFrameSize.height, graphFrameSize.width, isInspectorOpen]);

    const handleZoom = useCallback(
        (direction: "in" | "out") => {
            const current = viewportRef.current;
            animateViewportTo({
                ...current,
                scale: Number(
                    Math.min(2.5, Math.max(0.25, current.scale * (direction === "in" ? 1.15 : 1 / 1.15))).toFixed(3),
                ),
            });
            setHasCustomViewport(true);
        },
        [animateViewportTo],
    );

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <ToolPageHeader
                title="JSON Formatter & Validator"
                description="Paste JSON to validate and format it, then inspect the structure in the visualizer. Click a node to inspect it, double-click object and array nodes to collapse them, drag the canvas to move around, and use the zoom controls when you want to get closer."
            />
            <div className="mb-6 flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={cn("text-sm font-medium", isValid ? "text-[#50B384]" : "text-destructive")}>
                        {errorMessage}
                    </span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setRaw(SAMPLE_JSON)}>
                            Load Sample
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleFlatten}
                            disabled={!isValid || raw.trim() === ""}
                        >
                            Flatten
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleFormat}
                            disabled={!isValid || raw.trim() === ""}
                        >
                            Format
                        </Button>
                    </div>
                </div>
                <div
                    className={cn(
                        "overflow-hidden rounded-md",
                        isValid ? "border border-input" : "border border-destructive",
                    )}
                >
                    <CodeMirror
                        value={raw}
                        onChange={setRaw}
                        height="520px"
                        minHeight="280px"
                        extensions={[json()]}
                        theme={resolvedTheme === "dark" ? oneDark : undefined}
                        placeholder='{"example": "paste JSON here"}'
                        basicSetup={{
                            lineNumbers: true,
                            foldGutter: true,
                            dropCursor: false,
                            allowMultipleSelections: false,
                        }}
                        className={cn(
                            "text-sm",
                            !isValid &&
                                "[&_.cm-focused]:outline-destructive [&_.cm-focused]:ring-2 [&_.cm-focused]:ring-destructive/20",
                        )}
                    />
                </div>
            </div>
            {metrics && (
                <div className="mb-6">
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <h2 className="text-lg font-semibold text-foreground">Summary</h2>
                        <p className="text-xs text-muted-foreground">Hover any metric for details.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
                        <TooltipProvider>
                            {summaryCards.map((metric) => (
                                <Tooltip key={metric.label}>
                                    <TooltipTrigger asChild>
                                        <Card className="cursor-help border-border/50">
                                            <CardHeader className="pb-2">
                                                <CardDescription className="text-xs">{metric.label}</CardDescription>
                                                <CardTitle className="text-lg font-semibold text-[#0172AF] dark:text-[#50B384]">
                                                    {metric.value}
                                                </CardTitle>
                                            </CardHeader>
                                        </Card>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" sideOffset={8}>
                                        {metric.tooltip}
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </TooltipProvider>
                    </div>
                </div>
            )}
            <div className="mb-6">
                <Card className="gap-4">
                    <CardHeader className="gap-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <CardTitle>Structure Visualizer</CardTitle>
                                <CardDescription>Full-width graph view of the current JSON payload.</CardDescription>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div className="min-w-[240px] flex-1">
                                <div className="relative">
                                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                        placeholder="Search path, key, type, or preview..."
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setCollapsedPaths(new Set());
                                        setSelectedPath("root");
                                    }}
                                    disabled={!graph}
                                >
                                    Expand All
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <span>{graph?.nodes.length ?? 0} visible nodes</span>
                            <span>{graph?.edges.length ?? 0} edges</span>
                            <span>{graph?.matchCount ?? 0} matches</span>
                            <span>Zoom {Math.round(viewport.scale * 100)}%</span>
                        </div>
                        {graph ? (
                            <div
                                ref={graphFrameRef}
                                className="relative h-[640px] overflow-hidden rounded-xl border bg-[radial-gradient(circle_at_top_left,rgba(1,114,175,0.08),transparent_35%),linear-gradient(to_bottom_right,rgba(80,179,132,0.06),transparent_50%)]"
                                onPointerDown={(event) => {
                                    stopViewportAnimation();
                                    dragState.current = {
                                        startX: event.clientX,
                                        startY: event.clientY,
                                        originX: viewport.x,
                                        originY: viewport.y,
                                    };
                                }}
                                onPointerMove={(event) => {
                                    if (!dragState.current) return;
                                    const deltaX = event.clientX - dragState.current.startX;
                                    const deltaY = event.clientY - dragState.current.startY;
                                    setViewport({
                                        x: dragState.current.originX + deltaX,
                                        y: dragState.current.originY + deltaY,
                                        scale: viewport.scale,
                                    });
                                    setHasCustomViewport(true);
                                }}
                                onPointerUp={() => {
                                    dragState.current = null;
                                }}
                                onPointerLeave={() => {
                                    dragState.current = null;
                                }}
                            >
                                {!isInspectorOpen && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="absolute right-4 top-4 z-20 bg-background/80 backdrop-blur"
                                        onClick={() => setIsInspectorOpen(true)}
                                    >
                                        Node Details
                                        <ChevronLeft className="size-4" />
                                    </Button>
                                )}
                                <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon-sm"
                                        className="bg-background/80 backdrop-blur"
                                        onClick={() => handleZoom("out")}
                                        aria-label="Zoom out"
                                    >
                                        <ZoomOut className="size-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon-sm"
                                        className="bg-background/80 backdrop-blur"
                                        onClick={() => handleZoom("in")}
                                        aria-label="Zoom in"
                                    >
                                        <ZoomIn className="size-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-background/80 backdrop-blur"
                                        onClick={handleResetView}
                                    >
                                        Reset View
                                    </Button>
                                </div>
                                <svg className="absolute inset-0 size-full cursor-grab active:cursor-grabbing">
                                    <g transform={`translate(${viewport.x} ${viewport.y}) scale(${viewport.scale})`}>
                                        {graph.edges.map((edge) => {
                                            const from = graph.nodes.find((node) => node.id === edge.from);
                                            const to = graph.nodes.find((node) => node.id === edge.to);
                                            if (!from || !to) return null;

                                            const startX = from.x + from.width;
                                            const startY = from.y + from.height / 2;
                                            const endX = to.x;
                                            const endY = to.y + to.height / 2;
                                            const curve = (endX - startX) / 2;

                                            return (
                                                <path
                                                    key={edge.id}
                                                    d={`M ${startX} ${startY} C ${startX + curve} ${startY}, ${
                                                        endX - curve
                                                    } ${endY}, ${endX} ${endY}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeOpacity={0.18}
                                                    strokeWidth={2}
                                                />
                                            );
                                        })}
                                        {graph.nodes.map((node) => {
                                            const selected = node.path === selectedPath;
                                            return (
                                                <g
                                                    key={node.id}
                                                    transform={`translate(${node.x} ${node.y})`}
                                                    className="cursor-pointer"
                                                    onPointerDown={(event) => {
                                                        event.stopPropagation();
                                                    }}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        setSelectedPath(node.path);
                                                        animateViewportTo(
                                                            centerNodeInViewport(
                                                                node,
                                                                graphFrameSize.width,
                                                                graphFrameSize.height,
                                                                Math.min(
                                                                    2.5,
                                                                    Math.max(viewportRef.current.scale, 0.95),
                                                                ),
                                                                360,
                                                            ),
                                                        );
                                                        setHasCustomViewport(true);
                                                    }}
                                                    onDoubleClick={(event) => {
                                                        event.stopPropagation();
                                                        if (node.childCount > 0) toggleCollapsed(node.path);
                                                    }}
                                                >
                                                    <rect
                                                        width={node.width}
                                                        height={node.height}
                                                        rx={18}
                                                        className={cn(
                                                            "stroke-border fill-background/95",
                                                            selected && "stroke-[#0172AF] dark:stroke-[#50B384]",
                                                            node.isMatch && "fill-accent",
                                                        )}
                                                        strokeWidth={selected ? 2.5 : 1}
                                                    />
                                                    <circle
                                                        cx={18}
                                                        cy={20}
                                                        r={6}
                                                        className={cn(
                                                            node.type === "object" && "fill-[#0172AF]",
                                                            node.type === "array" && "fill-[#50B384]",
                                                            node.type !== "object" &&
                                                                node.type !== "array" &&
                                                                "fill-foreground",
                                                        )}
                                                    />
                                                    <text
                                                        x={32}
                                                        y={24}
                                                        className="fill-foreground text-[13px] font-semibold"
                                                    >
                                                        {node.label.length > 24
                                                            ? `${node.label.slice(0, 21)}...`
                                                            : node.label}
                                                    </text>
                                                    <text x={16} y={46} className="fill-muted-foreground text-[11px]">
                                                        {`${node.type} • ${node.preview}`.slice(0, 34)}
                                                    </text>
                                                    {node.childCount > 0 && (
                                                        <text
                                                            x={node.width - 18}
                                                            y={22}
                                                            textAnchor="middle"
                                                            className="fill-muted-foreground text-[16px] font-semibold"
                                                        >
                                                            {node.isCollapsed ? "+" : "−"}
                                                        </text>
                                                    )}
                                                </g>
                                            );
                                        })}
                                    </g>
                                </svg>
                                <aside
                                    className={cn(
                                        "absolute right-4 top-4 bottom-4 z-20 flex w-[min(340px,calc(100%-2rem))] flex-col rounded-2xl border border-border/60 bg-background/70 shadow-lg backdrop-blur-md transition-transform duration-300",
                                        isInspectorOpen ? "translate-x-0" : "translate-x-[calc(100%+1rem)]",
                                    )}
                                >
                                    <div className="flex items-start justify-between gap-3 border-b border-border/50 px-4 py-3">
                                        <div>
                                            <div className="text-sm font-semibold text-foreground">Selected Node</div>
                                            <div className="text-xs text-muted-foreground">
                                                Context for the current path without leaving the graph.
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            onClick={() => setIsInspectorOpen(false)}
                                            aria-label="Hide node details"
                                        >
                                            <ChevronRight className="size-4" />
                                        </Button>
                                    </div>
                                    <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 py-3">
                                        <div>
                                            <Label className="mb-1 block text-[11px] uppercase tracking-wide text-muted-foreground">
                                                Path
                                            </Label>
                                            <div className="rounded-lg border bg-background/65 px-3 py-2 font-mono text-xs">
                                                {selectedPath}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <Label className="mb-1 block text-[11px] uppercase tracking-wide text-muted-foreground">
                                                    Type
                                                </Label>
                                                <div className="rounded-lg border bg-background/65 px-3 py-2 font-mono text-xs">
                                                    {selectedNode?.type ?? "n/a"}
                                                </div>
                                            </div>
                                            <div>
                                                <Label className="mb-1 block text-[11px] uppercase tracking-wide text-muted-foreground">
                                                    Children
                                                </Label>
                                                <div className="rounded-lg border bg-background/65 px-3 py-2 font-mono text-xs">
                                                    {selectedNode?.childCount ?? 0}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => toggleCollapsed(selectedPath)}
                                                disabled={!selectedNode || selectedNode.childCount === 0}
                                                className="flex-1 bg-background/65"
                                            >
                                                {selectedNode?.isCollapsed ? "Expand" : "Collapse"}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setCollapsedPaths(new Set());
                                                    setSelectedPath("root");
                                                    setHasCustomViewport(false);
                                                }}
                                                className="bg-background/65"
                                            >
                                                Reset
                                            </Button>
                                        </div>
                                        <div className="min-h-0 flex-1">
                                            <Label className="mb-1 block text-[11px] uppercase tracking-wide text-muted-foreground">
                                                Value Preview
                                            </Label>
                                            <div className="h-full overflow-auto rounded-lg border bg-background/65 p-3 font-mono text-xs whitespace-pre-wrap">
                                                {selectedValue}
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        ) : (
                            <div className="flex h-[640px] items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
                                Enter valid JSON to render the visualizer.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
