'use client';

/* eslint-disable react/jsx-indent-props */
import { Burger, Button, Container, Group, Menu, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import { IconPlant } from '@tabler/icons-react';
import { useState } from 'react';
import PlantForm from '../PlantForm';
import ThemeSwitch from '../ThemeSwitch';
import classes from './Header.module.css';

const links = [
    { link: '/about', label: 'Features' },
    { link: '/pricing', label: 'Pricing' },
    { link: '/learn', label: 'Learn' },
    { link: '/community', label: 'Community' },
];

export default function HeaderSimple() {
    const [openedMenu, { toggle: toggleMenu }] = useDisclosure(false);
    const [openedModal, { toggle: toggleModal }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.link);
            }}
        >
            {link.label}
        </a>
    ));

    return (
        <header className={classes.header}>
            <Container size="md" className={classes.inner}>
                <MantineLogo size={28} />
                <Group gap={5} visibleFrom="xs">
                    {items}
                    <ThemeSwitch />
                    <Button
                        variant="light"
                        size="sm"
                        leftSection={<IconPlant />}
                        onClick={toggleModal}
                    >Add Plant
                    </Button>
                </Group>
                <Menu opened={openedMenu}>
                    <Menu.Target>
                        <Burger opened={openedMenu} onClick={toggleMenu} hiddenFrom="xs" size="sm" />
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>
                            Menu
                        </Menu.Label>
                        {items}
                        <ThemeSwitch />
                    </Menu.Dropdown>
                </Menu>
                <Modal opened={openedModal} onClose={toggleModal} padding="xl" title="Menu">
                    <PlantForm />
                </Modal>

            </Container>
        </header>
    );
}
