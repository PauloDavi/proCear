import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ring } from 'react-spinners-css';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import InputMask from '~/components/InputMask';
import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';
import { Container, Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  phone: Yup.string()
    .matches(/^\(\d{2}\)\s\d{5}-\d{4}/, 'Numero invalido')
    .required('O telefone é obrigatório'),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword
      ? field
          .required('A senha é obrigatória')
          .min(6, 'A senha tem que ter pelo menos seis dígitos')
          .max(30, 'Senha muito grande')
      : field
  ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required('A confirmação é obrigatória')
          .oneOf([Yup.ref('password')], 'Senhas não batem')
      : field
  ),
});

function Profile() {
  const [selectedFile, setSelectedFile] = useState();
  const [imageUrl, setImageUrl] = useState();
  const { profile, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    const { name, oldPassword, password, confirmPassword } = data;
    const phone =
      data.phone.substr(1, 2) +
      data.phone.substr(5, 5) +
      data.phone.substr(11, 4);

    const formData = new FormData();

    formData.append('name', name);
    formData.append('phone', phone);
    if (oldPassword) {
      formData.append('oldPassword', oldPassword);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
    }
    if (selectedFile && imageUrl !== profile.image_url) {
      formData.append('image', selectedFile);
    }
    console.tron.log(formData);

    dispatch(updateProfileRequest(formData));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <Form initialData={profile} onSubmit={handleSubmit} schema={schema}>
          <AvatarInput
            onFileUploaded={setSelectedFile}
            onchangeUrl={setImageUrl}
          />

          <Input name="name" placeholder="Nome Completo" />
          <InputMask
            name="phone"
            mask="(99) 99999-9999"
            maskChar="_"
            alwaysShowMask={false}
            formatChars={{ '9': '[0-9]' }}
            permanents={[0, 3, 4, 8]}
            placeholder="Seu novo telefone"
          />

          <hr />

          <Input
            type="password"
            name="oldPassword"
            placeholder="Sua senha atual"
          />
          <Input type="password" name="password" placeholder="Nova senha" />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirme a nova senha"
          />

          <button type="submit">
            {loading ? <Ring color="#fff" size={32} /> : 'Atualizar perfil'}
          </button>
        </Form>

        <button type="button" onClick={handleSignOut}>
          Sair do ProCear
        </button>
      </Content>
    </Container>
  );
}

export default Profile;
