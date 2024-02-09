import { Button, Container, Fieldset, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Login() {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) => (value.length > 0 ? null : 'Username is required'),
      password: (value) => (value.length > 0 ? null : 'Password is required'),
    },
  });

  async function onClick() {
    await axios.post('/api/login', form.values).then((response) => {
      console.log(response.data)
      cookies.set('TOKEN', response.data.token, { path: '/' });
      console.log(response.data);
    });
  }

  return (
    <Container style={{ paddingTop: 20 }}>
      <Title>Login</Title>
      <Fieldset>
        <Stack>
          <TextInput label="Username" placeholder="Your name" {...form.getInputProps('username')} />
          <PasswordInput label="Password" placeholder="Password" {...form.getInputProps('password')} />
          <Button variant="filled" disabled={!form.isValid()} onClick={onClick}>Login</Button>
        </Stack>
      </Fieldset>
    </Container>
  );
}
