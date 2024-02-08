import {
  Alert,
  Button,
  Container,
  Fieldset,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useInputState, useValidatedState } from '@mantine/hooks';
import { IconInfoCircle } from '@tabler/icons-react';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useInputState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useInputState<string>('');
  const [{ value, lastValidValue, valid }, setPassword] = useValidatedState(
    '',
    (val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val),
    true
  );

  async function onClick() {
    await axios.get('/api/register', { username, value });
  }

  return (
    <Container style={{ paddingTop: 20 }}>
      <Title>Create user</Title>
      <Fieldset>
        <Stack>
          <TextInput
            label="Username"
            placeholder="Your name"
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
          <PasswordInput
            error={!valid}
            value={value}
            onChange={(event) => setPassword(event.currentTarget.value)}
            label="Password"
            placeholder="Password"
          />
          <Alert variant="light" color="blue" title="Alert title" icon={<IconInfoCircle />}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis, quae tempore
            necessitatibus placeat saepe.
          </Alert>
          <PasswordInput
            label="Repeat password"
            placeholder="Repeat password"
            value={passwordRepeat}
            onChange={(event) => setPasswordRepeat(event.currentTarget.value)}
          />
          <Button variant="filled" onClick={onClick}>
            Login
          </Button>
        </Stack>
      </Fieldset>
    </Container>
  );
}
