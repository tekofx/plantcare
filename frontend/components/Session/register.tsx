import {
  Alert,
  Button,
  Checkbox,
  Container,
  Fieldset,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconInfoCircle } from '@tabler/icons-react';
import axios from 'axios';
import { useState } from 'react';

export default function Register() {
  const [showAlert, setShowAlert] = useState(false);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      passwordRepeat: '',
      passwordLength: false,
      passwordUppercaseAndLowercase: false,
      paswordNumbers: false,
      passwordSpecialCharacter: false,
    },

    validate: {
      username: (value) => (value.length > 0 ? null : 'Username is required'),
      password: (value) => (value.length > 0 ? null : 'Password is required'),
      passwordRepeat: (value, values) => (value === values.password ? null : 'Passwords do not match'),
      passwordLength: (value, values) => (values.password.length > 10 ? null : 'Password is too short'),
      passwordUppercaseAndLowercase: (value, values) => (/[A-Z]/.test(values.password) && /[a-z]/.test(values.password) ? null : 'Password must contain uppercase and lowercase letters'),
      paswordNumbers: (value, values) => (/\d/.test(values.password) ? null : 'Password must contain number'),
      passwordSpecialCharacter: (value, values) => (/[^A-Za-z0-9]/.test(values.password) ? null : 'Password must contain special character'),
    },

  });

  async function onClick() {
    form.validate();
    await axios.post('/api/register', form.values);
    setShowAlert(true);
  }

  return (
    <Container style={{ paddingTop: 20 }}>
      <Title>Create user</Title>
      <Fieldset>
        <Stack>
          <TextInput
            label="Username"
            placeholder="Your name"
            {...form.getInputProps('username')}
          />
          <PasswordInput
            {...form.getInputProps('password')}
            label="Password"
            placeholder="Password"
          />
          <Alert variant="light" color="blue" title="Password must contain" icon={<IconInfoCircle />}>
            <Stack>
              <Checkbox
                label="At least 10 characters"
                checked={form.isValid('passwordLength')}
              />
              <Checkbox
                label="Uppercase and lowercase"
                checked={form.isValid('passwordUppercaseAndLowercase')}
              />
              <Checkbox
                label="Numbers"
                checked={form.isValid('paswordNumbers')}
              />
              <Checkbox
                label="Special character"
                checked={form.isValid('passwordSpecialCharacter')}
              />
            </Stack>
          </Alert>
          <PasswordInput
            label="Repeat password"
            placeholder="Repeat password"
            {...form.getInputProps('passwordRepeat')}
          />
          <Button
            variant="filled"
            onClick={onClick}
            disabled={!form.isValid()}
          >
            Login
          </Button>
          <Alert variant="light" color="green" title="Created user" icon={<IconInfoCircle />} hidden={!showAlert} />
        </Stack>
      </Fieldset>
    </Container>
  );
}
