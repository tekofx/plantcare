'use client';
import { Button, Container, Fieldset, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useState } from 'react';

export default function Page() {
  const [value, setValue] = useState('');

  return (
    <Container style={{ paddingTop: 20 }}>
      <Title>Login</Title>
      <Fieldset>
        <Stack>
          <TextInput label="Username" placeholder="Your name" />
          <PasswordInput label="Password" placeholder="Password" />
          <Button variant="filled">Login</Button>
        </Stack>
      </Fieldset>
    </Container>
  );
}
