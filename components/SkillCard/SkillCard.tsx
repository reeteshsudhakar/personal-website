import React from 'react';
import { Paper, Text, Center, Group } from '@mantine/core';
import { skills } from '@/utils/constants';

interface SkillCardIconProps {
    Icon: React.ElementType;
    size: number;
}

function SkillCardIcon({ Icon, size }: SkillCardIconProps) {
    return <Icon size={size} />;
}

function SkillCards() {
    return (
        <Group flex={'column'} justify='center' gap='lg' align='center'>
            {skills.map((skill) => (
                <Paper
                    key={skill.title}
                    shadow="sm"
                    radius="md"
                    p={'lg'}
                    style={{ height: 150, width: 150, margin: 'auto', background: '#151515', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    withBorder
                >
                    <Center style={{ flexGrow: 1, justifyContent: 'center' }}>
                        <SkillCardIcon Icon={skill.icon} size={75} />
                    </Center>
                    <Text fw={700} ta="center" style={{ padding: '10px 0' }}>{skill.title}</Text>
                </Paper>
            ))}
        </Group>
    );
}

export default SkillCards;
