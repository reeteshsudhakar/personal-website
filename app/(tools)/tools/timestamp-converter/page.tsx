"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton } from "@/components/CopyButton/CopyButton";
import { cn } from "@/lib/utils";

type EpochUnit = "seconds" | "milliseconds" | "microseconds" | "nanoseconds";

const EPOCH_UNITS: { value: EpochUnit; label: string; multiplier: number }[] = [
    { value: "seconds", label: "Seconds", multiplier: 1000 },
    { value: "milliseconds", label: "Milliseconds", multiplier: 1 },
    { value: "microseconds", label: "Microseconds", multiplier: 0.001 },
    { value: "nanoseconds", label: "Nanoseconds", multiplier: 0.000001 },
];

function detectEpochUnit(timestamp: string): EpochUnit {
    const num = parseFloat(timestamp);
    if (isNaN(num)) return "milliseconds";
    const str = timestamp.replace(/\./g, "");
    if (str.length <= 10) return "seconds";
    if (str.length <= 13) return "milliseconds";
    if (str.length <= 16) return "microseconds";
    return "nanoseconds";
}

function formatDate(date: Date, timezone: "UTC" | "local"): string {
    if (timezone === "UTC") {
        return date
            .toISOString()
            .replace("T", " ")
            .replace(/\.\d{3}Z$/, " UTC");
    }
    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZoneName: "short",
    });
}

function getIsoString(date: Date): string {
    return date.toISOString();
}

function getCurrentDateTime() {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0].substring(0, 8); // HH:MM:SS
    return { date, time };
}

export default function TimestampConverterPage() {
    const { date: defaultDate, time: defaultTime } = getCurrentDateTime();
    const [isEpochToDate, setIsEpochToDate] = useState(true);
    const [epochInput, setEpochInput] = useState("");
    const [dateInput, setDateInput] = useState(defaultDate);
    const [timeInput, setTimeInput] = useState(defaultTime);
    const [timezone, setTimezone] = useState<string>("UTC");
    const [copied, setCopied] = useState<string | null>(null);
    const [currentEpoch, setCurrentEpoch] = useState({ seconds: "", milliseconds: "" });

    useEffect(() => {
        const updateEpoch = () => {
            const now = Date.now();
            setCurrentEpoch({
                seconds: Math.floor(now / 1000).toString(),
                milliseconds: now.toString(),
            });
        };
        updateEpoch();
        const interval = setInterval(updateEpoch, 5000);
        return () => clearInterval(interval);
    }, []);

    const epochToDateResult = useMemo(() => {
        if (!epochInput.trim()) return null;

        const num = parseFloat(epochInput);
        if (isNaN(num)) {
            return { error: "Invalid epoch timestamp" };
        }

        try {
            const detectedUnit = detectEpochUnit(epochInput);
            const multiplier = EPOCH_UNITS.find((u) => u.value === detectedUnit)?.multiplier ?? 1;
            const milliseconds = num * multiplier;

            if (milliseconds < -8640000000000000 || milliseconds > 8640000000000000) {
                return { error: "Timestamp out of valid range" };
            }

            const date = new Date(milliseconds);
            if (isNaN(date.getTime())) {
                return { error: "Invalid date" };
            }

            return {
                utc: formatDate(date, "UTC"),
                local: formatDate(date, "local"),
                utcIsoString: getIsoString(date),
                detectedUnit,
            };
        } catch {
            return { error: "Conversion failed" };
        }
    }, [epochInput]);

    const dateToEpochResult = useMemo(() => {
        if (!dateInput.trim()) return null;

        try {
            const time = timeInput.trim() || "00:00:00";
            const dateTimeStr = `${dateInput}T${time}`;
            const date = timezone === "UTC" ? new Date(dateTimeStr + "Z") : new Date(dateTimeStr);

            if (isNaN(date.getTime())) {
                return { error: "Invalid date/time" };
            }

            const milliseconds = date.getTime();
            return {
                seconds: Math.floor(milliseconds / 1000).toString(),
                milliseconds: milliseconds.toString(),
                microseconds: Math.floor(milliseconds * 1000).toString(),
                nanoseconds: Math.floor(milliseconds * 1000000).toString(),
                note: "Microseconds and nanoseconds are calculated from milliseconds (padded with zeros).",
            };
        } catch {
            return { error: "Conversion failed" };
        }
    }, [dateInput, timeInput, timezone]);

    return (
        <div className="mx-auto max-w-4xl px-4 py-10">
            <Link
                href="/tools"
                className="mb-6 inline-block text-sm text-muted-foreground underline-offset-2 hover:text-foreground"
            >
                ← Back to tools
            </Link>
            <h1 className="mb-1 text-2xl font-bold text-foreground">Timestamp Converter</h1>
            <p className="mb-6 text-muted-foreground">
                Convert between epoch timestamps and human-readable date/time. Supports seconds, milliseconds,
                microseconds, and nanoseconds.
            </p>
            <div className="flex flex-col gap-6">
                <div className="rounded-md border border-border/50 bg-muted/20 p-3">
                    <div className="mb-2 flex items-center justify-between">
                        <Label className="text-sm font-medium">Current Epoch</Label>
                        <div className="flex gap-2">
                            <CopyButton
                                text={currentEpoch.seconds}
                                copyId="current-seconds"
                                copiedId={copied}
                                onCopy={setCopied}
                                variantLabel="Copy Seconds"
                            />
                            <CopyButton
                                text={currentEpoch.milliseconds}
                                copyId="current-milliseconds"
                                copiedId={copied}
                                onCopy={setCopied}
                                variantLabel="Copy Milliseconds"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 text-sm">
                        <div>
                            <span className="text-muted-foreground">Seconds: </span>
                            <span className="font-mono font-medium">{currentEpoch.seconds}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Milliseconds: </span>
                            <span className="font-mono font-medium">{currentEpoch.milliseconds}</span>
                        </div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Updates every 5 seconds</p>
                </div>

                <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium">Conversion Mode</Label>
                    <ToggleGroup
                        type="single"
                        value={isEpochToDate ? "epoch-to-date" : "date-to-epoch"}
                        onValueChange={(value) => {
                            if (value) setIsEpochToDate(value === "epoch-to-date");
                        }}
                        className="w-fit"
                    >
                        <ToggleGroupItem value="epoch-to-date" aria-label="Epoch to Date">
                            Epoch → Date
                        </ToggleGroupItem>
                        <ToggleGroupItem value="date-to-epoch" aria-label="Date to Epoch">
                            Date → Epoch
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>

                {isEpochToDate ? (
                    <>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="epoch-input" className="text-sm font-medium">
                                Epoch Timestamp
                            </Label>
                            <Input
                                id="epoch-input"
                                value={epochInput}
                                onChange={(e) => setEpochInput(e.target.value)}
                                placeholder="e.g., 1704067200000"
                                className="font-mono text-sm"
                            />
                            {epochToDateResult?.detectedUnit && (
                                <p className="text-xs text-muted-foreground">
                                    Detected unit:{" "}
                                    {EPOCH_UNITS.find((u) => u.value === epochToDateResult.detectedUnit)?.label}
                                </p>
                            )}
                        </div>

                        {epochToDateResult && (
                            <div className="flex flex-col gap-3">
                                {epochToDateResult.error ? (
                                    <div className="rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
                                        {epochToDateResult.error}
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-medium">UTC</Label>
                                                <div className="flex gap-2">
                                                    <CopyButton
                                                        text={epochToDateResult.utc ?? ""}
                                                        copyId="utc"
                                                        copiedId={copied}
                                                        onCopy={setCopied}
                                                    />
                                                    <CopyButton
                                                        text={epochToDateResult.utcIsoString ?? ""}
                                                        copyId="utc-iso"
                                                        copiedId={copied}
                                                        onCopy={setCopied}
                                                        variantLabel="ISO"
                                                        title="Copy as ISO 8601 format"
                                                    />
                                                </div>
                                            </div>
                                            <Input
                                                value={epochToDateResult.utc || ""}
                                                readOnly
                                                className="font-mono text-sm"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-medium">Local Time</Label>
                                                <div className="flex gap-2">
                                                    <CopyButton
                                                        text={epochToDateResult.local ?? ""}
                                                        copyId="local"
                                                        copiedId={copied}
                                                        onCopy={setCopied}
                                                    />
                                                    <CopyButton
                                                        text={epochToDateResult.utcIsoString ?? ""}
                                                        copyId="local-iso"
                                                        copiedId={copied}
                                                        onCopy={setCopied}
                                                        variantLabel="ISO"
                                                        title="Copy as ISO 8601 format"
                                                    />
                                                </div>
                                            </div>
                                            <Input
                                                value={epochToDateResult.local}
                                                readOnly
                                                className="font-mono text-sm"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="date-input" className="text-sm font-medium">
                                    Date
                                </Label>
                                <Input
                                    id="date-input"
                                    type="date"
                                    value={dateInput}
                                    onChange={(e) => setDateInput(e.target.value)}
                                    className="font-mono text-sm"
                                />
                            </div>
                            <div className="flex gap-2">
                                <div className="flex flex-1 flex-col gap-2">
                                    <Label htmlFor="time-input" className="text-sm font-medium">
                                        Time
                                    </Label>
                                    <Input
                                        id="time-input"
                                        type="time"
                                        step="1"
                                        value={timeInput}
                                        onChange={(e) => setTimeInput(e.target.value)}
                                        className="font-mono text-sm"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="timezone-select" className="text-sm font-medium">
                                        Timezone
                                    </Label>
                                    <Select value={timezone} onValueChange={setTimezone}>
                                        <SelectTrigger id="timezone-select" className="w-[120px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="UTC">UTC</SelectItem>
                                            <SelectItem value="local">Local</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {dateToEpochResult && (
                            <div className="flex flex-col gap-3">
                                {dateToEpochResult.error ? (
                                    <div className="rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
                                        {dateToEpochResult.error}
                                    </div>
                                ) : (
                                    <>
                                        {(["seconds", "milliseconds"] as EpochUnit[]).map((unit) => {
                                            const value = dateToEpochResult[
                                                unit as keyof typeof dateToEpochResult
                                            ] as string;
                                            const id = `epoch-${unit}`;
                                            const unitLabel = EPOCH_UNITS.find((u) => u.value === unit)?.label || unit;
                                            return (
                                                <div key={unit} className="flex flex-col gap-2">
                                                    <div className="flex items-center justify-between">
                                                        <Label className="text-sm font-medium">{unitLabel}</Label>
                                                        <CopyButton
                                                            text={value}
                                                            copyId={id}
                                                            copiedId={copied}
                                                            onCopy={setCopied}
                                                        />
                                                    </div>
                                                    <Input value={value} readOnly className="font-mono text-sm" />
                                                </div>
                                            );
                                        })}
                                        <div className="rounded-md border border-border/50 bg-muted/20 p-2 text-xs text-muted-foreground">
                                            <p className="font-medium text-foreground mb-1">Note:</p>
                                            <p>{dateToEpochResult.note}</p>
                                        </div>
                                        {(["microseconds", "nanoseconds"] as EpochUnit[]).map((unit) => {
                                            const value = dateToEpochResult[
                                                unit as keyof typeof dateToEpochResult
                                            ] as string;
                                            const id = `epoch-${unit}`;
                                            const unitLabel = EPOCH_UNITS.find((u) => u.value === unit)?.label || unit;
                                            return (
                                                <div key={unit} className="flex flex-col gap-2">
                                                    <div className="flex items-center justify-between">
                                                        <Label className="text-sm font-medium text-muted-foreground">
                                                            {unitLabel} (calculated)
                                                        </Label>
                                                        <CopyButton
                                                            text={value}
                                                            copyId={id}
                                                            copiedId={copied}
                                                            onCopy={setCopied}
                                                        />
                                                    </div>
                                                    <Input
                                                        value={value}
                                                        readOnly
                                                        className="font-mono text-sm text-muted-foreground"
                                                    />
                                                </div>
                                            );
                                        })}
                                    </>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
