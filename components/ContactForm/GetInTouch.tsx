'use client'

import { Paper, Text, TextInput, Textarea, Button, Group, SimpleGrid } from '@mantine/core';
import { ContactIconsList } from './ContactIcons';
import bg from './bg.svg';
import classes from './GetInTouch.module.css';
import { useForm } from '@mantine/form';
import emailjs from "@emailjs/browser";
import { toast } from 'react-hot-toast';

export function GetInTouch() {

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },

        validate: {
            name: (value) => (value !== '' ? null : 'Name cannot be empty'),
            email: (value) => {
                if (value === '') {
                    return 'Email cannot be empty';
                } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                    return 'Invalid email format';
                }
                return null;
            },
            subject: (value) => (value !== '' ? null : 'Subject cannot be empty'),
            message: (value) => (value !== '' ? null : 'Message cannot be empty'),
        },

    });

    async function handleSubmit() {
        const templateParams = {
            name: form.values.name,
            email: form.values.email,
            subject: form.values.subject,
            message: form.values.message,
        }

        emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
            templateParams,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ''
        )
            .then((result) => {
                toast.success('Message sent successfully!')
                form.reset();
            }, (error) => {
                toast.error('Failed to send message!')
            });
    }

    return (
        <Paper shadow="md" radius="lg">
            <div className={classes.wrapper}>
                <div className={classes.contacts} style={{ backgroundImage: `url(${bg.src})` }}>
                    <Text fz="lg" fw={700} className={classes.title} c="#fff">
                        My Information
                    </Text>

                    <ContactIconsList />
                </div>

                <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
                    <Text fz="lg" fw={700} className={classes.title}>
                        Contact Form
                    </Text>

                    <div className={classes.fields}>
                        <SimpleGrid cols={{ base: 1, sm: 2 }}>
                            <TextInput label="Your name" placeholder="John Doe" {...form.getInputProps('name')} />
                            <TextInput label="Your email" placeholder="john@doe.com" {...form.getInputProps('email')} />
                        </SimpleGrid>

                        <TextInput mt="md" label="Subject" placeholder="Subject" {...form.getInputProps('subject')} />

                        <Textarea
                            mt="md"
                            label="Your message"
                            placeholder="Please include all relevant information"
                            minRows={3}
                            {...form.getInputProps('message')}
                        />

                        <Group justify="flex-end" mt="md">
                            <Button type="submit" className={classes.control}>
                                Send message
                            </Button>
                        </Group>
                    </div>
                </form>
            </div>
        </Paper>
    );
}
