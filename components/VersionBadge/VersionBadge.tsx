import { Anchor, Badge, Box, Popover, PopoverDropdown, PopoverTarget, Text } from "@mantine/core";
import { IconInfoSquareRoundedFilled, IconChevronDown } from "@tabler/icons-react";
import classes from "./VersionBadge.module.css";
import { theme } from "@/theme";

export function VersionBadge() {
    return (
        <Popover withArrow shadow="sm">
            <PopoverTarget>
                <Badge
                    className={classes.root}
                    variant="light"
                    color="#50B384"
                    rightSection={
                        <Box mt={4} ml={-3} mr={-5} c={"#50B384"}>
                            <IconChevronDown size={10} stroke={3} />
                        </Box>
                    }
                    role="button"
                    visibleFrom="xs"
                    radius={"md"}
                >
                    v2.1.0
                </Badge>
            </PopoverTarget>
            <PopoverDropdown w={160}>
                <Text size="xs" ta="center" c={theme.colors?.dark ? theme.colors.dark[0] : "white"}>
                    <Box component="span" c="#2374AB">
                        <IconInfoSquareRoundedFilled />
                    </Box>
                    <br />
                    This website was created in 2024 with Next and Mantine.
                    <br />
                    If you want to see my first website, check out{" "}
                    <Anchor href="https://www.github.com/reeteshsudhakar/reeteshsudhakar.github.io/" target="_blank">
                        this repo
                    </Anchor>
                    .
                </Text>
            </PopoverDropdown>
        </Popover>
    );
}
