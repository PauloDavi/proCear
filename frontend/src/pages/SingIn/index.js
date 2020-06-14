import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/LogoCEAR.png';
import { signInRequest } from '~/store/modules/auth/actions';
import { Container, Content } from '~/styles/signForms';

const schema = Yup.object().shape({
  email: Yup.string().required('Por favor insira o seu email'),
  password: Yup.string().required('Por favor insira a sua senha'),
});

function SingIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  async function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="ProCear" />
        <Form onSubmit={handleSubmit} schema={schema}>
          <Input name="email" type="email" placeholder="Email" />
          <Input name="password" type="password" placeholder="Senha" />

          <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
          <Link to="/cadastro">Criar conta gratuita</Link>
        </Form>
      </Content>
    </Container>
  );
}

export default SingIn;
