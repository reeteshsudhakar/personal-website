import { IntroHero } from "./IntroHero/IntroHero";
import { AboutHero } from "./AboutHero/AboutHero";
import { WorkingOnHero } from "./WorkingOnHero/WorkingOnHero";
import { ContactHero } from "./ContactHero/ContactHero";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home | Reetesh Sudhakar",
    description: "The home page for my personal website!",
};

export default function HomePage() {
    return (
        <>
            <IntroHero />
            <AboutHero />
            <WorkingOnHero />
            <ContactHero />
        </>
    );
}
