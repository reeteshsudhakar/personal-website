import { SegmentedControl, Center, Text, rem, Tooltip } from "@mantine/core";
import { IconGitBranch, IconFingerprint } from "@tabler/icons-react";
import classes from "./NavbarToggle.module.css";

interface NavbarToggleProps {
    section: string;
    setSection: (value: 'section1' | 'section2') => void;
    label: string;
}

export function NavbarToggleSmall({ section, setSection, label }: NavbarToggleProps) {
    return (
        <Tooltip label={label} withArrow position={'top'} className={classes.tooltip}>
            <SegmentedControl
                classNames={{ root: classes.segmentControlSmall, indicator: classes.indicator }}
                value={section}
                onChange={(value: any) => setSection(value)}
                transitionTimingFunction="ease"
                radius='md'
                data={[
                    {
                        label: (
                            <Center style={{ gap: 5 }}>
                                <IconGitBranch style={{ width: rem(14), height: rem(14) }} />
                                <Text size='sm'>Main</Text>
                            </Center>
                        ),
                        value: 'section1'
                    },
                    {
                        label: (
                            <Center style={{ gap: 5 }}>
                                <IconFingerprint style={{ width: rem(14), height: rem(14) }} />
                                <Text size='sm'>Private</Text>
                            </Center>
                        ),
                        value: 'section2'
                    },
                ]}
                size='sm'
            />
        </Tooltip>
    );
}

export function NavbarToggleLarge({ section, setSection, label }: NavbarToggleProps) {
    return (
        <Tooltip label={label} withArrow position={'top'} className={classes.tooltip}>
            <SegmentedControl
                classNames={{ root: classes.segmentControlLarge, indicator: classes.indicator }}
                value={section}
                onChange={(value: any) => setSection(value)}
                transitionTimingFunction="ease"
                radius='md'
                data={[
                    {
                        label: (
                            <Center style={{ gap: 5 }}>
                                <IconGitBranch style={{ width: rem(14), height: rem(14) }} />
                                <Text size='sm'>Main</Text>
                            </Center>
                        ),
                        value: 'section1'
                    },
                    {
                        label: (
                            <Center style={{ gap: 5 }}>
                                <IconFingerprint style={{ width: rem(14), height: rem(14) }} />
                                <Text size='sm'>Private</Text>
                            </Center>
                        ),
                        value: 'section2'
                    },
                ]}
                size='sm'
            />
        </Tooltip>
    );
}
