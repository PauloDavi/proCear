import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/LogoCEAR.png';
import { Container, Content } from '~/styles/signForms';

const schema = Yup.object().shape({
  email: Yup.string().required('Por favor insira o seu email'),
  password: Yup.string().required('Por favor insira a sua senha'),
});

function SingIn() {
  async function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="ProCear" />
        <Form onSubmit={handleSubmit} schema={schema}>
          <Input name="email" type="email" placeholder="Email" />
          <Input name="password" type="password" placeholder="Senha" />

          <button type="submit">Acessar</button>
          <Link to="/cadastro">Criar conta gratuita</Link>
        </Form>
      </Content>
    </Container>
  );
}

export default SingIn;
