import { IconApi, IconApiApp, IconBrandFacebook, IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconBrandMantine, IconBrandNextjs, IconBuildingBank, IconCalendar, IconChartLine, IconFile, IconForms, IconMail, IconMoneybag, IconMovie, IconNews, IconPrompt, IconSchool, IconWriting } from "@tabler/icons-react";

export const navbarBlurbs = [
    'Software Developer 💻',
    'Dog Lover 🐶',
    'Continuous Learner 🚀',
    'Into Finance & Technology 📈',
];

export const navbarSection1Items = {
    'Professional': [
        {
            label: 'Experience', icon: IconSchool, href: '/experience'
        },
        {
            label: 'Projects', icon: IconPrompt, href: '/projects'
        },
        {
            label: 'Résumé', icon: IconFile, href: '/resume'
        },
        {
            label: 'GitHub Portfolio', icon: IconBrandGithub, href: 'https://www.github.com/reeteshsudhakar'
        }
    ],
    'Personal Life': [
        {
            label: 'Facebook', icon: IconBrandFacebook, href: 'https://www.facebook.com/reetesh.sudhakar.3'
        },
        {
            label: 'Instagram', icon: IconBrandInstagram, href: 'https://www.instagram.com/reeteshsudhakar/'
        },
        {
            label: 'Press', icon: IconNews, href: '/press'
        },
        {
            label: 'Blog', icon: IconWriting, href: '/blog'
        }
    ],
    'Let\'s Connect': [
        {
            label: 'Contact', icon: IconForms, href: '/contact'
        },
        {
            label: 'Email', icon: IconMail, href: 'mailto:reesud6187@gmail.com'
        },
        {
            label: 'LinkedIn', icon: IconBrandLinkedin, href: 'https://www.linkedin.com/in/reeteshsudhakar/'
        },
        {
            label: 'Calendly', icon: IconCalendar, href: 'https://calendly.com/reesud6187/30min'
        }
    ]
}

export const navbarSection2Items = {
    'Dev': [
        {
            label: 'Movie Web Proxy', icon: IconApiApp, href: 'https://movies-proxy.reeteshsudhakar.com'
        },
        {
            label: 'Personal API', icon: IconApi, href: 'https://api.reeteshsudhakar.com'
        },
    ],

    'Finances': [
        {
            label: 'Capital One', icon: IconBuildingBank, href: 'https://myaccounts.capitalone.com/accountSummary'
        },
        {
            label: 'Robinhood', icon: IconChartLine, href: 'https://robinhood.com'
        },
        {
            label: 'TD Ameritrade', icon: IconMoneybag, href: 'https://invest.ameritrade.com/grid/p/site#r=home'
        },
    ],
    'Personal': [
        {
            label: 'Movies', icon: IconMovie, href: 'https://movies.reeteshsudhakar.com'
        }
    ]
}

export const navbarFooterItems = {
    text: 'Made by Reetesh Sudhakar with',
    links: [
        {
            label: 'Next.js',
            icon: IconBrandNextjs,
            href: 'https://nextjs.org'
        },
        {
            label: 'Mantine',
            icon: IconBrandMantine,
            href: 'https://mantine.dev'
        }
    ]
}