import ResumeView from "@/components/ResumeView/ResumeView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Résumé | Reetesh Sudhakar",
    description: "My one-page résumé!",
};

export default function HomePage() {
    return (
        <>
            <ResumeView />
        </>
    );
}
