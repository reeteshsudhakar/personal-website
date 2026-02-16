import { IntroHero } from "./_components/Hero/IntroHero/IntroHero";
import { AboutHero } from "./_components/Hero/AboutHero/AboutHero";
import { WorkingOnHero } from "./_components/Hero/WorkingOnHero/WorkingOnHero";
import { ContactHero } from "./_components/Hero/ContactHero/ContactHero";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
    description:
        "Software Engineer at Chicago Trading Company and recent Georgia Tech graduate. Passionate about finance, technology, music, and most importantly, dogs.",
    openGraph: {
        title: "Reetesh Sudhakar - Software Developer",
        description:
            "Software Engineer at Chicago Trading Company and recent Georgia Tech graduate. Passionate about finance, technology, music, and most importantly, dogs.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Reetesh Sudhakar - Software Developer",
        description:
            "Software Engineer at Chicago Trading Company and recent Georgia Tech graduate. Passionate about finance, technology, music, and most importantly, dogs.",
    },
};

export default function Page() {
    return (
        <>
            <IntroHero />
            <AboutHero />
            <WorkingOnHero />
            <ContactHero />
        </>
    );
}
