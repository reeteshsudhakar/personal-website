import {
    IconBrandFacebook,
    IconBrandGithub,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandNextjs,
    IconCertificate,
    IconFile,
    IconForms,
    IconMoneybag,
    IconNews,
    IconPrompt,
    IconQuote,
    IconSlideshow,
    IconTool,
    IconWorldWww,
} from "@tabler/icons-react";
import { TailwindIcon } from "@/components/icons/TailwindIcon";

export const fullName = "Reetesh Sudhakar";

export const navbarBlurbs: string[] = ["Software Developer", "Dog Lover"];

export const navbarSection1Items = {
    Professional: [
        {
            label: "Experience",
            icon: IconCertificate,
            href: "/experience",
        },
        {
            label: "Projects",
            icon: IconPrompt,
            href: "/projects",
        },
        {
            label: "Résumé",
            icon: IconFile,
            href: "/resume",
        },
        {
            label: "GitHub",
            icon: IconBrandGithub,
            href: "https://www.github.com/reeteshsudhakar",
        },
    ],
    "Personal Life": [
        {
            label: "Facebook",
            icon: IconBrandFacebook,
            href: "https://www.facebook.com/reetesh.sudhakar.3",
        },
        {
            label: "Instagram",
            icon: IconBrandInstagram,
            href: "https://www.instagram.com/reeteshsudhakar/",
        },
        {
            label: "Press",
            icon: IconNews,
            href: "/press",
        },
    ],
    "Let's Connect": [
        {
            label: "Contact",
            icon: IconForms,
            href: "/contact",
        },
        {
            label: "LinkedIn",
            icon: IconBrandLinkedin,
            href: "https://www.linkedin.com/in/reeteshsudhakar/",
        },
    ],
    Random: [
        {
            label: "Election Viz",
            icon: IconSlideshow,
            href: "https://election-vis.reeteshsudhakar.com",
        },
        {
            label: "Home Credit Analysis",
            icon: IconMoneybag,
            href: "https://ml-credit-project.reeteshsudhakar.com",
        },
        {
            label: "Quotes",
            icon: IconQuote,
            href: "/quote",
        },
    ],
    Dev: [
        {
            label: "Tools",
            icon: IconTool,
            href: "/tools",
        },
    ],
};

export const navbarFooterItems = {
    text: "Made with",
    links: [
        {
            label: "Tailwind CSS",
            icon: TailwindIcon,
            href: "https://tailwindcss.com",
        },
        {
            label: "Next.js",
            icon: IconBrandNextjs,
            href: "https://nextjs.org",
        },
        {
            label: "shadcn/ui",
            icon: IconWorldWww,
            href: "https://ui.shadcn.com",
        },
    ],
};
