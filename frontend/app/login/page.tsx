'use client';
import { Button, Fieldset, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useState } from 'react';

export default function Page() {
  const [value, setValue] = useState('');

  return (
    <>
      <Title>Login</Title>
      <Fieldset legend="Personal information">
        <Stack>
          <TextInput label="Username" placeholder="Your name" />
          <PasswordInput label="Password" placeholder="Password" />
          <Button variant="filled">Login</Button>
        </Stack>
      </Fieldset>
    </>
  );
}
