import { Welcome } from "@/components/Welcome/Welcome";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Reetesh Sudhakar",
    description: "My personal dashboard for all of the things happening important to me!",
};

export default function HomePage() {
    return (
        <>
            <Welcome pageTitle="Dashboard" />
        </>
    );
}
