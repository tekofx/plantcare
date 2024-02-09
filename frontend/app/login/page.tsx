'use client';
import Login from '@/components/Session/login';
import Register from '@/components/Session/register';
import { Container } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Page() {
  const [existsUser, setExistsUser] = useState(true);

  useEffect(() => {
    const test = async () => {
      await axios.get('/api/register/userexists').then((response) => {
        setExistsUser(response.data);
      });
    };

    test();
  }, []);

  return (
    <Container style={{ paddingTop: 20 }}>

      {existsUser ? <Login /> : <Register />}

    </Container>
  );
}
