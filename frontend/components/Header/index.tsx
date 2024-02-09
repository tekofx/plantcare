'use client';

/* eslint-disable react/jsx-indent-props */
import { Burger, Container, Group, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useState } from 'react';
import ThemeSwitch from '../ThemeSwitch';
import classes from './Header.module.css';

const links = [
    { link: '/about', label: 'Features' },
    { link: '/pricing', label: 'Pricing' },
    { link: '/learn', label: 'Learn' },
    { link: '/community', label: 'Community' },
];

export default function HeaderSimple() {
    const [opened, { toggle }] = useDisclosure(false);
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
                </Group>
                <Menu opened={opened}>
                    <Menu.Target>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>
                            Menu
                        </Menu.Label>
                        {items}
                        <ThemeSwitch />
                    </Menu.Dropdown>
                </Menu>
            </Container>
        </header>
    );
}
