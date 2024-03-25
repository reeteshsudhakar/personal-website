import { PasswordInput, Text, Group, Anchor, Tooltip, ActionIcon, rem, Stack, TextInput, Box, Button, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowRight } from '@tabler/icons-react';
import { useState } from 'react';

export default function PasswordInputBlock() {
    const form = useForm({
        initialValues: {
            password: '',
        },

        validate: {
            password: (value) => (value !== '' ? null : 'Password cannot be empty'),
        },
    });

    function handleSubmit() {
        console.log(form.values.password);
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
