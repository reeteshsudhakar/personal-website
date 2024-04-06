import { ActionIcon, rem, TextInput, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowRight } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function PasswordInputBlock() {
    const form = useForm({
        initialValues: {
            password: '',
        },

        validate: {
            password: (value) => (value !== '' ? null : 'Password cannot be empty'),
        },
    });

    const router = useRouter();

    async function handleSubmit() {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: form.values.password }),
        });

        const data = await response.json();

        if (data.authenticated) {
            toast.success('Success! Redirecting...');
            setTimeout(() => {
                router.push('/dashboard');
            }, 500);
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } else {
            toast.error('Authentication failed.');
        }

        form.reset();
    }

    return (
        <>
            <Box maw={340} mx="auto" pt={'xs'}>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        description='Authenticate to view content'
                        type='password'
                        placeholder="bing bong"
                        {...form.getInputProps('password')}
                        radius='xl'
                        rightSection={
                            <ActionIcon type='submit' size={28} radius="xl" color={'green'} variant="filled">
                                <IconArrowRight style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                            </ActionIcon>
                        }
                    />
                </form>
            </Box>
        </>
    );

}
