import { Plant } from '@/interfaces';
import { ActionIcon, Badge, Button, Card, CardSection, Group, Image, Text } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import classes from './PlantCard.module.css';

const mockdata = {
    image:
        'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    title: 'Verudela Beach',
    country: 'Croatia',
    description:
        'Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.',
    badges: [
        { emoji: '☀️', label: 'Sunny weather' },
        { emoji: '🦓', label: 'Onsite zoo' },
        { emoji: '🌊', label: 'Sea' },
        { emoji: '🌲', label: 'Nature' },
        { emoji: '🤽', label: 'Water sports' },
    ],
};

interface PlantCardProps {
    plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
    const { image, title, description, country, badges } = mockdata;
    const features = badges.map((badge) => (
        <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
            {badge.label}
        </Badge>
    ));

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <CardSection>
                <Image src={plant.image === '' ? undefined : plant.image} alt={plant.name} fit="cover" height={180} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
            </CardSection>

            <CardSection className={classes.section} mt="md">
                <Group justify="apart">
                    <Text fz="lg" fw={500}>
                        {plant.name}
                    </Text>
                </Group>
                <Text fz="sm" mt="xs">
                    {plant.description}
                </Text>
            </CardSection>

            <CardSection className={classes.section}>
                <Group gap={7} mt={5}>
                    {features}
                </Group>
            </CardSection>

            <Group mt="xs">
                <Button radius="md" style={{ flex: 1 }}>
                    Show details
                </Button>
                <ActionIcon variant="default" radius="md" size={36}>
                    <IconHeart className={classes.like} stroke={1.5} />
                </ActionIcon>
            </Group>
        </Card>
    );
}
