import Link from "next/link";

type ToolPageHeaderProps = {
    title: string;
    description: string;
};

export function ToolPageHeader({ title, description }: ToolPageHeaderProps) {
    return (
        <>
            <Link
                href="/tools"
                className="mb-6 inline-block text-sm text-muted-foreground underline-offset-2 hover:text-foreground"
            >
                ← Back to tools
            </Link>
            <h1 className="mb-1 text-2xl font-bold text-foreground">{title}</h1>
            <p className="mb-6 text-muted-foreground">{description}</p>
        </>
    );
}
