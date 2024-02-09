/* eslint-disable react/jsx-indent-props */
import { Button, Group, Image, Text, rem, useMantineTheme } from '@mantine/core';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconDownload, IconPhotoFilled, IconTrashFilled, IconX } from '@tabler/icons-react';
import { useCallback, useRef, useState } from 'react';
import classes from './Dropzone.module.css';

interface DropzoneComponentProps {
    form: any;
}
export default function DropzoneComponent({ form }: DropzoneComponentProps) {
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const theme = useMantineTheme();
    const openRef = useRef<() => void>(null);

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    });

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFiles(acceptedFiles);
        form.setValue('image', acceptedFiles[0]); // Set the value in the form
    }, [form]);

    return (
        <div className={classes.wrapper}>
            {
                files.length === 0 ? (
                    <div>
                        <Dropzone
                            openRef={openRef}
                            onDrop={onDrop}
                            className={classes.dropzone}
                            radius="md"
                            accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
                            maxSize={30 * 1024 ** 2}
                            maxFiles={1}
                        >
                            <div style={{ pointerEvents: 'none' }}>

                                <div>

                                    <Group justify="center">
                                        <Dropzone.Accept>
                                            <IconDownload
                                                style={{ width: rem(50), height: rem(50) }}
                                                color={theme.colors.blue[6]}
                                                stroke={1.5}
                                            />
                                        </Dropzone.Accept>
                                        <Dropzone.Reject>
                                            <IconX
                                                style={{ width: rem(50), height: rem(50) }}
                                                color={theme.colors.red[6]}
                                                stroke={1.5}
                                            />
                                        </Dropzone.Reject>
                                        <Dropzone.Idle>
                                            <IconCloudUpload
                                                style={{ width: rem(50), height: rem(50) }}
                                                stroke={1.5}
                                            />
                                        </Dropzone.Idle>
                                    </Group>

                                    <Text ta="center" fw={700} fz="lg" mt="xl">
                                        <Dropzone.Accept>Drop files here</Dropzone.Accept>
                                        <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                                        <Dropzone.Idle>Upload resume</Dropzone.Idle>
                                    </Text>
                                    <Text ta="center" fz="sm" mt="xs" c="dimmed">
                                        Drag&apos;n&apos;drop files here to upload. We can accept only <i>.jpeg</i> and <i>.png</i> files that
                                        are less than 30mb in size.
                                    </Text>
                                </div>

                            </div>
                        </Dropzone>
                        <Button
                            className={classes.control}
                            leftSection={<IconPhotoFilled />}
                            size="md"
                            radius="xl"
                            onClick={() => openRef.current?.()}
                        >
                            Select Image
                        </Button>
                    </div>
                ) : (
                    <div>
                        {previews}

                        <Button
                            className={classes.control}
                            color="red"
                            leftSection={<IconTrashFilled />}
                            size="md"
                            radius="xl"
                            onClick={
                                () => {
                                    setFiles([]);
                                }
                            }
                        >
                            Remove file
                        </Button>
                    </div>
                )
            }

        </div>
    );
}
