import { Metadata } from "next";
import Link from "next/link";
import { TOOLS_LIST } from "@/lib/tools";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Dev Tools | Reetesh Sudhakar",
    description: "A collection of handy developer tools.",
    openGraph: {
        title: "Dev Tools | Reetesh Sudhakar",
        description: "A collection of handy developer tools.",
        type: "website",
    },
};

export default function ToolsPage() {
    return (
        <div className="mx-auto max-w-4xl px-4 py-10">
            <h1 className="mb-2 text-center text-3xl font-bold text-foreground">Dev Tools</h1>
            <p className="mb-10 text-center text-muted-foreground">Random tools I use. Stay tuned for more!</p>
            <div className="grid gap-4 sm:grid-cols-2">
                {TOOLS_LIST.map((tool) => (
                    <Link key={tool.id} href={tool.href} className="no-underline">
                        <Card className="h-full transition-colors hover:bg-accent/50">
                            <CardHeader>
                                <CardTitle className="text-[#0172AF] dark:text-[#50B384]">{tool.title}</CardTitle>
                                <CardDescription>{tool.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
