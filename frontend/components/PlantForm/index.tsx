/* eslint-disable react/jsx-indent-props */
import { Button, Modal, Stack, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';
import { IconCheck } from '@tabler/icons-react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Dropzone from '../Dropzone';

interface PlantFormProps {
    openedModal: boolean;
    toggleModal: () => void;
}

const cookies = new Cookies();
export default function PlantForm({ openedModal, toggleModal }: PlantFormProps) {
    const [loading, toggle] = useToggle([false, true]);
    const form = useForm({
        initialValues: {
            name: '',
            description: '',
            image: null,
        },
        validate: {
            name: (value) => value.length === 0,
        },
        validateInputOnChange: true,
    });

    async function handleSubmit() {
        toggle();
        console.log(form.values);
        const formData = new FormData();
        formData.append('name', form.values.name);
        formData.append('description', form.values.description);
        formData.append('image', form.values.image);
        await axios.post('/api/plants', formData, { headers: { Authorization: `Bearer ${cookies.get('TOKEN')}` } }).then((res) => {
            console.log(res);
        }
        ).catch((err) => {
            console.log(err);
        }).finally(() => {
            toggle();
            form.reset();
            toggleModal();
        });
    }

    return (
        <Modal opened={openedModal} onClose={toggleModal} padding="xl" title="Menu">
            <Stack>
                <Dropzone form={form} />
                <TextInput placeholder="Name" {...form.getInputProps('name')} />
                <Textarea placeholder="Description" {...form.getInputProps('description')} />
                <Button
                    variant="light"
                    size="sm"
                    leftSection={<IconCheck />}
                    disabled={!form.isValid()}
                    onClick={handleSubmit}
                    loading={loading}

                >Add
                </Button>
            </Stack>
        </Modal>
    );
}
