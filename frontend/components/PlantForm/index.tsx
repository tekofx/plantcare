/* eslint-disable react/jsx-indent-props */
import { Button, Stack, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck } from '@tabler/icons-react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Dropzone from '../Dropzone';

const cookies = new Cookies();
export default function PlantForm() {
    const form = useForm({
        initialValues: {
            name: '',
            description: '',
            image: "",
        },
        validate: {
            name: (value) => value.trim().length > 0,
        },
    });

    async function handleSubmit() {
        const formData = new FormData();
        formData.append('name', form.values.name);
        formData.append('description', form.values.description);
        formData.append('image', form.values.image);
        await axios.post('/api/plants', formData, { headers: { Authorization: `Bearer ${cookies.get('TOKEN')}` } });
    }

    return (
        <Stack>
            <Dropzone form={form} />
            <TextInput placeholder="Name" {...form.getInputProps('name')} />
            <Textarea placeholder="Description" {...form.getInputProps('description')} />
            <Button
                variant="light"
                size="sm"
                leftSection={<IconCheck />}
                disabled={!form.isValid}
                onClick={handleSubmit}

            >Add
            </Button>
        </Stack>
    );
}
