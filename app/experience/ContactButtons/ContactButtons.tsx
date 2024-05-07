import { Group, Anchor, Button, Text } from "@mantine/core";
import { IconForms, IconCalendar, IconMail, IconBrandInstagram } from "@tabler/icons-react";

export function ContactButtons() {
    return (
        <>
            <Text c='white' size='xl' ta='center' fw={600}>
                Got questions for me? Feel free to reach out!
            </Text>

            <Group align='center' justify='center' p={'md'}>
                <Anchor href='/contact' underline='never'>
                    <Button
                        variant='light'
                        color='#FFF'
                        leftSection={<IconForms />}
                        radius={'md'}
                    >
                        <Text size='l' fw={700}>Contact</Text>
                    </Button>
                </Anchor>
                <Anchor href='https://calendly.com/reesud6187/30min' underline='never' target='_blank'>
                    <Button
                        variant='filled'
                        color='teal'
                        leftSection={<IconCalendar />}
                        radius={'md'}
                    >
                        <Text size='l' fw={700}>Schedule a meeting</Text>
                    </Button>
                </Anchor>
                <Anchor href='mailto:reesud6187@gmail.com' underline='never' target='_blank'>
                    <Button
                        variant='light'
                        color='#FFF'
                        leftSection={<IconMail />}
                        radius={'md'}
                    >
                        <Text size='l' fw={700}>Email me!</Text>
                    </Button>
                </Anchor>
                <Anchor href='https://instagram.com/reeteshsudhakar' underline='never' target='_blank'>
                    <Button
                        variant='gradient'
                        gradient={{ deg: 206, from: 'pink', to: 'yellow' }}
                        leftSection={<IconBrandInstagram />}
                        radius={'md'}
                    >
                        <Text size='l' fw={700}>Instagram</Text>
                    </Button>
                </Anchor>
            </Group>
        </>
    );
}