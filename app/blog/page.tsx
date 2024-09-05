import { Welcome } from "@/components/Welcome/Welcome";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Reetesh Sudhakar",
    description: "A blog comprised of my thoughts, experiments, and ramblings.",
};

export default function Page() {
    return (
        <>
            <Welcome pageTitle="Blog" />
        </>
    );
}
