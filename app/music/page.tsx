import { Welcome } from "@/components/Welcome/Welcome";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Music | Reetesh Sudhakar",
    description: "A summary of my journey and experience with music, in a few of its countless forms!",
};

export default function HomePage() {
    return (
        <>
            <Welcome pageTitle="Music" />
        </>
    );
}
