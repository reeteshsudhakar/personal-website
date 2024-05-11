import { Center, Stack, Text } from "@mantine/core";
import classes from "./PressContainer.module.css";

export default function PressContainer({ children }: React.PropsWithChildren) {
    return (
        <Stack
            align='center'
            p={'xl'}
            className={classes.wrapper}
        >
            <Text
                className={classes.title}
            >
                Press and Publications
            </Text>

            {children}
        </Stack>
    )
}