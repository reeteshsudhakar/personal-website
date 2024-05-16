import {
    IconApi,
    IconApiApp,
    IconAt,
    IconBrandFacebook,
    IconBrandGithub,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandMantine,
    IconBrandNextjs,
    IconBuildingBank,
    IconCalendar,
    IconCertificate,
    IconChartLine,
    IconFile,
    IconForms,
    IconMail,
    IconMapPin,
    IconMoneybag,
    IconMovie,
    IconMusic,
    IconNews,
    IconPhone,
    IconPrompt,
    IconSchool,
    IconSun,
    IconWriting
} from "@tabler/icons-react";
import {
    PythonOriginal,
    JavaOriginal,
    COriginal,
    Html5Original,
    Css3Original,
    JavascriptOriginal,
    ReactOriginal,
    NextjsOriginal,
    TypescriptOriginal,
    PostgresqlOriginal,
    DjangoPlain,
    PycharmOriginal,
    IntellijOriginal,
    QtOriginal,
    AnacondaOriginal,
    GitOriginal,
} from 'devicons-react';

export const fullName = 'Reetesh Sudhakar';

/* Top of Navbar Blurbs */
export const navbarBlurbs = [
    'Software Developer 💻',
    'Dog Lover 🐶',
    'Continuous Learner 🚀',
    'Into Finance & Technology 📈',
];

/* Navbar Section Links */
export const navbarSection1Items = {
    'Professional': [
        {
            label: 'Experience', icon: IconCertificate, href: '/experience'
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
        },
        {
            label: 'Music', icon: IconMusic, href: '/music'
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
            label: 'Charles Schwab', icon: IconMoneybag, href: 'https://client.schwab.com/Areas/Access/Login'
        },
    ],
    'Personal': [
        {
            label: 'B.S. Degree', icon: IconSchool, href: 'https://www.github.com/reeteshsudhakar/gatech-bs-degree'
        },
        {
            label: 'Movie-Web (Dead)', icon: IconMovie, href: 'https://movies.reeteshsudhakar.com'
        }
    ]
}

/* Navbar Footer */
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

/* TODO: refactor this to grab my 10 most listened songs from the past 30 days */
export const spotifyURLs = [
    'https://open.spotify.com/track/2bSk87AVkCIIC3Bcligq1z?si=390c4e8a27f94664',
    'https://open.spotify.com/track/0ZKKJTv21zJpNrKiL0LYyV?si=32711e55aca84341',
    'https://open.spotify.com/track/1zi7xx7UVEFkmKfv06H8x0?si=ba27c74684884cce',
    'https://open.spotify.com/track/3DoBTwfr8yi2LN08SBpFkN?si=ada8e368e2ec4598',
    'https://open.spotify.com/track/424DkevE18QJazwlljiTD4?si=dba5913b250b487c',
    'https://open.spotify.com/track/0uxSUdBrJy9Un0EYoBowng?si=54ebf4691fe149fc',
    'https://open.spotify.com/track/7J0hYdgCaxYjz17L5smEhz?si=2c376ef449814809',
    'https://open.spotify.com/track/00RI7b6oZDjx6IQC2eH6bh?si=2feaffd8484f4cf6',
    'https://open.spotify.com/track/2z7VITS30dBexE91V5QXWv?si=dc1e70546e20448c',
    'https://open.spotify.com/track/0suLmBuEbatdochI4tHduq?si=4df5367feaae49d8',
]

/* Contact Form Information */
export const formData = [
    {
        title: 'Email',
        description: 'reesud6187@gmail.com',
        icon: IconAt
    },
    {
        title: 'Phone',
        description: '+1 (971) 470-7750',
        icon: IconPhone
    },
    {
        title: 'Location',
        description: 'Atlanta',
        icon: IconMapPin
    },
    {
        title: 'Working hours',
        description: 'Always',
        icon: IconSun
    },
];

/* Experience Page Content */
export interface ExperienceModalContent {
    title: string;
    company: string;
    companyLink: string;
    location: string;
    description: string;
    dates: string;
    imagePath: string;
}

export const experiences: ExperienceModalContent[] = [
    {
        title: 'Software Engineer Intern',
        company: 'Chicago Trading Company',
        companyLink: 'https://www.chicagotrading.com/',
        location: 'Chicago, IL',
        description: 'This summer, I\'ll be a Software Engineer Intern at Chicago Trading Company, a proprietary market-making firm with floor and electronic operations in the derivatives market. They provide pricing and liquidity on all U.S. derivatives exchanges.',
        dates: 'May 2024 - Aug. 2024',
        imagePath: '/logos/ctc.jpg'
    },
    {
        title: 'Undergraduate Teaching Assistant',
        company: 'College of Computing @ Georgia Tech',
        companyLink: 'https://sci.cc.gatech.edu',
        location: 'Atlanta, GA',
        description: 'Currently a teaching assistant for CS 3600: Introduction to Artificial Intelligence. Previously a teaching assistant for CS 2340: Objects and Design.',
        dates: 'Aug. 2023 - Present',
        imagePath: '/logos/gt.jpeg'
    },
    {
        title: 'Vice President - Special Projects',
        company: 'Fremont Debate Academy',
        companyLink: 'https://www.fremontdebateacademy.org',
        location: 'Fremont, CA',
        description: 'I\’m currently training teachers in standardized debate curriculum to bring speech and debate to the classroom — most recently in middle schools in Northern California! Previously, I implemented and mapped 20+ curriculum targets in accordance with 100+ Common Core State Standards. I also introduced Middle School Public Debate curriculum to teachers and instructors nationwide to offer debate as a formal course in elementary/middle schools, while also helping develop proposal to introduce comprehensive debate curriculum to CA school districts.',
        dates: 'Aug. 2020 - Present',
        imagePath: '/logos/fda.png'
    },
    {
        title: 'Director of Member Development',
        company: 'Delta Tau Delta - Gamma Psi Chapter',
        companyLink: 'https://www.gtdelts.org',
        location: 'Atlanta, GA',
        description: 'As DMD, I organized professional & academic development resources for 50+ members across 10 disciplines to improve job placement opportunities for industry leading companies and organization-wide school performance. During my time, I oversaw new member development programming to train new 20+ new members academically, professionally, and socially. Helped coordinate with the Wellness Empowerment Center (VOICE) to create a program training Fraternity organization members to become Peer Educators within Greek Life. I also hated our previous website, so I built https://www.gtdelts.org, using Next.js (pages), Chakra UI (components), and Vercel (deployment).',
        dates: 'Nov. 2022 - Mar. 2024',
        imagePath: '/logos/delt.jpg'
    },
    {
        title: 'Software Engineer Intern',
        company: 'Robinhood Markets, Inc.',
        companyLink: 'https://robinhood.com/us/en/about-us/',
        location: 'Menlo Park, CA',
        description: 'At Robinhood, I was a backend engineering intern on the experimentation and metrics team in the Infrastructure Engineering group. Within the experiments platform, I developed an automated experiment health check and retro-AA testing system for A/B experiments using Python, PostgreSQL, Kubernetes, to diagnose sample ratio mismatching (SRM) in analyses and improve best testing practices for core product teams. To improve visibility for the system, I Integrated the health check system into our existing full-stack application using React/Typescript and Django. For ease of use, I also automated Slack notifications and created client for OpsGenie paging to improve response times to SRMs and health check failures for 15% of experiments.',
        dates: 'May 2023 - Aug. 2023',
        imagePath: '/logos/robinhood.png'
    },
    {
        title: 'Director of Philanthropy & Community Service',
        company: 'Delta Tau Delta - Gamma Psi Chapter',
        companyLink: 'https://www.gtdelts.org',
        location: 'Atlanta, GA',
        description: 'As our director of philanthropy & community service, I organized and planned philanthropic events to raise $1500+ funds for the Juvenile Diabetes Research Foundation and women\'s heart disease causes, and $30,000+ for stroke prevention/relief funds.  I oversaw community service and volunteering events with local organizations. Finally, I established on-campus connections to hold several joint-philanthropic events to increase internal and external participation/involvement in philanthropy events and to strengthen campus relations.',
        dates: 'Nov. 2021 - Nov. 2022',
        imagePath: '/logos/delt.jpg'
    },
    {
        title: 'Undergraduate Researcher',
        company: 'Georgia Tech Vertically Integrated Projects',
        companyLink: 'https://www.vip.gatech.edu',
        location: 'Atlanta, GA',
        description: 'I was a student researcher at the Future Computing with Rogues Gallery group, through the Vertically Integrated Projects Program at Georgia Tech. I worked on developing a spiking neural network powered autonomous vehicle platform with simulation environments in Tensorflow and Nengo, evaluating the RatSLAM system. With a sub team specializing in neuromorphic computing, I trained a deep neural network (DNN) model on ECG data across 1500+ subjects by performing common processing analyses, including denoising, peak detection, and temporal feature extraction, to optimize classifications for arrhythmia detection. I led a team of four in performing analyses based on accuracy, specificity, and sensitivity to assess and improve quality of proposed DNN in comparison with well-known classifiers, using datasets created to study 100+ unique movements and actions.',
        dates: 'Jan. 2022 - May 2023',
        imagePath: '/logos/gt.jpeg'
    },
    {
        title: 'Business Analyst',
        company: 'Consult Your Community - Georgia Tech',
        companyLink: 'https://www.georgiatechcyc.org',
        location: 'Atlanta, GA',
        description: 'In my first project, I developed an interactive Figma web design to enhance online engagement for a client aiming to connect with the local pickleball community, facilitating increased digital presence and community interaction. For another client, I conducted comprehensive market research and devised targeted marketing campaigns, significantly diversifying and strengthening their revenue streams through strategic business insights.',
        dates: 'Aug. 2022 - May 2023',
        imagePath: '/logos/cyc.png'
    },
    {
        title: 'Software Developer Intern',
        company: 'Siemens Digital Industries Software',
        companyLink: 'https://www.sw.siemens.com',
        location: 'Remote',
        description: 'I was a Software Development Intern as a part of the Siemens Strategic Student Program (SSP). As an intern, I redesigned user interface for Siemens Software Center in C++ and Qt Stylesheets by collaborating with marketing leads and optimizing Human-Computer Interaction. Developed renderings in Figma and implemented 15+ released SSC features with Qt. I used Siemens marketing research and policies to drive design decisions, deploying unit test frameworks to assess interactive features. Throughout the internship, I worked with teams internationally in performance testing using Google Testing Frameworks in an agile environment.',
        dates: 'Jan. 2022 - May 2022',
        imagePath: '/logos/siemens.jpeg'
    },
    {
        title: 'Research Intern',
        company: 'Oregon Health and Science University',
        companyLink: 'https://www.ohsu.edu',
        location: 'Portland, OR',
        description: 'As a research intern, I studied the effect Apolipoprotein E (ApoE) and human Amyloid Precursor Protein (hAPP) mutations on possible protective pathways for Alzheimer\'s Disease development at the Raber Lab in the Department of Behavioral Neuroscience. The research utilized novel behavioral assays in mice and rat models to further understand the genetic and environmental factors implicated in cognitive decline. I personally conducted 150+ metabolic pathway and statistical analyses using Metaboanalyst, an R-based platform, to co-author research on the effect of micro-gravity and simulated space irradiation on metabolic pathways in rats. Working with data quite a bit, I analyzed and reviewed 250+ behavioral assays using novel protocols, IBM SPSS Statistics, GraphPad Prism, to study possible genetic protective pathways for Alzheimer\'s development.',
        dates: 'Mar. 2020 - Aug. 2021',
        imagePath: '/logos/ohsu.png'
    }
];

/* Skills Icon and Titles */
export const skills = [
    {
        icon: PythonOriginal,
        title: 'Python',
    },
    {
        icon: JavaOriginal,
        title: 'Java',
    },
    {
        icon: COriginal,
        title: 'C',
    },
    {
        icon: Html5Original,
        title: 'HTML',
    },
    {
        icon: Css3Original,
        title: 'CSS',
    },
    {
        icon: JavascriptOriginal,
        title: 'JavaScript',
    },
    {
        icon: ReactOriginal,
        title: 'React',
    },
    {
        icon: NextjsOriginal,
        title: 'Next.js',
    },
    {
        icon: TypescriptOriginal,
        title: 'TypeScript',
    },
    {
        icon: PostgresqlOriginal,
        title: 'PostgreSQL',
    },
    {
        icon: DjangoPlain,
        title: 'Django',
    },
    {
        icon: PycharmOriginal,
        title: 'PyCharm',
    },
    {
        icon: IntellijOriginal,
        title: 'IntelliJ',
    },
    {
        icon: QtOriginal,
        title: 'Qt C++',
    },
    {
        icon: AnacondaOriginal,
        title: 'Anaconda'
    },
    {
        icon: GitOriginal,
        title: 'Git'
    },
];


/* Press Article Data */
export const pressArticles = [
    {
        source: 'Frontiers in Pharmacology',
        title: 'ApoE isoform-dependent effects of xanthohumol on high fat diet-induced cognitive impairments and hippocampal metabolic pathways',
        imagePath: '/press/frontiers-pharma-2022.jpg',
        date: 'October 2022',
        author: 'Kundu et al.',
        href: 'https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2022.954980/full'
    },
    {
        source: 'Frontiers in Aging Neuroscience',
        title: 'Apolipoprotein E Isoform-Dependent Effects on Human Amyloid Precursor Protein/Aβ-Induced Behavioral Alterations and Cognitive Impairments and Insoluble Cortical Aβ42 Levels',
        imagePath: '/press/frontiers-neuro-2022.jpg',
        date: 'March 2022',
        author: 'Holden et al.',
        href: 'https://www.frontiersin.org/articles/10.3389/fnagi.2022.767558/full'
    },
    {
        source: 'Frontiers in Physiology',
        title: 'Effects of 5-Ion Beam Irradiation and Hindlimb Unloading on Metabolic Pathways in Plasma and Brain of Behaviorally Tested WAG/Rij Rats',
        imagePath: '/press/frontiers-2021.jpg',
        date: 'September 2021',
        author: 'Raber et al.',
        href: 'https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2021.746509/full'
    },
    {
        source: 'KGW News',
        title: 'Beaverton teens create online platform where young artists can perform',
        imagePath: '/press/kgw-2020.png',
        date: 'July 2020',
        author: 'Brittany Falkers',
        href: 'https://www.kgw.com/article/news/health/coronavirus/beaverton-teens-create-online-platform-for-your-artists-to-perform/283-b3070834-ccbd-42c1-9eff-990aa2880ae8'
    },
    {
        source: 'Beaverton Valley Times',
        title: 'Beaverton teens build platform for youth artists',
        imagePath: '/press/bvt-2020.jpg',
        date: 'July 2020',
        author: 'Wade Evanson',
        href: 'https://www.beavertonvalleytimes.com/news/beaverton-teens-build-platform-for-youth-artists/article_623a1eb8-1421-5be8-a6e1-55e62d4ac11b.html'
    },
    {
        source: 'KOIN 6 News',
        title: 'Westview HS teen provides platform for teen performers',
        imagePath: '/press/koin-2020.jpg',
        date: 'June 2020',
        author: 'Jenny Hansson',
        href: 'https://www.koin.com/news/education/westview-hs-teen-provides-platform-for-teen-performers/'
    },
    {
        source: 'Beaverton Valley Times',
        title: 'Showing up for science',
        imagePath: '/press/bvt-2017.jpg',
        date: 'May 2017',
        author: 'Blair Stenvick',
        href: 'https://www.beavertonvalleytimes.com/news/showing-up-for-science/article_a1850dde-9e99-5dd3-904d-556468d813c4.html'
    }
];
