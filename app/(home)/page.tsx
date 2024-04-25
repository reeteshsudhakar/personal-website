import { IntroHero } from "./IntroHero/IntroHero";
import { AboutHero } from "./AboutHero/AboutHero";
import { WorkingOnHero } from "./WorkingOnHero/WorkingOnHero";
import { ContactHero } from "./ContactHero/ContactHero";

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
