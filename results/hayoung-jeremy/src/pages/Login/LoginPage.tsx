import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// custom
import { PageTemplate, Form, Button, Input } from "components";
import apiClient from "service/api";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    apiClient
      .post("/auth/login", { account: id, password })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));

    history.push("/profile");
  };
  return (
    <PageTemplate title="Login here">
      <Form onSubmit={handleSubmit}>
        <Input type="text" placeholder="ID" value={id} onChange={handleId} />
        <Input
          type="password"
          placeholder="PW"
          value={password}
          onChange={handlePw}
        />
        <Button type="submit">로그인</Button>
      </Form>
    </PageTemplate>
  );
};

export default LoginPage;
