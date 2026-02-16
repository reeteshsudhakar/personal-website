"use client";

import Link from "next/link";
import { FileText, Calendar, Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactButtons() {
    return (
        <div className="flex flex-col items-center gap-4 py-8">
            <p className="text-center text-xl font-semibold text-white">
                Got questions for me? Feel free to reach out!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 p-4">
                <Link href="/contact" className="no-underline">
                    <Button
                        variant="secondary"
                        size="default"
                        className="gap-2 bg-white/20 font-bold text-white hover:bg-white/30"
                    >
                        <FileText className="size-4" />
                        Contact
                    </Button>
                </Link>
                <a
                    href="https://calendly.com/reesud6187/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                >
                    <Button
                        variant="default"
                        size="default"
                        className="gap-2 bg-teal-600 font-bold text-white hover:bg-teal-700"
                    >
                        <Calendar className="size-4" />
                        Schedule a meeting
                    </Button>
                </a>
                <a href="mailto:reesud6187@gmail.com" className="no-underline">
                    <Button
                        variant="secondary"
                        size="default"
                        className="gap-2 bg-white/20 font-bold text-white hover:bg-white/30"
                    >
                        <Mail className="size-4" />
                        Email me!
                    </Button>
                </a>
                <a
                    href="https://instagram.com/reeteshsudhakar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                >
                    <Button
                        variant="secondary"
                        size="default"
                        className="gap-2 bg-gradient-to-br from-pink-500 to-yellow-500 font-bold text-white hover:opacity-90"
                    >
                        <Instagram className="size-4" />
                        Instagram
                    </Button>
                </a>
            </div>
        </div>
    );
}
