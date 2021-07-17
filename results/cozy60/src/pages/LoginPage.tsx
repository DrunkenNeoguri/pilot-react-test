import React, { useState } from 'react';
import Card from '../components/Card';
import Form from '../components/Form';
import Input from '../components/Input';
import Footer from '../components/Footer';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { AuthApi } from '../library/api/auth/auth';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const [input, setInput] = useState({
    account: '',
    password: '',
  });
  const { account, password } = input;
  const [error, setError] = useState('');
  const history = useHistory();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthApi.signIn(account, password);
      // TODO :: history.push('/users') 로 수정
      window.location.href = '/users';
    } catch (e) {
      const status = e.response;
      setError(status.data.message);
    }
  };

  return (
    <Card>
      <Form onSubmit={onSubmit}>
        <label htmlFor="account">Username</label>
        <Input type="text" name="account" id="account" onChange={onChange} />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password"
          id="password"
          onChange={onChange}
        />
        <Footer>
          <Button type="submit" color="blue">
            login
          </Button>
        </Footer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Card>
  );
}

export default LoginPage;
