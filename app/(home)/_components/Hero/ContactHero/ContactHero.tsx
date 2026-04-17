import Link from "next/link";
import { FileText, Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "../HeroSection";
import contactBackground from "@/public/heros/contact-hero-background.png";

export function ContactHero() {
    return (
        <HeroSection image={contactBackground} imageAlt="">
            <h2 className="px-4 text-center text-[28px] font-extrabold text-white xs:text-left md:text-5xl">
                Let&apos;s get in touch!
            </h2>
            <p className="max-w-3xl px-6 py-8 text-center text-xl text-white">
                Whether it&apos;s about technology, finance, music, or absolute nonsense, I&apos;m always up for a chat.
                Feel free to reach out through any of the methods below!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 p-4">
                <Button
                    asChild
                    variant="default"
                    size="default"
                    className="gap-2 bg-teal-700 font-bold text-white hover:bg-teal-800"
                >
                    <Link href="/contact" className="no-underline">
                        <FileText className="size-4" />
                        Contact
                    </Link>
                </Button>
                <Button
                    asChild
                    variant="secondary"
                    size="default"
                    className="gap-2 bg-white/20 font-bold text-white hover:bg-white/30"
                >
                    <a href="mailto:reesud6187@gmail.com" className="no-underline">
                        <Mail className="size-4" />
                        Email me!
                    </a>
                </Button>
                <Button
                    asChild
                    variant="secondary"
                    size="default"
                    className="gap-2 bg-gradient-to-br from-pink-600 to-yellow-600 font-bold text-white hover:opacity-90"
                >
                    <a
                        href="https://instagram.com/reeteshsudhakar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline"
                    >
                        <Instagram className="size-4" />
                        Instagram
                    </a>
                </Button>
            </div>
        </HeroSection>
    );
}
