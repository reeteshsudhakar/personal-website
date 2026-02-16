import ResumeView from "@/components/ResumeView/ResumeView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Résumé",
    description: "My one-page résumé highlighting my education, professional experience, and technical skills.",
    openGraph: {
        title: "Résumé | Reetesh Sudhakar",
        description: "My one-page résumé highlighting my education, professional experience, and technical skills.",
        type: "website",
    },
};

export default function Page() {
    return (
        <>
            <ResumeView />
        </>
    );
}
