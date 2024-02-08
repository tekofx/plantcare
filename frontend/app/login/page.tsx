'use client';
import Login from '@/components/Session/login';
import Register from '@/components/Session/register';
import { Container } from '@mantine/core';
import { useState } from 'react';

export default function Page() {
  const [value, setValue] = useState('');

  return (
    <Container style={{ paddingTop: 20 }}>
      <Login />
      <Register />
    </Container>
  );
}
