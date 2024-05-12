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

        if (response.ok) {
            const data = await response.json();

            if (data.authenticated) {
                toast.success('Success! Redirecting...');
                setTimeout(() => {
                    router.push('/dashboard');
                }, 1000);
            } else {
                // Handle the case where authentication fails but the server responds correctly
                toast.error('Authentication failed.');
            }
        } else {
            // Handle HTTP error responses
            try {
                const errorData = await response.json();
                // Display a more specific error message if the server provides one
                toast.error(errorData.message || 'An error occurred. Try again.');
            } catch (error) {
                // Handle cases where the server response cannot be parsed as JSON
                toast.error('An error occurred. Try again.');
            }
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
