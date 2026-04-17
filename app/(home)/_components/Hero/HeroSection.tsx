import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
    image: StaticImageData;
    imageAlt: string;
    priority?: boolean;
    children: React.ReactNode;
}

export function HeroSection({ image, imageAlt, priority = false, children }: HeroSectionProps) {
    return (
        <section className="relative flex h-[calc(100svh-56px)] w-full items-center justify-center overflow-hidden bg-black md:h-screen">
            <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(min-width: 768px) calc(100vw - 220px), 100vw"
                priority={priority}
                fetchPriority={priority ? "high" : "auto"}
                placeholder="blur"
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/25" aria-hidden />
            <div className={cn("relative z-10 flex flex-col items-center justify-center px-4 py-6")}>{children}</div>
        </section>
    );
}
