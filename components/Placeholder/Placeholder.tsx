"use client";

export default function Placeholder() {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 pt-24 text-center md:pt-32">
            <h1 className="text-5xl font-black tracking-tight text-foreground md:text-[100px] md:tracking-[-2px]">
                Ruh{" "}
                <span className="bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">Roh</span>{" "}
                <span>🚧</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[580px] text-lg text-muted-foreground">
                Right now, this page is a work in progress. Stay tuned for updates!
            </p>
        </div>
    );
}
