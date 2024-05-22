import { Center, Stack, Text } from "@mantine/core";
import classes from "./ProjectsContainer.module.css";

export default function ProjectsContainer({ children }: React.PropsWithChildren) {
    return (
        <Stack
            align='center'
            p={'xl'}
            className={classes.wrapper}
        >
            <Text
                className={classes.title}
            >
                Projects and Pursuits
            </Text>
            {children}
        </Stack>
    )
}