import { Center, Stack, Text } from "@mantine/core";
import classes from "./ProjectsContainer.module.css";
import { projectsPageBlurb } from "@/utils/constants";

export default function ProjectsContainer({ children }: React.PropsWithChildren) {
    return (
        <Stack
            className={classes.wrapper}
            align='center'
            justify='center'
        >
            <Text
                className={classes.title}
                ta='center'
            >
                Projects and Pursuits
            </Text>
            <Stack
                pl={'xl'}
                pr={'xl'}
                align="center"
                justify="center"
                className={classes.children}
            >
                <Text
                    size="lg"
                    fw={500}
                    c={'#5C5F66'}
                >
                    {projectsPageBlurb}
                </Text>
            </Stack>
            {children}
        </Stack>
    )
}