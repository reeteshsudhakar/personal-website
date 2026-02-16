"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command";
import { Search, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TOOLS_LIST } from "@/lib/tools";

export function ToolsCommandPalette() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((o) => !o);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const handleSelect = (href: string) => {
        router.push(href);
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(true)}
                className="gap-2 text-muted-foreground hover:text-foreground"
                aria-label="Jump to tool (⌘K)"
            >
                <Search className="size-4 shrink-0" />
                <span className="hidden sm:inline">Jump to tool</span>
                <kbd className="pointer-events-none hidden h-5 select-none items-center gap-0.5 rounded border border-border px-1.5 font-mono text-[10px] font-medium sm:inline-flex">
                    ⌘K
                </kbd>
            </Button>
            <CommandDialog
                open={open}
                onOpenChange={setOpen}
                title="Jump to tool"
                description="Search for a tool to open."
            >
                <CommandInput placeholder="Search tools..." />
                <CommandList>
                    <CommandEmpty>No tool found.</CommandEmpty>
                    <CommandGroup heading="Navigation">
                        <CommandItem
                            value="home return to home"
                            onSelect={() => handleSelect("/")}
                            keywords={["home", "return", "main", "site"]}
                        >
                            <Home className="size-4" />
                            <span>Return to home</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="All tools">
                        <CommandItem
                            value="tools index home /tools"
                            onSelect={() => handleSelect("/tools")}
                            keywords={["tools", "index", "home", "/tools"]}
                        >
                            <span className="font-medium">/tools</span>
                            <span className="truncate text-muted-foreground">Tools home</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="Tools">
                        {TOOLS_LIST.map((tool) => (
                            <CommandItem
                                key={tool.id}
                                value={`${tool.title} ${tool.description} ${tool.id} ${tool.href}`}
                                onSelect={() => handleSelect(tool.href)}
                                keywords={[tool.title, tool.description, tool.id, tool.href]}
                            >
                                <span className="font-medium">{tool.href}</span>
                                <span className="truncate text-muted-foreground">{tool.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
