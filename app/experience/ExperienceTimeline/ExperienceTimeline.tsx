'use client'

import { useState } from 'react';
import { Modal, Timeline, Text, Stack, Anchor, Title, Image } from '@mantine/core';
import classes from './ExperienceTimeline.module.css';
import { experiences } from '@/utils/constants';
import Snowfall from 'react-snowfall';

interface ExperienceModalContent {
    title: string;
    company: string;
    companyLink: string;
    location: string;
    description: string;
    dates: string;
    imagePath: string;
}

// Extending the ModalContent interface to include the open state
interface ExperienceModalData extends ExperienceModalContent {
    open: boolean;
}

export function ExperienceTimeline() {
    // manage open/close and detailed content of the modal
    const [modalData, setModalData] = useState<ExperienceModalData>({ open: false, title: '', company: '', companyLink: '', location: '', description: '', dates: '', imagePath: '' });

    // open modal with detailed content
    const openModal = (data: ExperienceModalContent) => {
        setModalData({ open: true, ...data });
    };

    // close modal
    const closeModal = () => {
        setModalData({ open: false, title: '', company: '', companyLink: '', location: '', description: '', dates: '', imagePath: '' });
    };

    return (
        <>
            <Snowfall
                style={{
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                }}
                snowflakeCount={15}

            />
            <Stack align='center' justify='center' p='xl'>
                <Text className={classes.title}>
                    My Experience
                </Text>
                <Text c='white' size='lg' ta='center'>
                    Below is a summary of my experience, whether it be professional or personal. Feel free to check out my <Anchor href='/resume'>résumé</Anchor> for a one-page summary. Click on each item to find out more details about each experience!
                </Text>
                <br />
                <Timeline bulletSize={50} lineWidth={5} active={2} color={'#0172AF'}>
                    {experiences.map((experience) => (
                        <Timeline.Item
                            key={experience.title + experience.dates} // Unique key for React elements in lists
                            title={<Text size="lg" c='white'>{experience.company}</Text>}
                            onClick={() => openModal(experience)}
                            bullet={<Image radius="xl" src={experience.imagePath} alt="" />}
                        >
                            <Text c="dimmed" size="md">
                                {experience.title}
                            </Text>
                            <Text size="sm">
                                {experience.dates}
                            </Text>
                        </Timeline.Item>
                    ))}
                </Timeline>
                <Modal
                    opened={modalData.open}
                    onClose={closeModal}
                    title={"Experience Details"}
                    centered
                >
                    <Title order={3} c='white'>{modalData.title}</Title>
                    <Anchor c='#50B384' target='_blank' href={modalData.companyLink}>
                        <Text fw={500}>{modalData.company}</Text>
                    </Anchor>
                    <Text c="dimmed">{modalData.location}</Text>
                    <Text c="dimmed" size="sm">{modalData.dates}</Text>
                    <br />
                    <Text>{modalData.description}</Text>
                    <Image src={modalData.imagePath} alt="" style={{ marginTop: '20px' }} />
                </Modal>
            </Stack>
        </>
    )
}

export default ExperienceTimeline;
