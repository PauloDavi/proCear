import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/LogoCEAR.png';
import InputMask from '~/components/InputMask';
import { signUpRequest } from '~/store/modules/auth/actions';
import { Container, Content } from '~/styles/signForms';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email valido')
    .required('O email é obrigatório'),
  phone: Yup.string()
    .matches(/^\(\d{2}\)\s\d{5}-\d{4}/, 'Numero invalido')
    .required('O telefone é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter no minimo 6 caracteres')
    .max(30, 'A senha deve ter no máximo 30 caracteres')
    .required('A senha é obrigatória'),
  confirmPassword: Yup.string()
    .required('Confirme a senha')
    .oneOf([Yup.ref('password')], 'Senhas não batem'),
});

function SingUp() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  async function handleSubmit(data) {
    const { name, email, password, confirmPassword } = data;
    let { phone } = data;
    phone = phone.substr(1, 2) + phone.substr(5, 5) + phone.substr(11, 4);

    dispatch(signUpRequest(name, email, phone, password, confirmPassword));
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="ProCear" />

        <Form onSubmit={handleSubmit} schema={schema}>
          <Input name="name" type="text" placeholder="Nome completo" />
          <Input name="email" type="email" placeholder="Email" />
          <InputMask
            name="phone"
            mask="(99) 99999-9999"
            maskChar="_"
            alwaysShowMask={false}
            formatChars={{ '9': '[0-9]' }}
            permanents={[0, 3, 4, 8]}
            placeholder="Telefone"
          />
          <Input name="password" type="password" placeholder="Senha" />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirme sua senha"
          />

          <button type="submit">
            {loading ? 'Carregando...' : 'Criar conta'}
          </button>
          <Link to="/login">Já é cadastrado?</Link>
        </Form>
      </Content>
    </Container>
  );
}

export default SingUp;
