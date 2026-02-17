import {
    IconAt,
    IconBike,
    IconBrandFacebook,
    IconBrandGithub,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandNextjs,
    IconBrandOpenai,
    IconCar,
    IconCertificate,
    IconFile,
    IconForms,
    IconMapPin,
    IconMoneybag,
    IconNews,
    IconPhone,
    IconPrompt,
    IconQuote,
    IconSlideshow,
    IconSun,
    IconTool,
    IconVaccine,
    IconWorldWww,
} from "@tabler/icons-react";
import { TailwindIcon } from "@/components/icons/TailwindIcon";
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
    JekyllOriginal,
    ScikitlearnOriginal,
    NumpyOriginal,
    PandasOriginal,
    LatexOriginal,
    JupyterOriginal,
    SeleniumOriginal,
    GooglecloudOriginal,
    TensorflowOriginal,
    KerasOriginal,
    JunitOriginal,
    VercelOriginal,
    D3jsOriginal,
} from "devicons-react";

export const fullName = "Reetesh Sudhakar";

/* Top of Navbar Blurbs */
export const navbarBlurbs: string[] = ["Software Developer 💻", "Dog Lover 🐶"];

/* Navbar Section Links */
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

/* Navbar Footer */
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

/* Contact Form Information */
export const formData = [
    {
        title: "Email",
        description: "reesud6187@gmail.com",
        icon: IconAt,
    },
    {
        title: "Phone",
        description: "+1 (971) 470-7750",
        icon: IconPhone,
    },
    {
        title: "Location",
        description: "Atlanta",
        icon: IconMapPin,
    },
    {
        title: "Working hours",
        description: "Always",
        icon: IconSun,
    },
];

/* Experience Page Content - startDate/endDate as YYYY-MM-DD; endDate null = Present */
export const experienceDateMonthNames: Record<number, string> = {
    1: "Jan.",
    2: "Feb.",
    3: "Mar.",
    4: "Apr.",
    5: "May",
    6: "Jun.",
    7: "Jul.",
    8: "Aug.",
    9: "Sep.",
    10: "Oct.",
    11: "Nov.",
    12: "Dec.",
};

export function formatExperienceDates(startDate: string, endDate: string | null): string {
    const [sy, sm] = startDate.split("-").map(Number);
    const startStr = `${experienceDateMonthNames[sm] ?? ""} ${sy}`;
    if (!endDate) return `${startStr} - Present`;
    const [ey, em] = endDate.split("-").map(Number);
    const endStr = `${experienceDateMonthNames[em] ?? ""} ${ey}`;
    return `${startStr} - ${endStr}`;
}

export function sortExperiencesByDate<T extends { startDate: string; endDate: string | null }>(items: T[]): T[] {
    return [...items].sort((a, b) => {
        const aCurrent = a.endDate === null;
        const bCurrent = b.endDate === null;
        if (aCurrent && bCurrent) return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        if (aCurrent) return -1;
        if (bCurrent) return 1;
        return new Date(b.endDate!).getTime() - new Date(a.endDate!).getTime();
    });
}

export const experiences = [
    {
        title: "Associate Engineer",
        company: "Chicago Trading Company",
        companyLink: "https://www.chicagotrading.com/",
        location: "Chicago, IL",
        description: "Desk Developer - US Indexes and Discretionary Trading",
        startDate: "2025-08-01",
        endDate: null as string | null,
        imagePath: "/logos/ctc.jpg",
    },
    {
        title: "Head Graduate Teaching Assistant",
        company: "College of Computing @ Georgia Tech",
        companyLink: "https://sci.cc.gatech.edu",
        location: "Atlanta, GA",
        description:
            "Head teaching assistant for CS 3600: Introduction to Artificial Intelligence, with enrollment of 1000+. Managing content development (assignments, discussions, exams), preparing exercises, moderating thousands student discussions, and leading staff of over 40. Working to eliminate historical plagiarism by redesigning assignments and detecting peer-to-peer plagiarism with a staff-facing pipeline, leveraging Stanford's MOSS tool.",
        startDate: "2024-05-01",
        endDate: "2025-05-03",
        imagePath: "/logos/gt.jpeg",
    },
    {
        title: "Vice President - Special Projects",
        company: "Fremont Debate Academy",
        companyLink: "https://www.fremontdebateacademy.org",
        location: "Fremont, CA",
        description:
            "I’m currently training teachers in standardized debate curriculum to bring speech and debate to the classroom — most recently in middle schools in Northern California! Previously, I implemented and mapped 20+ curriculum targets in accordance with 100+ Common Core State Standards. I also introduced Middle School Public Debate curriculum to teachers and instructors nationwide to offer debate as a formal course in elementary/middle schools, while also helping develop proposal to introduce comprehensive debate curriculum to CA school districts.",
        startDate: "2020-08-01",
        endDate: "2025-05-01",
        imagePath: "/logos/fda.png",
    },
    {
        title: "Undergraduate Teaching Assistant",
        company: "College of Computing @ Georgia Tech",
        companyLink: "https://sci.cc.gatech.edu",
        location: "Atlanta, GA",
        description:
            "Currently a teaching assistant for CS 3600: Introduction to Artificial Intelligence. Previously a teaching assistant for CS 2340: Objects and Design.",
        startDate: "2023-08-01",
        endDate: "2024-05-01",
        imagePath: "/logos/gt.jpeg",
    },
    {
        title: "Director of Member Development",
        company: "Delta Tau Delta - Gamma Psi Chapter",
        companyLink: "https://www.gtdelts.org",
        location: "Atlanta, GA",
        description:
            "As DMD, I organized professional & academic development resources for 50+ members across 10 disciplines to improve job placement opportunities for industry leading companies and organization-wide school performance. During my time, I oversaw new member development programming to train new 20+ new members academically, professionally, and socially. Helped coordinate with the Wellness Empowerment Center (VOICE) to create a program training Fraternity organization members to become Peer Educators within Greek Life. I also hated our previous website, so I built https://www.gtdelts.org, using Next.js (pages), Chakra UI (components), and Vercel (deployment).",
        startDate: "2022-11-01",
        endDate: "2024-03-01",
        imagePath: "/logos/delt.jpg",
    },
    {
        title: "Software Engineer Intern",
        company: "Robinhood Markets, Inc.",
        companyLink: "https://robinhood.com/us/en/about-us/",
        location: "Menlo Park, CA",
        description:
            "At Robinhood, I was a backend engineering intern on the experimentation and metrics team in the Infrastructure Engineering group. Within the experiments platform, I developed an automated experiment health check and retro-AA testing system for A/B experiments using Python, PostgreSQL, Kubernetes, to diagnose sample ratio mismatching (SRM) in analyses and improve best testing practices for core product teams. To improve visibility for the system, I Integrated the health check system into our existing full-stack application using React/Typescript and Django. For ease of use, I also automated Slack notifications and created client for OpsGenie paging to improve response times to SRMs and health check failures for 15% of experiments.",
        startDate: "2023-05-01",
        endDate: "2023-08-01",
        imagePath: "/logos/robinhood.png",
    },
    {
        title: "Director of Philanthropy & Community Service",
        company: "Delta Tau Delta - Gamma Psi Chapter",
        companyLink: "https://www.gtdelts.org",
        location: "Atlanta, GA",
        description:
            "As our director of philanthropy & community service, I organized and planned philanthropic events to raise $1500+ funds for the Juvenile Diabetes Research Foundation and women's heart disease causes, and $30,000+ for stroke prevention/relief funds.  I oversaw community service and volunteering events with local organizations. Finally, I established on-campus connections to hold several joint-philanthropic events to increase internal and external participation/involvement in philanthropy events and to strengthen campus relations.",
        startDate: "2021-11-01",
        endDate: "2022-11-01",
        imagePath: "/logos/delt.jpg",
    },
    {
        title: "Undergraduate Researcher",
        company: "Georgia Tech Vertically Integrated Projects",
        companyLink: "https://www.vip.gatech.edu",
        location: "Atlanta, GA",
        description:
            "I was a student researcher at the Future Computing with Rogues Gallery group, through the Vertically Integrated Projects Program at Georgia Tech. I worked on developing a spiking neural network powered autonomous vehicle platform with simulation environments in Tensorflow and Nengo, evaluating the RatSLAM system. With a sub team specializing in neuromorphic computing, I trained a deep neural network (DNN) model on ECG data across 1500+ subjects by performing common processing analyses, including denoising, peak detection, and temporal feature extraction, to optimize classifications for arrhythmia detection. I led a team of four in performing analyses based on accuracy, specificity, and sensitivity to assess and improve quality of proposed DNN in comparison with well-known classifiers, using datasets created to study 100+ unique movements and actions.",
        startDate: "2022-01-01",
        endDate: "2023-05-01",
        imagePath: "/logos/gt.jpeg",
    },
    {
        title: "Business Analyst",
        company: "Consult Your Community - Georgia Tech",
        companyLink: "https://www.georgiatechcyc.org",
        location: "Atlanta, GA",
        description:
            "In my first project, I developed an interactive Figma web design to enhance online engagement for a client aiming to connect with the local pickleball community, facilitating increased digital presence and community interaction. For another client, I conducted comprehensive market research and devised targeted marketing campaigns, significantly diversifying and strengthening their revenue streams through strategic business insights.",
        startDate: "2022-08-01",
        endDate: "2023-05-01",
        imagePath: "/logos/cyc.png",
    },
    {
        title: "Software Developer Intern",
        company: "Siemens Digital Industries Software",
        companyLink: "https://www.sw.siemens.com",
        location: "Remote",
        description:
            "I was a Software Development Intern as a part of the Siemens Strategic Student Program (SSP). As an intern, I redesigned user interface for Siemens Software Center in C++ and Qt Stylesheets by collaborating with marketing leads and optimizing Human-Computer Interaction. Developed renderings in Figma and implemented 15+ released SSC features with Qt. I used Siemens marketing research and policies to drive design decisions, deploying unit test frameworks to assess interactive features. Throughout the internship, I worked with teams internationally in performance testing using Google Testing Frameworks in an agile environment.",
        startDate: "2022-01-01",
        endDate: "2022-05-01",
        imagePath: "/logos/siemens.jpeg",
    },
    {
        title: "Research Intern",
        company: "Oregon Health and Science University",
        companyLink: "https://www.ohsu.edu",
        location: "Portland, OR",
        description:
            "As a research intern, I studied the effect Apolipoprotein E (ApoE) and human Amyloid Precursor Protein (hAPP) mutations on possible protective pathways for Alzheimer's Disease development at the Raber Lab in the Department of Behavioral Neuroscience. The research utilized novel behavioral assays in mice and rat models to further understand the genetic and environmental factors implicated in cognitive decline. I personally conducted 150+ metabolic pathway and statistical analyses using Metaboanalyst, an R-based platform, to co-author research on the effect of micro-gravity and simulated space irradiation on metabolic pathways in rats. Working with data quite a bit, I analyzed and reviewed 250+ behavioral assays using novel protocols, IBM SPSS Statistics, GraphPad Prism, to study possible genetic protective pathways for Alzheimer's development.",
        startDate: "2020-03-01",
        endDate: "2021-08-01",
        imagePath: "/logos/ohsu.png",
    },
];

/* Skills Icon and Titles */
export const skills = [
    {
        icon: PythonOriginal,
        title: "Python",
    },
    {
        icon: JavaOriginal,
        title: "Java",
    },
    {
        icon: COriginal,
        title: "C",
    },
    {
        icon: Html5Original,
        title: "HTML",
    },
    {
        icon: Css3Original,
        title: "CSS",
    },
    {
        icon: JavascriptOriginal,
        title: "JavaScript",
    },
    {
        icon: ReactOriginal,
        title: "React",
    },
    {
        icon: NextjsOriginal,
        title: "Next.js",
    },
    {
        icon: TypescriptOriginal,
        title: "TypeScript",
    },
    {
        icon: PostgresqlOriginal,
        title: "PostgreSQL",
    },
    {
        icon: DjangoPlain,
        title: "Django",
    },
    {
        icon: PycharmOriginal,
        title: "PyCharm",
    },
    {
        icon: IntellijOriginal,
        title: "IntelliJ",
    },
    {
        icon: QtOriginal,
        title: "Qt C++",
    },
    {
        icon: AnacondaOriginal,
        title: "Anaconda",
    },
    {
        icon: GitOriginal,
        title: "Git",
    },
];

/* Press Article Data */
export const pressArticles = [
    {
        source: "Frontiers in Pharmacology",
        title: "ApoE isoform-dependent effects of xanthohumol on high fat diet-induced cognitive impairments and hippocampal metabolic pathways",
        imagePath: "/press/frontiers-pharma-2022.jpg",
        date: "October 2022",
        author: "Kundu et al.",
        href: "https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2022.954980/full",
    },
    {
        source: "Frontiers in Aging Neuroscience",
        title: "Apolipoprotein E Isoform-Dependent Effects on Human Amyloid Precursor Protein/Aβ-Induced Behavioral Alterations and Cognitive Impairments and Insoluble Cortical Aβ42 Levels",
        imagePath: "/press/frontiers-neuro-2022.jpg",
        date: "March 2022",
        author: "Holden et al.",
        href: "https://www.frontiersin.org/articles/10.3389/fnagi.2022.767558/full",
    },
    {
        source: "Frontiers in Physiology",
        title: "Effects of 5-Ion Beam Irradiation and Hindlimb Unloading on Metabolic Pathways in Plasma and Brain of Behaviorally Tested WAG/Rij Rats",
        imagePath: "/press/frontiers-2021.jpg",
        date: "September 2021",
        author: "Raber et al.",
        href: "https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2021.746509/full",
    },
    {
        source: "KGW News",
        title: "Beaverton teens create online platform where young artists can perform",
        imagePath: "/press/kgw-2020.png",
        date: "July 2020",
        author: "Brittany Falkers",
        href: "https://www.kgw.com/article/news/health/coronavirus/beaverton-teens-create-online-platform-for-your-artists-to-perform/283-b3070834-ccbd-42c1-9eff-990aa2880ae8",
    },
    {
        source: "Beaverton Valley Times",
        title: "Beaverton teens build platform for youth artists",
        imagePath: "/press/bvt-2020.jpg",
        date: "July 2020",
        author: "Wade Evanson",
        href: "https://www.beavertonvalleytimes.com/news/beaverton-teens-build-platform-for-youth-artists/article_623a1eb8-1421-5be8-a6e1-55e62d4ac11b.html",
    },
    {
        source: "KOIN 6 News",
        title: "Westview HS teen provides platform for teen performers",
        imagePath: "/press/koin-2020.jpg",
        date: "June 2020",
        author: "Jenny Hansson",
        href: "https://www.koin.com/news/education/westview-hs-teen-provides-platform-for-teen-performers/",
    },
    {
        source: "Beaverton Valley Times",
        title: "Showing up for science",
        imagePath: "/press/bvt-2017.jpg",
        date: "May 2017",
        author: "Blair Stenvick",
        href: "https://www.beavertonvalleytimes.com/news/showing-up-for-science/article_a1850dde-9e99-5dd3-904d-556468d813c4.html",
    },
];

export const projectsPageBlurb =
    "A big part of how I've grown as a software engineer has been from pursuing projects, whether in an academic or personal setting. The following projects are just random pursuits of mine that I've worked on in my free time or in the classroom, some of which are still a major work-in-progress or private. Feel free to explore below!";

/* Project Data */
export const projects = [
    // {
    //     title: '',
    //     description: '',
    //     date: '',
    //     imagePath: '',
    //     tech: [],
    //     links: []
    // },
    {
        title: "Political Data Explorer: Migrations, Operating Expenses, and PAC Donations",
        description:
            "This project explores state-to-state migrations, Congressional campaign operating expenses, and donations from Political Action Committees and juxtaposes them with United States electoral results. Through a series of interactive visualizations built using D3, we can analyze the relationships between these datasets and how they may influence political outcomes. The project pulls millions of data points from OpenSecrets, the Federal Election Commission, the MIT Election Lab, and the US Census Bureau from 2012 - 2022. You can view the project below!",
        date: "December 2024",
        imagePath: "/projects/cse-6242-project.png",
        tech: [
            {
                icon: PythonOriginal,
                name: "Python",
            },
            {
                icon: JupyterOriginal,
                name: "Jupyter Notebook",
            },
            {
                icon: D3jsOriginal,
                name: "D3.js",
            },
            {
                icon: NextjsOriginal,
                name: "Next.js",
            },
            {
                icon: ReactOriginal,
                name: "React",
            },
            {
                icon: TypescriptOriginal,
                name: "TypeScript",
            },
            {
                icon: VercelOriginal,
                name: "Vercel",
            },
        ],
        links: [
            {
                label: "Website",
                href: "https://election-vis.reeteshsudhakar.com",
                icon: IconWorldWww,
            },
        ],
    },
    {
        title: "Simulations: Vaccines, Traffic, and Citi Bike Shares in NYC",
        description:
            "A series of simulation experiments. The first explores the spread of infectious diseases and how to implement effective vaccination strategies. The second explores one-lane and two-lane traffic systems, analyzing the effects of various densities and dallying on traffic flow. The final experiment explores the bike share program in NYC, analyzing how to optimize bike availability and rider satisfaction from 2022 data. Detailed analyses below!",
        date: "May 2024",
        imagePath: "/projects/CX-4230-Project.png",
        tech: [
            {
                icon: PythonOriginal,
                name: "Python",
            },
            {
                icon: NumpyOriginal,
                name: "NumPy",
            },
            {
                icon: PandasOriginal,
                name: "Pandas",
            },
            {
                icon: LatexOriginal,
                name: "LaTeX",
            },
            {
                icon: JupyterOriginal,
                name: "Jupyter Notebook",
            },
        ],
        links: [
            {
                label: "Source Code",
                href: "https://www.github.com/reeteshsudhakar/CX-4230",
                icon: IconBrandGithub,
            },
            {
                label: "Contagion",
                href: "https://www.github.com/reeteshsudhakar/CX-4230/blob/main/project-1/Writeup.pdf",
                icon: IconVaccine,
            },
            {
                label: "Traffic",
                href: "https://www.github.com/reeteshsudhakar/CX-4230/blob/main/project-2/report/report.pdf",
                icon: IconCar,
            },
            {
                label: "Bike Share",
                href: "https://github.com/reeteshsudhakar/CX-4230/blob/main/project-3/report/report.pdf",
                icon: IconBike,
            },
        ],
    },
    {
        title: "GT Delts Website",
        description:
            "I built a new website for my college fraternity. The previous website was outdated and not user-friendly, so I decided to build a new one from scratch. The website was built using Next.js for the pages, Chakra UI for the components, and Vercel for deployment. Now that I'm graduated, I passed on the code-base and the current members handle the deployment and use the code I wrote just as an inspiration!",
        date: "March 2024",
        imagePath: "/projects/gt-delts-website.png",
        tech: [
            {
                icon: NextjsOriginal,
                name: "Next.js",
            },
            {
                icon: ReactOriginal,
                name: "React",
            },
            {
                icon: TypescriptOriginal,
                name: "TypeScript",
            },
            {
                icon: VercelOriginal,
                name: "Vercel",
            },
        ],
        links: [
            {
                label: "Source Code",
                href: "https://www.github.com/reeteshsudhakar/gtdelts-website",
                icon: IconBrandGithub,
            },
        ],
    },
    {
        title: "Home Credit Risk Analysis",
        description:
            "A machine learning project aiming to analyze home credit risk, providing predictions on defaults for home loans. With housing markets facing uncertainty and limited credit histories hindering borrowers, this analysis helps ensure qualified applicants aren’t unfairly denied while identifying likely defaulters early. Manual risk evaluations are inconsistent and time-consuming, necessitating automated, unbiased assessments.",
        date: "December 2023",
        imagePath: "/projects/CS-7641-Project.png",
        tech: [
            {
                icon: PythonOriginal,
                name: "Python",
            },
            {
                icon: JekyllOriginal,
                name: "Jekyll",
            },
            {
                icon: ScikitlearnOriginal,
                name: "Scikitlearn",
            },
            {
                icon: NumpyOriginal,
                name: "NumPy",
            },
            {
                icon: PandasOriginal,
                name: "Pandas",
            },
        ],
        links: [
            {
                label: "Source Code",
                href: "https://www.github.com/reeteshsudhakar/CS-7641-Project",
                icon: IconBrandGithub,
            },
            {
                label: "Website",
                href: "https://ml-credit-project.reeteshsudhakar.com",
                icon: IconWorldWww,
            },
        ],
    },
    {
        title: "Georgia Tech Semantic Course Search Engine",
        description:
            "Course discovery at Georgia Tech is quite strained, and our registration portal is difficult to use. I decided to create a semantic course search engine to help students find their desired courses easier. I scraped data from our course catalog, generated text embeddings for the course information using the OpenAI API, and created a Streamlit web application for course discovery. I plan on re-developing the application using Next.js, and an open-source embedding model in the future, so this is still in the works.",
        date: "June 2023",
        imagePath: "/projects/gt-course-search.png",
        tech: [
            {
                icon: IconBrandOpenai,
                name: "OpenAI API",
            },
            {
                icon: PythonOriginal,
                name: "Python",
            },
            {
                icon: IconMapPin,
                name: "Streamlit",
            },
        ],
        links: [],
    },
    {
        title: "Instagram Caption Sentiment Analyzer",
        description:
            "Scraped 1500+ captions from Instagram posts using Selenium to provide sentiment analysis of users’ accounts on a large scale with configurable sample sizes, normalized with NLTK Tokenize and regular expressions. Used natural language processing techniques with spaCy to isolate relevant information, generating sentiment analysis of scraped data using the Google Natural Language API to generate an average sentiment score from a given user. Code may be private for security purposes.",
        date: "January 2022",
        imagePath: "/projects/instagram-caption-analyzer.png",
        tech: [
            {
                icon: PythonOriginal,
                name: "Python",
            },
            {
                icon: SeleniumOriginal,
                name: "Selenium",
            },
            {
                icon: GooglecloudOriginal,
                name: "Google Cloud - Natural Language API",
            },
        ],
        links: [
            {
                label: "Source Code",
                href: "https://github.com/reeteshsudhakar/instagram-scraper",
                icon: IconBrandGithub,
            },
        ],
    },
    {
        title: "UTKFace Image Classifier",
        description:
            "This project involved the construction of a convolutional neural network (CNN) to make an image classification model of the popular UTKFace dataset to classify images based on a person's gender, age, and race. This project also involved some resource and notes compilation to provide an introduction to the dataset, neural networks, and image classification. This implementation achieved 80-90% accuracy on the UTKFace dataset based on different classification tasks.",
        date: "July 2022",
        imagePath: "/projects/utk-image-classifier.png",
        tech: [
            {
                icon: PythonOriginal,
                name: "Python",
            },
            {
                icon: TensorflowOriginal,
                name: "Tensorflow",
            },
            {
                icon: NumpyOriginal,
                name: "NumPy",
            },
            {
                icon: PandasOriginal,
                name: "Pandas",
            },
            {
                icon: JupyterOriginal,
                name: "Jupyter Notebook",
            },
            {
                icon: KerasOriginal,
                name: "Keras",
            },
        ],
        links: [
            {
                label: "Source Code",
                href: "https://github.com/reeteshsudhakar/utk-image-classifier",
                icon: IconBrandGithub,
            },
            {
                label: "Notes",
                href: "https://github.com/reeteshsudhakar/utk-image-classifier?tab=readme-ov-file#simple-introduction-to-convolutional-neural-networks",
            },
        ],
    },
    {
        title: "Drone Ingredient Delivery Simulator",
        description:
            "This project involved the construction of a simulation environment for a drone delivery service that delivers various cataloged ingrdients to various restaurants. Employing principles of object-oriented programming, this system was built using Java, with earlier iterations leveraging a command-line interface. The final iteration of this system included a GUI, built using JavaFX. This project was also accompanied by domain models, class diagrams, and sequence diagrams to highlight system functionality.",
        date: "July 2022",
        imagePath: "/projects/drone-delivery-simulator.png",
        tech: [
            {
                icon: JavaOriginal,
                name: "Java",
            },
            {
                icon: IntellijOriginal,
                name: "IntelliJ",
            },
            {
                icon: JunitOriginal,
                name: "JUnit",
            },
        ],
        links: [
            {
                label: "Source Code",
                href: "https://www.github.com/reeteshsudhakar/drone-delivery-simulation",
                icon: IconBrandGithub,
            },
            {
                label: "Report",
                href: "https://www.github.com/reeteshsudhakar/drone-delivery-simulation/blob/main/phase-4/src/artifact-submissions/report-document-submission.pdf",
                icon: IconFile,
            },
            {
                label: "Presentation",
                href: "https://www.github.com/reeteshsudhakar/drone-delivery-simulation/blob/main/phase-4/phase-iv-presentation.pdf",
                icon: IconSlideshow,
            },
        ],
    },
    {
        title: "Classic Games",
        description:
            "Some of my earliest endeavors in computer science and software development was just from implementing random games I saw in textbooks, or online (Blackjack, Tic-Tac-Toe, Snake). I followed along with various tutorials in Python and Java to implement these games either via the command-line or with a GUI. Note that some of these libraries are probably deprecated, and the code is not the best, but it was a fun learning experience!",
        date: "March 2022",
        imagePath: "/projects/classic-games.png",
        tech: [
            {
                icon: PythonOriginal,
                name: "Python",
            },
            {
                icon: JavaOriginal,
                name: "Java",
            },
            {
                icon: JupyterOriginal,
                name: "Jupyter Notebook",
            },
        ],
        links: [
            {
                label: "Source Code",
                href: "https://www.github.com/reeteshsudhakar/classic-games",
                icon: IconBrandGithub,
            },
        ],
    },
];
